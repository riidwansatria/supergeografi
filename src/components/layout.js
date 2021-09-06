import * as React from "react"
import Header from "../components/organisms/Header.js"
import Footer from "../components/Footer"

const Layout = ({ children }) => {

  return (
    <body className="bg-white">
      <Header/>
      <main className="max-w-6xl mx-auto md:px-6 px-4 py-8">
        {children}
      </main>
      <Footer/>
    </body>
  )
}

export default Layout
