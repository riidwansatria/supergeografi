import React from "react"
import PropTypes from "prop-types"
import { Link, graphql } from "gatsby"

import Layout from "../components/templates/layout"
import Seo from "../components/seo"

import LogoOSN from "/src/images/logo-osn.png"

const Page = ({ data, location }) => {
  const page = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title={page.frontmatter.title} />

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

      <main className="grid grid-cols-4 sm:grid-cols-6 gap-8 max-w-6xl mx-auto my-8">
        {/* Main content */}
        <section
          dangerouslySetInnerHTML={{ __html: page.html }}
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
        </div>
      </main>
    </Layout>
  )
}
Page.propTypes = {
  pageContext: PropTypes.shape({
    page: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
            }),
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
}
export default Page
export const pageQuery = graphql`
  query ($id: String!) {
    site {
      siteMetadata {
        title
      }
    }

    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
      }
    }
  }
`
