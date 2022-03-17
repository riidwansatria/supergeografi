import React from "react"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"

const _ = require("lodash")

export const LatestCategoryArticles = ({ nodes }) => {
  return (
    <div>
      <ol
        style={{ listStyle: `none` }}
        className="grid sm:grid-cols-3 gap-4 py-4"
      >
        {nodes.map(node => {
          const title = node.title || node.slug

          return (
            <li key={node.slug} className="bg-white rounded-3xl">
              <article
                className=""
                itemScope
                itemType="http://schema.org/Article"
              >
                <GatsbyImage
                  imgClassName="w-full h-40 rounded-t-3xl"
                  className="w-full h-40 rounded-t-3xl"
                  image={node.featuredImage.gatsbyImageData}
                  alt={node.title}
                />
                <div className="p-4">
                  <h3 className="font-bold text-gray-8 text-lg">
                    <Link
                      to={`/${_.kebabCase(node.category.title)}/${node.slug}/`}
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
    </div>
  )
}
