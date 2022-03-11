import * as React from "react"
import { Link, graphql } from "gatsby"
import { UserCircleIcon, CalendarIcon } from "@heroicons/react/outline"

import Layout from "../components/templates/layout"
import Seo from "../components/seo"

const _ = require("lodash")

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const posts = data.allMarkdownRemark.nodes
  const tags = data.markdownRemark.frontmatter.tags
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const author = data.site.siteMetadata.author?.name || `Supergeografi`
  const { previous, next } = data

  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article
        className="md:px-12 px-4"
        itemScope
        itemType="http://schema.org/Article"
      >
        {/* Article header */}
        <header className="grid grid-cols-1 sm:grid-cols-2 bg-gray-2 rounded-2xl items-center sm:mt-6 mb-8 sm:mb-16">
          <div className="hidden sm:block">
            <img
              className="w-full sm:h-[32rem] h-48 mx-auto object-cover rounded-l-2xl"
              src={post.frontmatter.featuredImage}
              alt={post.frontmatter.title}
            ></img>
          </div>
          <div className="p-8 sm:p-12">
            <div className="flex space-x-2">
              <Link to={`/${_.kebabCase(post.frontmatter.category)}/`}>
                <span className="uppercase text-sm text-primary-dark font-bold tracking-wider">
                  {post.frontmatter.category}
                </span>
              </Link>
              {tags && (
                <div className="hidden sm:flex flex-1">
                  <ol className="flex space-x-2 list-none">
                    {tags.map(tag => {
                      return (
                        <li className="" key={tag}>
                          <span className="uppercase text-sm text-primary font-bold tracking-wider">
                            {tag}
                          </span>
                        </li>
                      )
                    })}
                  </ol>
                </div>
              )}
            </div>

            <h1
              itemProp="headline"
              className="text-3xl sm:text-5xl font-semibold text-gray-8 py-4"
            >
              {post.frontmatter.title}
            </h1>
            <div className="flex gap-4 sm:mt-8">
              <div className="hidden sm:flex gap-1 items-center">
                <UserCircleIcon className="block h-4 w-4" />
                <span className="uppercase text-sm font-medium tracking-wider">
                  {author}
                </span>
              </div>
              <div className="flex gap-1 items-center">
                <CalendarIcon className="block h-4 w-4" />
                <span className="uppercase text-sm font-medium tracking-wider">
                  {post.frontmatter.date}
                </span>
              </div>
            </div>
          </div>
        </header>
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-8 max-w-6xl mx-auto">
          {/* Main article */}
          <section
            dangerouslySetInnerHTML={{ __html: post.html }}
            itemProp="articleBody"
            className="prose break-words col-span-4 p-4"
          />

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
        </div>
      </article>
      <nav className="md:mx-12 mx-4 p-4 my-8 bg-gray-2 border-t-2 border-gray-2 rounded-2xl">
        <ul className="grid grid-cols-1 sm:grid-cols-2 mx-auto font-semibold text-sm tracking-widest">
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                <div className="flex justify-start items-center gap-4 sm:border-r border-gray-3 sm:py-10 sm:px-4">
                  <div className="hidden sm:block">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="53"
                      height="38"
                      viewBox="0 0 53 38"
                      fill="none"
                    >
                      <path
                        d="M1.23223 17.2322C0.255924 18.2085 0.255924 19.7915 1.23223 20.7678L17.1421 36.6777C18.1184 37.654 19.7014 37.654 20.6777 36.6777C21.654 35.7014 21.654 34.1184 20.6777 33.1421L6.53553 19L20.6777 4.85786C21.654 3.88155 21.654 2.29864 20.6777 1.32233C19.7014 0.34602 18.1184 0.34602 17.1421 1.32233L1.23223 17.2322ZM53 16.5L3 16.5V21.5L53 21.5V16.5Z"
                        fill="#BDBDBD"
                      />
                    </svg>
                  </div>
                  
                  <div>
                    <p className="text-sm sm:text-md text-left text-gray-5">sebelumnya</p>
                    <p className="text-md sm:text-xl text-left text-primary hover:text-primary-light">
                      {previous.frontmatter.title}
                    </p>
                  </div>
                </div>
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                <div className="flex justify-end items-center gap-4 sm:border-l border-gray-3 sm:py-10 sm:px-4">
                  <div>
                    <p className="text-sm sm:text-md text-right text-gray-5">selanjutnya</p>
                    <p className="text-md sm:text-xl text-right text-primary hover:text-primary-light">
                      {next.frontmatter.title}
                    </p>
                  </div>
                  <div className="hidden sm:block">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="53"
                      height="38"
                      viewBox="0 0 53 38"
                      fill="none"
                    >
                      <path
                        d="M51.7678 20.7678C52.7441 19.7915 52.7441 18.2085 51.7678 17.2322L35.8579 1.32233C34.8816 0.34602 33.2986 0.34602 32.3223 1.32233C31.346 2.29864 31.346 3.88155 32.3223 4.85786L46.4645 19L32.3223 33.1421C31.346 34.1184 31.346 35.7014 32.3223 36.6777C33.2986 37.654 34.8816 37.654 35.8579 36.6777L51.7678 20.7678ZM0 21.5H50V16.5H0V21.5Z"
                        fill="#BDBDBD"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
        author {
          name
        }
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        category
        tags
        description
        featuredImage
      }
    }
    previous: markdownRemark(
      id: { eq: $previousPostId }
      frontmatter: { contentType: { eq: "post" } }
    ) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(
      id: { eq: $nextPostId }
      frontmatter: { contentType: { eq: "post" } }
    ) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { contentType: { eq: "post" } } }
      limit: 5
    ) {
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
