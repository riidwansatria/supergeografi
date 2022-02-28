import * as React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/templates/layout"
import Seo from "../components/seo"

import Hero from "../components/organisms/Hero"
import HighlightOSN from "../components/organisms/HighlightOSN"


const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  return (
    <body className="bg-white">
      <Layout location={location} title={siteTitle}>
      <Seo title = 'Home'/>
        <Hero />

        <div className="grid grid-cols-3 max-w-6xl mx-auto">
          <div className="bg-gray-200 p-4 m-4 rounded-2xl">
          </div>

          <div>
            <ol style={{ listStyle: `none` }}>
              {posts.map(post => {
                const title = post.frontmatter.title || post.fields.slug

                return (
                  <li key={post.fields.slug}>
                    <article
                      className="flex py-4 gap-4"
                      itemScope
                      itemType="http://schema.org/Article"
                    >
                      <img 
                      className="w-20 h-20 mx-auto object-cover rounded-2xl"
                      src={post.frontmatter.featuredImage} alt={post.frontmatter.title}></img>
                      <div className="flex-1 items-center">
                        <h3 className="font-bold text-gray-800 text-sm">
                          <Link to={post.fields.slug} itemProp="url">
                            <span itemProp="headline">{title}</span>
                          </Link>
                        </h3>
                        <small className="text-gray-400">{post.frontmatter.date}</small>
                      </div>
                    </article>
                  </li>
                )
              })}
            </ol>
          </div>
        </div>

        <HighlightOSN />
        <div className="mb-8 pb-4 border-b-2 flex justify-between items-center">
          <h2 className="md:text-4xl text-2xl font-semibold flex">📝 Latest Posts</h2>
          <div className="flex">
            <Link to="/blog" className="sm:text-md text-sm text-gray-600 p-4">Read all posts →</Link>
          </div>
        </div>
        
        

        <h2 className="md:text-4xl text-2xl font-semibold mb-8 pt-24 pb-4 border-b-2">🕹️ Projects</h2>
        <ol className="space-y-4">
          <li>
            <h3 className="text-gray-800 md:text-2xl text-xl">
              <a href="https://supergeografi.com/">Supergeografi</a>
            </h3>
          </li>
          <li>
            <h3 className="text-gray-800 md:text-2xl text-xl">
              <a href="https://edufia.net/">Edufia</a>
            </h3>
          </li>
        </ol>
      </Layout>
    </body>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC}, limit: 5) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          featuredImage
        }
      }
    }
  }
`
