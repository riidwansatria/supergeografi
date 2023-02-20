import React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

import Layout from "../components/templates/layout"
import { Seo } from "../components/seo"

const _ = require("lodash")

const Tags = ({ pageContext, data, location }) => {
  const { tag } = pageContext
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const tagsPosts = data.tagArticles.nodes
  const recentPosts = data.recentPosts.nodes

  return (
    <Layout location={location} title={siteTitle}>

      {/* Tag header */}
      <header className="md:mx-12 mx-4 bg-gray-2 rounded-2xl items-center mb-16">
        <div className="max-w-6xl p-8 mx-auto">
          <h1 className="text-3xl text-gray-7 font-semibold py-4">{tag}</h1>
        </div>
      </header>

      <main className="grid grid-cols-6 gap-8 max-w-6xl mx-auto">
        {/* Articles list */}
        <div className="col-span-4">
          <ol style={{ listStyle: `none` }}>
            {tagsPosts.map(post => {
              const title = post.title || post.slug

              return (
                <li key={post.slug}>
                  <article
                    className="py-4 gap-4"
                    itemScope
                    itemType="http://schema.org/Article"
                  >
                    <div className="grid grid-cols-8 sm:grid-cols-5 gap-4 items-center">
                      <GatsbyImage
                        className="col-span-2 w-full h-20 sm:h-48 mx-auto object-cover rounded-2xl"
                        image={post.featuredImage.gatsbyImageData}
                        alt={post.title}
                      />
                      <div className="col-span-6 sm:col-span-3 sm:p-4">
                        <h3 className="font-bold text-gray-7 text-md sm:text-2xl">
                          <Link
                            to={`/${post.category.slug}/${
                              post.slug
                            }/`}
                            itemProp="url"
                          >
                            <span itemProp="headline">{title}</span>
                          </Link>
                        </h3>
                        <small className="text-primary">{post.date}</small>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: post.body.childMarkdownRemark.excerpt,
                          }}
                          itemProp="description"
                          className="hidden sm:block text-sm text-gray-4"
                        />
                      </div>
                    </div>
                  </article>
                </li>
              )
            })}
          </ol>
        </div>

        {/* Sidebar */}
        <div className="col-span-2 grid grid-cols-1 gap-12 border-2 border-gray-1 rounded-xl h-fit p-4 ml-20">
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
              {recentPosts.map(post => {
                const title = post.title || post.slug

                return (
                  <li key={post.slug}>
                    <article
                      className="flex py-2 gap-4"
                      itemScope
                      itemType="http://schema.org/Article"
                    >
                      <GatsbyImage
                        className="w-12 h-12 mx-auto object-cover rounded-lg"
                        image={post.featuredImage.gatsbyImageData}
                        alt={post.title}
                      />
                      <div className="flex-1 items-center">
                        <h3 className="text-gray-8 text-xs">
                          <Link
                            to={`/${_.kebabCase(post.category.title)}/${
                              post.slug
                            }/`}
                            itemProp="url"
                          >
                            <span itemProp="headline">{title}</span>
                          </Link>
                        </h3>
                        <small className="text-gray-4 text-xs">
                          {post.date}
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

export default Tags

export const Head = ({ pageContext, data }) => {
  const siteTitle = data.site.siteMetadata?.title || `Supergeografi`
  const { tag } = pageContext
  return (
    <Seo title={`${tag} – ${siteTitle}`} />
  )
}

export const pageQuery = graphql`
  query ($tag: String) {
    site {
      siteMetadata {
        title
      }
    }

    tagArticles: allContentfulPost(
      limit: 2000
      sort: { date: DESC }
      filter: { tags: { in: [$tag] } }
    ) {
      nodes {
        title
        date(formatString: "MMMM DD, YYYY")
        slug
        featuredImage {
          gatsbyImageData(height: 192, placeholder: BLURRED)
        }
        category {
          slug
        }
        body {
          childMarkdownRemark {
            excerpt
          }
        }
      }
    }

    recentPosts: allContentfulPost(
      sort: { date: DESC }
      limit: 5
    ) {
      nodes {
        title
        slug
        date(formatString: "MMMM Do, YYYY")
        category {
          title
        }
        featuredImage {
          gatsbyImageData(height: 48, placeholder: BLURRED)
        }
      }
    }
  }
`
