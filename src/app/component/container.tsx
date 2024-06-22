import React from 'react'
import Navbar from './navbar'
import Footer from './footer'
import Hero from './hero'

const Container = () => {
  return (
    <section className="bg-primary-bg text-primary-text items-center justify-between">
      <Navbar ></Navbar>
      <Hero></Hero>
      <Footer></Footer>
  </section>
  )
}

export default Container