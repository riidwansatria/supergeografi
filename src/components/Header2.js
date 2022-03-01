import React from 'react'
import { Link } from 'gatsby'
import { Disclosure } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import logo from '/src/images/gatsby-icon.png'
import ContactIcons from '../components/contactIcons'

const navigation = [
  { name: 'About', to: '/about', current: false },
  { name: 'Blog', to: '/blog', current: false },
  { name: 'Projects', to: '/projects', current: false },
  { name: 'Contact', to: '/contact', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  return (
    <div>
      <Disclosure as="nav" className="">
        {({ open }) => (
          <>
            <div className="max-w-6xl mx-auto mt-6 px-2 sm:px-6 lg:px-8">
              <div className="relative flex items-center justify-left h-24">
                <div className="flex-none sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-neutral-800 hover:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-neutral-200">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 sm:justify-start align-middle">
                  <div className="flex-none">
                    <Link to="/">
                      <img
                        className="inline mx-4 h-16 w-16"
                        src={logo}
                        alt="Logo"
                      />
                    </Link>
                  </div>

                  <div className="flex flex-1 object-left">
                    <div className="hidden sm:flex sm:flex-grow sm:ml-6">
                      <div className="flex flex-none space-x-0">
                        {navigation.map((item) => (
                          <Link
                            key={item.name}
                            to={item.to}
                            className={classNames(
                              item.current ? 'bg-neutral-900 text-white' : 'text-neutral-800 hover:bg-neutral-200',
                              'px-3 py-2 my-auto rounded-md text-base uppercase items-center font-semibold tracking-wider'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                      <div className="flex flex-grow my-auto">
                        <ContactIcons/>
                      </div>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.to}
                    className={classNames(
                      item.current ? 'bg-neutral-900 text-white' : 'flex text-neutral-800 hover:bg-neutral-200',
                      'inline px-4 py-2 rounded-md text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  )
}