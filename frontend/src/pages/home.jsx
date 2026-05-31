import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Feature from '../components/Feature'
import Pricing from '../components/Pricing'
import About from '../components/About'
import FAQ from '../components/FAQ'
import Footer from '../components/Footer'

function Home() {
  return (
    <div style={{ background: '#0f0f1a', minHeight: '100vh' }}>
      <Navbar />
      <Hero />
      <Feature />
      <Pricing />
      <About />
      <FAQ />
      <Footer />
    </div>
  )
}

export default Home