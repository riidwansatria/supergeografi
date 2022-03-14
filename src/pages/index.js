import * as React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import Layout from "../components/templates/layout"
import Seo from "../components/seo"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ChevronRightIcon } from "@heroicons/react/outline"

import HighlightOSN from "../components/organisms/HighlightOSN"

import socialMedia from "../data/social-media"
import logo from "../images/logo.png"
import earth from "../images/earth.png"

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
        <Seo 
        title="Supergeografi – Telusuri Materi Geografi Sekarang!" 
        />

        {/* Hero section */}
        <div className="max-w-6xl md:py-20 py-12 mx-auto grid grid-cols-1 md:grid-cols-2 items-center">
          <div className="col-span-1 p-4">
            <img className="inline h-12 sm:h-20" src={logo} alt="Logo" />
            <p className="m-2 text-lg text-gray-8">
              Telusuri lebih jauh tentang manusia, lingkungannya, dan bumi yang
              kita pijak beserta bentang alamnya bersama Supergeografi!
            </p>
            <button className="bg-primary hover:bg-primary-light text-white text-sm sm:text-md font-bold m-2 mt-8 py-2 px-4 rounded-lg">
              <Link to="/materi">Materi OSN Geografi →</Link>
            </button>
          </div>

          <div className="hidden md:grid col-span-1 my-auto ml-auto">
            <img className="h-96" src={earth} alt="Earth" />
          </div>
        </div>

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
                const title = post.title || post.slug

                return (
                  <li key={post.slug}>
                    <article
                      className=""
                      itemScope
                      itemType="http://schema.org/Article"
                    >
                      <GatsbyImage
                        imgClassName="w-full h-48 mx-auto object-cover rounded-2xl"
                        image={post.featuredImage.gatsbyImageData}
                        alt={post.title}
                      />
                      <div className="py-4">
                        <h3 className="font-bold text-gray-7 text-xl">
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
                        <p
                          dangerouslySetInnerHTML={{
                            __html: post.body.childMarkdownRemark.excerpt,
                          }}
                          itemProp="description"
                          className="text-sm text-gray-6"
                        />
                      </div>
                      <Link
                        to={`/${_.kebabCase(post.category.title)}/${
                          post.slug
                        }/`}
                        itemProp="url"
                      >
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
                const title = post.title || post.slug

                return (
                  <li key={post.slug}>
                    <article
                      className="flex py-4 gap-4 items-center"
                      itemScope
                      itemType="http://schema.org/Article"
                    >
                      <GatsbyImage
                        className="w-20 h-20 mx-auto object-cover rounded-2xl"
                        imgClassName="rounded-2xl"
                        image={post.featuredImage.gatsbyImageData}
                        alt={post.title}
                      />
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-8 text-sm">
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

          {/* Newsletter */}
          <div className="">
            <h3 className="text-xl font-bold">
              📬 Ikuti Newsletter kami dan dapatkan Artikel terbaru lebih awal
            </h3>
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

        {/* Categories section */}
        <div className="grid grid-cols-4 sm:grid-cols-6 max-w-6xl mx-auto gap-8 p-4">
          <div className="col-span-4">
            <ol style={{ listStyle: `none` }} className="grid gap-8">
              {categories.map(category => {
                return (
                  <li key={category.title}>
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
                          <p className="col-span-1">{category.subtitle}</p>
                        </div>
                        <h2 className="font-bold text-4xl">{category.title}</h2>
                        <ol
                          style={{ listStyle: `none` }}
                          className="grid sm:grid-cols-3 gap-4 py-4"
                        >
                          {categoryPosts.map(post => {
                            const title = post.title || post.slug

                            return (
                              <li
                                key={post.slug}
                                className="bg-white rounded-3xl"
                              >
                                <article
                                  className=""
                                  itemScope
                                  itemType="http://schema.org/Article"
                                >
                                  <GatsbyImage
                                    imgClassName="w-full h-40 rounded-t-3xl"
                                    className="w-full h-40 rounded-t-3xl"
                                    image={post.featuredImage.gatsbyImageData}
                                    alt={post.title}
                                  />
                                  <div className="p-4">
                                    <h3 className="font-bold text-gray-8 text-lg">
                                      <Link
                                        to={`/${_.kebabCase(
                                          post.category.title
                                        )}/${post.slug}/`}
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
                          <Link to={`/${_.kebabCase(category.title)}/`}>
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

    latestArticle: allContentfulPost(
      sort: { fields: date, order: DESC }
      limit: 1
    ) {
      nodes {
        title
        date(formatString: "MMMM DD, YYYY")
        slug
        featuredImage {
          gatsbyImageData(width: 320, placeholder: BLURRED)
        }
        category {
          title
        }
        body {
          childMarkdownRemark {
            excerpt
          }
        }
      }
    }

    recentArticles: allContentfulPost(
      sort: { fields: date, order: DESC }
      limit: 4
      skip: 1
    ) {
      nodes {
        title
        date(formatString: "MMMM DD, YYYY")
        slug
        category {
          title
        }
        featuredImage {
          gatsbyImageData(height: 80, placeholder: BLURRED)
        }
        body {
          childMarkdownRemark {
            excerpt
          }
        }
      }
    }

    categoryList: allContentfulPostCategory(
      sort: { fields: categoryID, order: ASC }
      filter: { categoryID: { gte: 1, lte: 5 } }
    ) {
      nodes {
        title
        subtitle
      }
    }

    categoryArticles: allContentfulPost(
      sort: { fields: date, order: DESC }
      limit: 3
    ) {
      nodes {
        title
        slug
        category {
          title
        }
        featuredImage {
          gatsbyImageData(width: 278, placeholder: BLURRED)
        }
      }
    }
  }
`
