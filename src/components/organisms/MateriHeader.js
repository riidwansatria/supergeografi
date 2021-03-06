import * as React from "react"
import { Link } from "gatsby"

import LogoOSN from "/src/images/logo-osn.png"

const MateriPage = () => {
  return (
    <div className="border-b-2 border-gray-2">
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
  )
}

export default MateriPage
