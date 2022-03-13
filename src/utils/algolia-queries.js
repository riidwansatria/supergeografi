const escapeStringRegexp = require("escape-string-regexp")

const pagePath = `content`
const indexName = `Post`

const pageQuery = `{
  pages: allContentfulPost {
    edges {
      node {
        id
        title
        slug
        featuredImage {
          gatsbyImageData(height: 80, width:80, placeholder: BLURRED)
        }
        body {
          childMarkdownRemark {
            excerpt(pruneLength: 5000)
          }
        }
      }
    }
  }
}`

function pageToAlgoliaRecord({ node: { id, title, slug, body, featuredImage } }) {
  return {
    objectID: id,
    title,
    slug,
    excerpt: body.childMarkdownRemark.excerpt,
    featuredImage: featuredImage.gatsbyImageData,
  }
}

const queries = [
  {
    query: pageQuery,
    transformer: ({ data }) => data.pages.edges.map(pageToAlgoliaRecord),
    indexName,
    settings: { attributesToSnippet: [`excerpt:20`] },
  },
]

module.exports = queries