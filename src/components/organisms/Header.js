import React from 'react'
import { Link } from 'gatsby'
import { Disclosure } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import logo from '/src/images/logo.png'
import ContactIcons from '/src/components/atoms/contactIcons.js'

const navigation = [
  { name: 'Litosfer', to: '/litosfer', current: false },
  { name: 'Atmosfer', to: '/atmosfer', current: false },
  { name: 'Hidrosfer', to: '/hidrosfer', current: false },
  { name: 'Biosfer', to: '/biosfer', current: false },
  { name: 'Antroposfer', to: '/antroposfer', current: false },
  { name: 'Olimpiade 🔥', to: '/#', current: true },
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
            <div className="mx-auto mt-4 sm:mt-0">
              <div className="relative flex sm:border-b-2 border-gray-100 items-center justify-center">

                {/* Mobile menu button */}
                <div className="flex-none sm:hidden pl-2">
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-200">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>

                {/* Main header */}
                <div className="flex flex-1 max-w-6xl sm:justify-start align-middle py-6 pr-2">

                  {/* Logo */}
                  <div className="flex-none">
                    <Link to="/">
                      <img
                        className="inline mx-2 sm:mx-4 h-8"
                        src={logo}
                        alt="Logo"
                      />
                    </Link>
                  </div>
                  
                  {/* Search bar */}
                  <div className="bg-black">
                      
                  </div>

                  {/* Social buttons */}
                  <div className="flex flex-1 object-left">
                    <div className="hidden sm:flex sm:flex-grow sm:ml-6">
                      <div className="flex flex-grow my-auto">
                        <ContactIcons/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lower header*/}
              <div className="hidden sm:flex sm:border-b-2 border-gray-100 justify-center">
                <div className="flex flex-1 max-w-6xl sm:justify-end align-middle py-1">
                  <div className="flex space-x-2">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.to}
                        className={classNames(
                          item.current ? 'flex text-primary hover:bg-gray-100' : 'text-gray-600 hover:bg-gray-100',
                          'px-1 py-1 my-auto rounded-md text-sm uppercase items-center font-semibold tracking-wider'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
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
                      item.current ? 'flex text-primary hover:bg-gray-100' : 'flex text-gray-800 hover:bg-gray-100',
                      'inline px-3 py-2 rounded-md text-base font-medium'
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