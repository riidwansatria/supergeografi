import { Link } from "gatsby"
import { default as React } from "react"
import {
  Highlight,
  Hits,
  Index,
  Snippet,
  PoweredBy,
} from "react-instantsearch-dom"

const PageHit = ({ hit }) => (
  <div className="flex gap-4 items-center py-2">
    <img
    className="col-span-2 w-20 h-20 mx-auto object-cover rounded-2xl"
    src={hit.featuredImage}
    alt={hit.title}
    ></img>
    <div>
        <Link to={hit.slug}>
        <h4 className="text-bold text-xl">
            <Highlight attribute="title" hit={hit} tagName="mark" />
        </h4>
        </Link>
        <Snippet attribute="excerpt" hit={hit} tagName="mark" />
    </div>
    
  </div>
)

const HitsInIndex = ({ index }) => (
  <Index indexName={index.name}>
    <Hits className="Hits" hitComponent={PageHit} />
  </Index>
)

const SearchResult = ({ indices, className }) => (
  <div className={className}>
    {indices.map(index => (
      <HitsInIndex index={index} key={index.name} />
    ))}
    <PoweredBy />
  </div>
)

export default SearchResult