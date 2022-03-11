import * as React from "react"
import Header from "../organisms/Header"
import Footer from "../organisms/Footer"

const Layout = ({ children }) => {
  return (
    <div className="bg-white">
      <Header />
      <main className="sm:py-6">{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
