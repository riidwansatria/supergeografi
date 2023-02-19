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
        postsGroup: allContentfulPost(sort: {date: ASC}) {
          nodes {
            title
            slug
            category {
              title
            }
          }
        }
        categoriesGroup: allContentfulPostCategory(
          sort: {categoryID: ASC}
          ) {
          nodes {
            title
            slug
          }
        }
        tagsGroup: allContentfulPostTags {
          nodes {
            title
            slug
            category {
              title
            }
          }
        }
        pagesGroup: allContentfulPage {
          nodes {
            template
            title
            slug
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

  const posts = result.data.postsGroup.nodes

  // Create blog posts pages
  // But only if there's at least one blog post found in Contentful
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const previousPostSlug = index === 0 ? null : posts[index - 1].slug
      const nextPostSlug =
        index === posts.length - 1 ? null : posts[index + 1].slug

      createPage({
        path: `/${_.kebabCase(post.category.title)}/${post.slug}/`,
        component: blogPost,
        context: {
          slug: post.slug,
          previousPostSlug,
          nextPostSlug,
        },
      })
    })
  }

  // Extract category data from query
  const categories = result.data.categoriesGroup.nodes
  // Make category pages
  categories.forEach(category => {
    createPage({
      path: `/${category.slug}/`,
      component: categoryTemplate,
      context: {
        slug: category.slug,
        category: category.slug,
      },
    })
  })

  // Extract tag data from query
  const tags = result.data.tagsGroup.nodes
  // Make tag pages
  tags.forEach(tag => {
    createPage({
      path: `/${_.kebabCase(tag.category.title)}/${tag.slug}/`,
      component: tagTemplate,
      context: {
        tag: tag.title,
      },
    })
  })

  // Extract page data from query
  const pages = result.data.pagesGroup.nodes
  // Make pages
  pages.forEach(page => {
    createPage({
      path: page.slug,
      component: path.resolve(
        `src/templates/${String(page.template)}.js`
      ),
      context: {
        slug: page.slug
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
