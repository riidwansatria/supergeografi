import * as React from "react"
import Header from "../organisms/Header.js"
import Footer from "../Footer"

const Layout = ({ children }) => {

  return (
    <body className="bg-white">
      <Header/>
      <main className="mx-auto md:px-12 px-4 py-6">
        {children}
      </main>
      <Footer/>
    </body>
  )
}

export default Layout
