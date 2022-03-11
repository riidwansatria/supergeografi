const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const _ = require("lodash")

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Define a template for pages
  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const tagTemplate = path.resolve("src/templates/tags.js")
  const categoryTemplate = path.resolve("src/templates/categories.js")

  // Get all markdown blog posts sorted by date
  const result = await graphql(
    `
      {
        postsRemark: allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: ASC }
          filter: {frontmatter: {contentType: {eq: "post"}}}
          limit: 1000
        ) {
          nodes {
            id
            fields {
              slug
            }
            frontmatter {
              tags
            }
          }
        }
        categoriesGroup: allMarkdownRemark(
          sort: {fields: frontmatter___id, order: ASC}
          filter: {frontmatter: {contentType: {eq: "postCategory"}}}
          ) {
          nodes {
            id
            frontmatter {
              title
            }
          }
        }
        tagsGroup: allMarkdownRemark(limit: 2000) {
          group(field: frontmatter___tags) {
            fieldValue
          }
        }
        pagesGroup: allMarkdownRemark(
          sort: {fields: frontmatter___id, order: ASC}
          filter: {frontmatter: {contentType: {eq: "page"}}}
          ) {
          nodes {
            id
            fields {
              slug
            }
            frontmatter {
              template
              title
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    )
    return
  }

  const posts = result.data.postsRemark.nodes

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const previousPostId = index === 0 ? null : posts[index - 1].id
      const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id

      createPage({
        path: `${post.fields.slug}/`,
        component: blogPost,
        context: {
          id: post.id,
          previousPostId,
          nextPostId,
        },
      })
    })
  }

  // Extract category data from query
  const categories = result.data.categoriesGroup.nodes
  // Make category pages
  categories.forEach(category => {
    createPage({
      path: `/${_.kebabCase(category.frontmatter.title)}/`,
      component: categoryTemplate,
      context: {
        id: category.id,
        category: category.frontmatter.title,
      },
    })
  })

  // Extract tag data from query
  const tags = result.data.tagsGroup.group
  // Make tag pages
  tags.forEach(tag => {
    createPage({
      path: `/tags/${_.kebabCase(tag.fieldValue)}/`,
      component: tagTemplate,
      context: {
        tag: tag.fieldValue,
      },
    })
  })

  // Extract page data from query
  const pages = result.data.pagesGroup.nodes
  // Make pages
  pages.forEach(page => {
    createPage({
      path: page.fields.slug,
      component: path.resolve(
        `src/templates/${String(page.frontmatter.template)}.js`
      ),
      context: {
        id: page.id
      },
    })
  })
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
    }

    type Fields {
      slug: String
    }
  `)
}
