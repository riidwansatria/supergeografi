import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/templates/layout"
import Seo from "../components/seo"

import Search from "/src/components/search"
const searchIndices = [{ name: `Pages`, title: `Pages` }]

const SearchPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.nodes

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="Cari Artikel" />
      <header className="md:mx-12 mx-4 bg-gray-2 rounded-2xl items-center mb-16">
        <div className="max-w-6xl p-8 mx-auto">
          <h1 className="text-3xl text-gray-7 font-semibold py-4">Cari Artikel</h1>
        </div>
      </header>
      <main className="grid grid-cols-4 sm:grid-cols-6 gap-8 max-w-6xl px-4 pb-8 mx-auto">
          <div className="col-span-4">
            <Search indices={searchIndices} />
          </div>
            {/* Sidebar */}
        <div className="col-span-2 hidden sm:grid grid-cols-1 gap-12 border-2 border-gray-1 rounded-xl h-fit p-4 ml-20">
          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-md font-bold uppercase tracking-widest">
              Newsletter
            </h3>
            <span className="text-sm">
              📬 Ikuti Newsletter kami dan dapatkan Artikel terbaru lebih awal
            </span>
            <form
              name="contact"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
            >
              <input type="hidden" name="form-name" value="contact"></input>
              <div hidden>
                <input name="bot-field" />
              </div>
              <input
                type="email"
                name="email"
                className="block w-full rounded-lg bg-gray-1 border-0 text-sm font-medium"
                placeholder="Email"
              />
              <div>
                <button
                  type="submit"
                  className="block w-full bg-primary hover:bg-primary-light text-white text-sm font-medium tracking-widest py-2 px-4 mt-3 rounded-lg"
                >
                  SUBSCRIBE
                </button>
              </div>
              <div data-netlify-recaptcha="true"></div>
            </form>
          </div>

          {/* Latest articles */}
          <div className="">
            <h3 className="text-md font-bold uppercase tracking-widest">
              Artikel terbaru
            </h3>
            <ol style={{ listStyle: `none` }}>
              {posts.map(post => {
                const title = post.frontmatter.title || post.fields.slug

                return (
                  <li key={post.fields.slug}>
                    <article
                      className="flex py-2 gap-4"
                      itemScope
                      itemType="http://schema.org/Article"
                    >
                      <img
                        className="w-12 h-12 mx-auto object-cover rounded-lg"
                        src={post.frontmatter.featuredImage}
                        alt={post.frontmatter.title}
                      ></img>
                      <div className="flex-1 items-center">
                        <h3 className="text-gray-8 text-xs">
                          <Link to={post.fields.slug} itemProp="url">
                            <span itemProp="headline">{title}</span>
                          </Link>
                        </h3>
                        <small className="text-gray-4 text-xs">
                          {post.frontmatter.date}
                        </small>
                      </div>
                    </article>
                  </li>
                )
              })}
            </ol>
          </div>
        </div>
      </main>
    </Layout>
  )
}

export default SearchPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
        limit: 5
        sort: { fields: [frontmatter___date], order: DESC }
        filter: { frontmatter: { contentType: { eq: "post" } } }
      ) {
        totalCount
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
