import * as React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/templates/layout"
import Seo from "../components/seo"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ChevronRightIcon } from "@heroicons/react/outline"

import Hero from "../components/organisms/Hero"
import HighlightOSN from "../components/organisms/HighlightOSN"

import socialMedia from "../data/social-media"

import Search from "../components/search"
const searchIndices = [{ name: `Pages`, title: `Pages` }]

const _ = require("lodash")

const navigation = [
  { name: "Litosfer", to: "/litosfer", current: false },
  { name: "Atmosfer", to: "/atmosfer", current: false },
  { name: "Hidrosfer", to: "/hidrosfer", current: false },
  { name: "Biosfer", to: "/biosfer", current: false },
  { name: "Antroposfer", to: "/antroposfer", current: false },
]

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const latestPost = data.latestArticle.nodes
  const posts = data.recentArticles.nodes
  const categories = data.categoryList.nodes
  const categoryPosts = data.categoryArticles.nodes

  return (
    <div className="bg-white">
      <Layout location={location} title={siteTitle}>
        <Seo title="Home" />
        <Hero />

        {/* Recent articles section */}
        <div className="max-w-6xl p-6 mx-auto">
          {/* Header */}
          <div className="flex items-center gap-2">
            <svg
              width="50"
              height="4"
              viewBox="0 0 50 4"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line y1="2" x2="50" y2="2" stroke="#4565DB" strokeWidth="4" />
            </svg>
            <p className="col-span-1">supergeografi</p>
          </div>
          <h2 className="font-bold text-5xl">Artikel Terbaru</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 max-w-6xl mx-auto gap-8 p-4">
          {/* Last published article */}
          <div className="bg-gray-2 p-4 rounded-3xl">
            <ol style={{ listStyle: `none` }}>
              {latestPost.map(post => {
                const title = post.frontmatter.title || post.fields.slug

                return (
                  <li key={post.fields.slug}>
                    <article
                      className=""
                      itemScope
                      itemType="http://schema.org/Article"
                    >
                      <img
                        className="w-full h-48 mx-auto object-cover rounded-2xl"
                        src={post.frontmatter.featuredImage}
                        alt={post.frontmatter.title}
                      ></img>
                      <div className="py-4">
                        <h3 className="font-bold text-gray-7 text-xl">
                          <Link to={post.fields.slug} itemProp="url">
                            <span itemProp="headline">{title}</span>
                          </Link>
                        </h3>
                        <small className="text-gray-4 text-xs">
                          {post.frontmatter.date}
                        </small>
                        <p
                          dangerouslySetInnerHTML={{
                            __html:
                              post.frontmatter.description || post.excerpt,
                          }}
                          itemProp="description"
                          className="text-sm text-gray-6"
                        />
                      </div>
                      <Link to={post.fields.slug} itemProp="url">
                        <p className="text-sm text-primary font-bold pt-8">
                          Baca selengkapnya →
                        </p>
                      </Link>
                    </article>
                  </li>
                )
              })}
            </ol>
          </div>

          {/* Recent articles */}
          <div>
            <ol style={{ listStyle: `none` }}>
              {posts.map(post => {
                const title = post.frontmatter.title || post.fields.slug

                return (
                  <li key={post.fields.slug}>
                    <article
                      className="flex py-4 gap-4 items-center"
                      itemScope
                      itemType="http://schema.org/Article"
                    >
                      <img
                        className="w-20 h-20 mx-auto object-cover rounded-2xl"
                        src={post.frontmatter.featuredImage}
                        alt={post.frontmatter.title}
                      ></img>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-8 text-sm">
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

          {/* Newsletter */}
          <div className="">
            <h3 className="text-xl font-bold">
              📬 Ikuti Newsletter kami dan dapatkan Artikel terbaru lebih awal
            </h3>
            <form
              name="contact"
              method="POST"
              data-netlify="true"
              onSubmit="submit"
              data-netlify-honeypot="bot-field"
            >
              <input type="hidden" name="form-name" value="contact"></input>
              <div hidden>
                <input name="bot-field" />
              </div>
              <input
                type="email"
                name="email"
                className="mt-6 block w-full rounded-lg border-gray-3 shadow-sm"
                placeholder="Email"
              />
              <div>
                <button
                  type="submit"
                  className="block w-full bg-primary hover:bg-primary-light text-white text-sm sm:text-md font-medium tracking-widest py-3 px-4 mt-3 rounded-lg"
                >
                  SUBSCRIBE
                </button>
              </div>
              <div data-netlify-recaptcha="true"></div>
            </form>

            <ul className="flex space-x-2 py-6">
              {socialMedia.map(s => (
                <li key={s.label} className="">
                  <button className="flex bg-gray-4 hover:bg-gray-5 text-white text-xl font-bold p-2 items-center justify-center h-12 w-12 rounded-full">
                    <a alt={s.label} href={s.link}>
                      <FontAwesomeIcon icon={s.icon} />
                    </a>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <HighlightOSN />

        <Search indices={searchIndices} />

        {/* Categories section */}
        <div className="grid grid-cols-4 sm:grid-cols-6 max-w-6xl mx-auto gap-8 p-4">
          <div className="col-span-4">
            <ol style={{ listStyle: `none` }} className="grid gap-8">
              {categories.map(category => {
                return (
                  <li key={category.frontmatter.title}>
                    <div className="col-span-4 bg-gray-2 p-4 rounded-3xl">
                      <div className="p-6">
                        <div className="flex items-center gap-2">
                          <svg
                            width="30"
                            height="4"
                            viewBox="0 0 30 4"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <line
                              y1="2"
                              x2="30"
                              y2="2"
                              stroke="#4565DB"
                              strokeWidth="4"
                            />
                          </svg>
                          <p className="col-span-1">
                            {category.frontmatter.subtitle}
                          </p>
                        </div>
                        <h2 className="font-bold text-4xl">
                          {category.frontmatter.title}
                        </h2>
                        <ol
                          style={{ listStyle: `none` }}
                          className="grid sm:grid-cols-3 gap-4 py-4"
                        >
                          {categoryPosts.map(post => {
                            const title =
                              post.frontmatter.title || post.fields.slug

                            return (
                              <li
                                key={post.fields.slug}
                                className="bg-white rounded-3xl"
                              >
                                <article
                                  className=""
                                  itemScope
                                  itemType="http://schema.org/Article"
                                >
                                  <img
                                    className="w-full h-40 mx-auto object-cover rounded-t-3xl"
                                    src={post.frontmatter.featuredImage}
                                    alt={post.frontmatter.title}
                                  ></img>
                                  <div className="p-4">
                                    <h3 className="font-bold text-gray-8 text-lg">
                                      <Link
                                        to={post.fields.slug}
                                        itemProp="url"
                                      >
                                        <span itemProp="headline">{title}</span>
                                      </Link>
                                    </h3>
                                  </div>
                                </article>
                              </li>
                            )
                          })}
                        </ol>
                        <div className="flex gap-1 items-center justify-end">
                          <Link
                            to={`/${_.kebabCase(category.frontmatter.title)}/`}
                          >
                            <p className="flex text-sm text-primary-dark hover:text-primary font-bold uppercase tracking-wider">
                              Selanjutnya
                            </p>
                          </Link>
                          <ChevronRightIcon className="flex h-4 w-4 text-primary-dark" />
                        </div>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ol>
          </div>

          {/* Sidebar */}
          <div className="hidden sm:block col-span-2 bg-gray-2 h-fit px-6 py-4 rounded-3xl">
            <div className="max-w-6xl px-4 pb-12 pt-6 mx-auto">
              <div className="flex items-center gap-2">
                <svg
                  width="50"
                  height="4"
                  viewBox="0 0 50 4"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    y1="2"
                    x2="50"
                    y2="2"
                    stroke="#4565DB"
                    strokeWidth="4"
                  />
                </svg>
                <p className="col-span-1">supergeografi</p>
              </div>
              <h2 className="font-bold text-4xl">Kategori</h2>
            </div>
            {navigation.map(item => (
              <Link
                key={item.name}
                to={item.to}
                className="block bg-primary hover:bg-primary-light text-white text-sm sm:text-lg my-3 py-2 px-4 rounded-full"
                aria-current={item.current ? "page" : undefined}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex border-t-2 border-gray-3 gap-3">
              <Link
                key="materi"
                to="/materi"
                className="flex-auto bg-primary-dark hover:bg-primary-light text-center text-white text-sm sm:text-lg my-3 py-2 px-4 rounded-full"
              >
                Materi
              </Link>
              <Link
                key="kumpulan-soal"
                to="/kumpulan-soal"
                className="flex-auto bg-primary-dark hover:bg-primary-light text-center text-white text-sm sm:text-lg my-3 py-2 px-4 rounded-full"
              >
                Kumpulan soal
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    </div>
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

    latestArticle: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { contentType: { eq: "post" } } }
      limit: 1
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

    recentArticles: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { contentType: { eq: "post" } } }
      limit: 4
      skip: 1
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

    categoryList: allMarkdownRemark(
      sort: { fields: frontmatter___id, order: ASC }
      filter: { frontmatter: { contentType: { eq: "postCategory" }, id: { gte: 1, lte: 5 } } }
    ) {
      nodes {
        frontmatter {
          title
          subtitle
        }
      }
    }

    categoryArticles: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { contentType: { eq: "post" } } }
      limit: 3
    ) {
      nodes {
        fields {
          slug
        }
        frontmatter {
          title
          featuredImage
        }
      }
    }
  }
`
