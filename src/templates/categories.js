import React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

import Layout from "../components/templates/layout"
import Seo from "../components/seo"

const _ = require("lodash")

const Categories = ({ data, location }) => {
  const category = data.contentfulPostCategory
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const categoryTags = data.categoryTags.nodes
  const categoryPosts = data.categoryArticles.nodes
  const recentPosts = data.recentPosts.nodes

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title={category.title} />

      {/* Category header */}
      <header className="relative h-40 sm:h-[32rem] md:mx-12 mx-4 rounded-2xl items-center my-6 sm:mb-16">
        <div className="absolute bg-gray-2/50 h-40 sm:h-[32rem] w-full z-10 p-8 mx-auto rounded-2xl">
          <div className="grid sm:grid-cols-2 h-full max-w-6xl items-center mx-auto">
            <div>
              <h1 className="text-5xl sm:text-6xl text-gray-8 font-bold font-serif p-4">
                {category.title}
              </h1>
              <p className="hidden sm:block sm:text-lg text-gray-8 p-4">
                {category.description.description}
              </p>
            </div>
            <div className="hidden h-full"></div>
          </div>
        </div>

        {category.featuredImage && (
          <GatsbyImage
            className="absolute col-span-2 w-full h-40 sm:h-[32rem] z-0 mx-auto object-cover rounded-2xl"
            image={category.featuredImage.gatsbyImageData}
            alt={category.title}
          />
        )}
      </header>

      <div className="border-y-2 border-gray-1 px-4 my-8">
        <div className="flex flex-1 max-w-6xl align-middle py-1 mx-auto">
          <div className="flex flex-wrap gap-2">
            {categoryTags.map(tag => (
              <Link
                key={tag.title}
                to={`${tag.slug}/`}
                className="text-gray-6 hover:bg-gray-1 px-1 py-1 my-auto rounded-md text-sm uppercase items-center font-semibold tracking-wider"
              >
                {tag.icon} {tag.title}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <main className="grid grid-cols-4 sm:grid-cols-6 gap-8 max-w-6xl px-4 pb-8 mx-auto">
        {/* Articles list */}
        <div className="col-span-4">
          <ol style={{ listStyle: `none` }}>
            {categoryPosts.map(post => {
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
                          <Link to={post.slug} itemProp="url">
                            <span itemProp="headline">{title}</span>
                          </Link>
                        </h3>
                        <small className="text-primary">
                          {post.date}
                        </small>
                        <p
                          dangerouslySetInnerHTML={{
                            __html:
                              post.body.childMarkdownRemark.excerpt,
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
        <div className="hidden col-span-2 sm:grid grid-cols-1 gap-12 border-2 border-gray-1 rounded-xl h-fit p-4 ml-20">
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
export default Categories
export const pageQuery = graphql`
  query ($slug: String!, $category: String) {
    site {
      siteMetadata {
        title
      }
    }

    contentfulPostCategory(slug: { eq: $slug }) {
      title
      subtitle
      description {
        description
      }
      featuredImage {
        gatsbyImageData(height: 512, placeholder: BLURRED)
      }
    }

    categoryTags: allContentfulPostTags(
      limit: 10
      filter: {category: {slug: {in: [$category]}}}
    ) {
      nodes {
        title
        icon
        slug
      }
    }

    categoryArticles: allContentfulPost(
      limit: 2000
      sort: { fields: date, order: DESC }
      filter: {
        category: {slug: {in: [$category]}}
      }
    ) {
      nodes {
        title
        date(formatString: "MMMM DD, YYYY")
        slug
        featuredImage {
          gatsbyImageData(height: 192, placeholder: BLURRED)
        }
        body {
          childMarkdownRemark {
            excerpt
          }
        }
      }
    }
    
    recentPosts: allContentfulPost(
      sort: { fields: date, order: DESC }
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
