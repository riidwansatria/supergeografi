import React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

import Layout from "../components/templates/layout"
import Seo from "../components/seo"

import LogoOSN from "/src/images/logo-osn.png"
const _ = require("lodash")

const Page = ({ data, location }) => {
  const page = data.contentfulPage
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const recentPosts = data.recentPosts.nodes

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title={`${page.title} – ${siteTitle}`} />

      {/* Header section */}
      <div className="border-b-2 border-gray-1">
        <div className="max-w-6xl md:py-20 py-12 mx-auto grid grid-cols-1 md:grid-cols-2 items-center ">
          <div className="col-span-1 p-4">
            <span className="uppercase font-bold tracking-widest text-md">
              Supergeografi guide to{" "}
            </span>
            <h1 className="font-bold text-6xl">Kompetisi Sains Nasional</h1>
            <div className="inline-flex space-x-2">
              <button className="bg-gray-800 hover:bg-gray-600 text-white text-sm sm:text-md font-bold my-8 py-2 px-4 rounded-lg">
                <Link to="/olimpiade/mengenal-osn-geografi">
                  Mengenal KSN Geografi
                </Link>
              </button>
              <button className="bg-gray-800 hover:bg-gray-600 text-white text-sm sm:text-md font-bold my-8 py-2 px-4 rounded-lg">
                <Link to="/kumpulan-soal">Kumpulan Soal</Link>
              </button>
            </div>
          </div>

          <div className="hidden md:grid col-span-1 my-auto ml-auto">
            <img className="h-72" src={LogoOSN} alt="Logo OSN" />
          </div>
        </div>
      </div>

      <main className="grid grid-cols-4 sm:grid-cols-6 gap-8 max-w-6xl mx-auto">
        {/* Main content */}
        <section
          dangerouslySetInnerHTML={{ __html: page.body.childMarkdownRemark.html }}
          itemProp="articleBody"
          className="prose col-span-4 p-4"
        />

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

export default Page

export const pageQuery = graphql`
  query ($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }

    contentfulPage(slug: { eq: $slug }) {
      title
      body {
        childMarkdownRemark {
          html
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
