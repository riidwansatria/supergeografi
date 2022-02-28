import * as React from "react"
import { Link } from 'gatsby'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook } from '@fortawesome/free-solid-svg-icons'

const Hero = () => {
  return (
    <div className="max-w-6xl md:py-32 py-12 mx-auto grid grid-cols-1 sm:grid-cols-2 items-start">
        <div className="col-span-1">
            <img
            className="rounded-l-3xl rounded-b-3xl"
            src="https://supergeografi.com/wp-content/uploads/2020/11/logo-osn-2-2.png"
            alt="OSN Geografi"
            />
        </div>
        <div className="col-span-1 grid grid-cols-1 bg-gray-200 rounded-r-3xl px-8 py-16 gap-8">
            <div className="flex items-center gap-2">
                <svg width="20" height="4" viewBox="0 0 20 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line y1="2" x2="20" y2="2" stroke="#4565DB" strokeWidth="4"/>
                </svg>
                <p className="col-span-1">osn geografi</p>
            </div>
            <h2 className="col-span-1 text-5xl font-bold">Olimpiade Sains Nasional</h2>
            <div className="col-span-1 flex gap-16">
                <div className="flex items-center space-x-4">
                    <button className="flex bg-primary hover:bg-gray-600 text-white text-md sm:text-3xl font-bold p-2 items-center justify-center h-16 w-16 rounded-xl">
                        <Link to="/blog">
                        <FontAwesomeIcon icon={faBook}/>
                        </Link>
                    </button>
                    <span className="flex text-2xl">Materi</span>
                </div>
                <div className="flex items-center space-x-4">
                    <button className="flex bg-primary hover:bg-gray-600 text-white text-md sm:text-3xl font-bold p-2 items-center justify-center h-16 w-16 rounded-xl">
                        <Link to="/blog">
                        <FontAwesomeIcon icon={faBook}/>
                        </Link>
                    </button>
                    <span className="flex text-2xl">Kumpulan Soal</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Hero