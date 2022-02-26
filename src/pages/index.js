import * as React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/templates/layout"
import Seo from "../components/seo"
import Hero from "../components/organisms/Hero"
import OSN from "../components/organisms/OSN"


const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  return (
    <body className="bg-white">
      <Layout location={location} title={siteTitle}>
      <Seo title = 'Home'/>
        <Hero />
        <OSN />
        <div className="mb-8 pb-4 border-b-2 flex justify-between items-center">
          <h2 className="md:text-4xl text-2xl font-semibold flex">📝 Latest Posts</h2>
          <div className="flex">
            <Link to="/blog" className="sm:text-md text-sm text-gray-600 p-4">Read all posts →</Link>
          </div>
        </div>
        
        <ol style={{ listStyle: `none` }}>
          {posts.map(post => {
            const title = post.frontmatter.title || post.fields.slug

            return (
              <li key={post.fields.slug}>
                <article
                  className="post-list-item"
                  itemScope
                  itemType="http://schema.org/Article"
                >
                  <header>
                    <h3 className="text-gray-800 md:text-2xl text-xl">
                      <Link to={post.fields.slug} itemProp="url">
                        <span itemProp="headline">{title}</span>
                      </Link>
                    </h3>
                    <small>{post.frontmatter.date}</small>
                  </header>
                  <section className="pb-8">
                    <p
                      dangerouslySetInnerHTML={{
                        __html: post.frontmatter.description || post.excerpt,
                      }}
                      itemProp="description"
                    />
                  </section>
                </article>
              </li>
            )
          })}
        </ol>

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
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC}, limit: 3) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`
