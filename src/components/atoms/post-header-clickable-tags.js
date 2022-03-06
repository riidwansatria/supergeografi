<div className='flex flex-1'>
                <ol style={{ listStyle: `none` }} className='flex space-x-2'>
                  {tags.map(tag => {
                    return (
                      <li className=''>
                        <Link to={`/${_.kebabCase(post.frontmatter.category)}/${_.kebabCase(tag)}/`}><span className="uppercase text-sm text-primary font-bold tracking-wider">{tag}</span></Link> 
                      </li>
                    )
                  })}
                </ol>
              </div>