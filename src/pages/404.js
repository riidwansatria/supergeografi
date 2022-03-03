import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/templates/layout"
import Seo from "../components/seo"

import animation from '/src/images/404-animation.gif'

const NotFoundPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="404: Not Found" />
      <main className="grid grid-cols-2 max-w-6xl mx-auto items-center">
        <img
        className="w-full px-8"
        src={animation}
        alt="404 not found"
        />
        <div className="px-8">
          <h1 className="text-2xl text-neutral-700 font-bold py-4">Ooooops! The page you were looking for couldn't be found</h1>
          <p className="text-neutral-400">You can navigate through our menu or use this search bar:</p>
        </div>
      </main>
      
    </Layout>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
