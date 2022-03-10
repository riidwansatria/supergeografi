import React from "react"
import { Fragment } from 'react'
import { Link } from "gatsby"
import { Disclosure, Popover, Transition } from "@headlessui/react"
import { MenuIcon, XIcon, SearchIcon } from "@heroicons/react/outline"
import logo from "/src/images/logo.png"
import ContactIcons from "/src/components/atoms/contactIcons.js"

const navigation = [
  { name: "Litosfer", to: "/litosfer/", current: false },
  { name: "Atmosfer", to: "/atmosfer/", current: false },
  { name: "Hidrosfer", to: "/hidrosfer/", current: false },
  { name: "Biosfer", to: "/biosfer/", current: false },
  { name: "Antroposfer", to: "/antroposfer/", current: false },
]

const navigationOlimpiade = [
  { name: "Mengenal OSN Geografi", to: "/olimpiade/mengenal-osn-geografi/" },
  { name: "Materi OSN", to: "/materi/" },
  { name: "Kumpulan Soal", to: "/kumpulan-soal/" },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

export default function Example() {
  return (
    <div>
      <Disclosure as="nav" className="">
        {({ open }) => (
          <>
            <div className="mx-auto mt-4 sm:mt-0">
              <div className="relative flex sm:border-b-2 border-gray-1 items-center justify-center">
                {/* Mobile menu button */}
                <div className="flex-none sm:hidden pl-2">
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-8 hover:bg-gray-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-2">
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
                  <div className="flex flex-1">
                    <div className="flex flex-1 px-4 rounded-xl">
                      <Link className="w-full" to="/cari/">
                        <button className="flex items-center justify-between w-full bg-gray-2 text-gray-4 text-sm sm:text-md text-left font-bold py-2 px-4 rounded-lg">
                          <p className="flex">Cari materi... </p>
                          <SearchIcon className="flex h-4 w-4"/>
                        </button></Link>
                    </div>
                  </div>

                  {/* Social buttons */}
                  <div className="flex flex-none object-left">
                    <div className="hidden sm:flex sm:flex-grow sm:ml-6">
                      <div className="flex flex-grow my-auto">
                        <ContactIcons />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lower header*/}
              <div className="hidden sm:flex sm:border-b-2 border-gray-1 justify-center">
                <div className="flex flex-1 max-w-6xl sm:justify-end align-middle py-1 space-x-2">
                  <div className="flex space-x-2">
                    {navigation.map(item => (
                      <Link
                        key={item.name}
                        to={item.to}
                        className={classNames(
                          item.current
                            ? "flex text-primary hover:bg-gray-1"
                            : "text-gray-6 hover:bg-gray-1",
                          "px-1 py-1 my-auto rounded-md text-sm uppercase items-center font-semibold tracking-wider"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                  <Popover className="relative">
                    {({ open }) => (
                      <>
                        <Popover.Button
                          className="flex text-primary hover:bg-gray-1 px-1 py-1 my-auto rounded-md text-sm uppercase items-center font-semibold tracking-wider"
                        >
                          <span>Olimpiade 🔥</span>
                        </Popover.Button>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="opacity-0 translate-y-1"
                          enterTo="opacity-100 translate-y-0"
                          leave="transition ease-in duration-150"
                          leaveFrom="opacity-100 translate-y-0"
                          leaveTo="opacity-0 translate-y-1"
                        >
                          <Popover.Panel className="absolute z-50 -ml-14 mt-3 transform px-2 sm:px-0">
                            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                              <div className="relative grid gap-2 bg-white p-2">
                                {navigationOlimpiade.map((item) => (
                                  <Link
                                    key={item.name}
                                    to={item.to}
                                    className="p-1 flex items-start rounded-lg hover:bg-gray-50"
                                  >
                                    <div className="">
                                      <p className="text-base font-medium text-gray-7">{item.name}</p>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </Popover.Panel>
                        </Transition>
                      </>
                    )}
                  </Popover>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map(item => (
                  <Link
                    key={item.name}
                    to={item.to}
                    className={classNames(
                      item.current
                        ? "flex text-primary hover:bg-gray-1"
                        : "flex text-gray-8 hover:bg-gray-1",
                      "inline px-3 py-2 rounded-md text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
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
