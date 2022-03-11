import * as React from "react"
import { Link } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import data from "../atoms/social-media.js"

import logoWhite from "/src/images/logo-white.png"

const navigation = [
  { name: "⛰️ Litosfer", to: "/litosfer", current: false },
  { name: "🌠 Atmosfer", to: "/atmosfer", current: false },
  { name: "🌊 Hidrosfer", to: "/hidrosfer", current: false },
  { name: "🌱 Biosfer", to: "/biosfer", current: false },
  { name: "‍🤝‍ Antroposfer", to: "/antroposfer", current: false },
]

const Footer = () => {
  return (
    <div className="">
      {/* Upper footer */}
      <div className=" bg-gray-6 px-4 py-8 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 max-w-6xl mx-auto">
          <div className="col-span-1">
            <Link to="/">
              <img className="inline h-8 sm:h-12" src={logoWhite} alt="Logo" />
            </Link>

            <p className="text-gray-2 py-4">
              Telusuri lebih jauh tentang manusia, lingkungannya, dan bumi yang
              kita pijak beserta bentang alamnya bersama Supergeografi!
            </p>

            <ul className="flex space-x-2 pb-6 sm:pt-6">
              {data.map(s => (
                <li key={s.label} className="">
                  <button className="flex bg-gray-4 hover:bg-gray-5 text-white text-md font-bold p-2 items-center justify-center h-8 w-8 rounded">
                    <a alt={s.label} href={s.link}>
                      <FontAwesomeIcon icon={s.icon} />
                    </a>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div></div>
          <div className="grid grid-cols-2">
            <div>
              <span className="text-white text-lg font-medium">Kategori</span>
              {navigation.map(item => (
                <Link
                  key={item.name}
                  to={item.to}
                  className="block text-gray-2 py-1"
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div>
              <span className="text-white text-lg font-medium">
                <Link to="/tentang-kami">Tentang kami</Link>
              </span>
              <ol className="text-gray-2 py-2 space-y-2">
                <li>
                  <Link to="/profil-kontributor">Profil kontributor</Link>
                </li>
                <li>
                  <Link to="/kebijakan-privasi">Kebijakan privasi</Link>
                </li>
                <li>
                  <Link to="/masukan-dan-saran">Masukan dan saran</Link>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* Lower footer */}
      <div className="bg-gray-7 text-gray-3 p-4">
        <div className="max-w-6xl mx-auto text-sm">
          © {new Date().getFullYear()} All rights reserved.
        </div>
      </div>
    </div>
  )
}
export default Footer
