import * as React from "react"
import { Link } from 'gatsby'
import logo from '/src/images/logo.png'
import earth from '/src/images/earth.png'

const Hero = () => {
  return (
    <body className="bg-white rounded-xl">
        <div className="max-w-6xl md:py-20 py-12 mx-auto grid grid-cols-1 md:grid-cols-2 items-center">
            <div className="col-span-1 p-4">
                <img
                className="inline h-12 sm:h-20"
                src={logo}
                alt="Logo"
                />
                <p className="m-2 text-lg text-gray-8">Telusuri lebih jauh tentang manusia, lingkungannya, dan bumi yang kita pijak beserta bentang alamnya bersama Supergeografi!</p>
                <button className="bg-primary hover:bg-gray-6 text-white text-sm sm:text-md font-bold m-2 mt-8 py-2 px-4 rounded-lg">
                    <Link to="/blog">
                    Materi OSN Geografi →
                    </Link>
                </button>
            </div>

            <div className="hidden md:grid col-span-1 my-auto ml-auto">
                <img
                className="h-96"
                src={earth}
                alt="Earth"
                />
            </div>
        </div>
    </body>
  )
}

export default Hero