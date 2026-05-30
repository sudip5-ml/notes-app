import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Demo from '../components/Demo'
import Feature from '../components/Feature'
import Stats from '../components/Stats'
import Testimonials from '../components/Testimonials'
import FAQ from '../components/FAQ'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

function Home() {
  return (
    <div style={{ background: '#0f0f1a', minHeight: '100vh' }}>
      <Navbar />
      <Hero />
      <Stats />
      <Demo />
      <Feature />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  )
}

export default Home