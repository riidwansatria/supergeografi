import React from "react"
import { Link } from "gatsby"
import { ChevronRightIcon } from "@heroicons/react/outline"

const _ = require("lodash")

export const LatestCategoryCard = ({ category, children }) => {
  return (
    <div>
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
              <line y1="2" x2="30" y2="2" stroke="#4565DB" strokeWidth="4" />
            </svg>
            <p className="col-span-1">{category.subtitle}</p>
          </div>
          <h2 className="font-bold text-4xl">{category.title}</h2>
          {children}
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
    </div>
  )
}
