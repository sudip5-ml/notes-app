import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [showBanner, setShowBanner] = useState(true)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const linkStyle = {
    color: '#6b7280', textDecoration: 'none',
    fontSize: '15px', fontWeight: '500',
    cursor: 'pointer', background: 'none',
    border: 'none', fontFamily: 'Arial, sans-serif',
  }

  const scrollTo = (id) => {
    const element = document.getElementById(id)
    const offset = 80
    const top = element.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 100 }}>

      {/* Announcement Bar */}
      {showBanner && (
        <div style={{ background: 'linear-gradient(135deg, #7c6ff7, #a78bfa)', padding: '10px 20px', textAlign: 'center', fontSize: '13px', fontWeight: '500', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', position: 'relative' }}>
          <span style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '20px', padding: '2px 10px', fontSize: '11px', fontWeight: '700' }}>NEW</span>
          NoteNest is now live! Start organizing your notes for free.
          <span onClick={() => navigate('/signup')} style={{ textDecoration: 'underline', cursor: 'pointer', fontWeight: '700' }}>Get Started →</span>
          <span onClick={() => setShowBanner(false)} style={{ position: 'absolute', right: '20px', cursor: 'pointer', fontSize: '16px', opacity: '0.7' }}>✕</span>
        </div>
      )}

      {/* Navbar */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 40px', background: scrolled ? 'rgba(15,15,26,0.95)' : '#0f0f1a', backdropFilter: scrolled ? 'blur(10px)' : 'none', borderBottom: scrolled ? '1px solid rgba(124,111,247,0.3)' : '1px solid transparent', transition: 'all 0.3s ease' }}>

        {/* Logo */}
       <div onClick={() => window.location.reload()} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
          <span style={{ background: 'linear-gradient(135deg, #7c6ff7, #a78bfa)', borderRadius: '10px', padding: '6px 10px', fontSize: '16px', fontWeight: '900', color: 'white', boxShadow: '0 0 15px rgba(124,111,247,0.6), 0 0 30px rgba(124,111,247,0.3)', border: '1px solid rgba(167,139,250,0.5)' }}>NN</span>
          <span style={{ fontWeight: '800', fontSize: '18px', color: '#ffffff' }}>NoteNest</span>
        </div>

        {/* Nav Links */}
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>

          <button onClick={() => scrollTo('features')} style={{ ...linkStyle, padding: '8px 10px', borderRadius: '6px' }} onMouseEnter={e => { e.currentTarget.style.color = '#ffffff' }} onMouseLeave={e => { e.currentTarget.style.color = '#6b7280' }}>Features</button>

          <button onClick={() => scrollTo('stats')} style={{ ...linkStyle, padding: '8px 10px', borderRadius: '6px' }} onMouseEnter={e => { e.currentTarget.style.color = '#ffffff' }} onMouseLeave={e => { e.currentTarget.style.color = '#6b7280' }}>Stats</button>

          <button onClick={() => scrollTo('pricing')} style={{ ...linkStyle, padding: '8px 10px', borderRadius: '6px' }} onMouseEnter={e => { e.currentTarget.style.color = '#ffffff' }} onMouseLeave={e => { e.currentTarget.style.color = '#6b7280' }}>Pricing</button>

          <button onClick={() => scrollTo('testimonials')} style={{ ...linkStyle, padding: '8px 10px', borderRadius: '6px' }} onMouseEnter={e => { e.currentTarget.style.color = '#ffffff' }} onMouseLeave={e => { e.currentTarget.style.color = '#6b7280' }}>Testimonials</button>

          <button onClick={() => scrollTo('about')} style={{ ...linkStyle, padding: '8px 10px', borderRadius: '6px' }} onMouseEnter={e => { e.currentTarget.style.color = '#ffffff' }} onMouseLeave={e => { e.currentTarget.style.color = '#6b7280' }}>About</button>

          <button onClick={() => scrollTo('faq')} style={{ ...linkStyle, padding: '8px 10px', borderRadius: '6px' }} onMouseEnter={e => { e.currentTarget.style.color = '#ffffff' }} onMouseLeave={e => { e.currentTarget.style.color = '#6b7280' }}>FAQ</button>

          <div style={{ width: '1px', height: '20px', background: '#1e1e3a', margin: '0 6px' }} />

          <button onClick={() => navigate('/login')} onMouseEnter={e => { e.target.style.color = '#ffffff' }} onMouseLeave={e => { e.target.style.color = '#7c6ff7' }} style={{ padding: '8px 16px', background: 'transparent', color: '#7c6ff7', border: '1px solid #2a2a4a', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '14px', transition: 'all 0.2s' }}>Login</button>

          <button onClick={() => navigate('/signup')} onMouseEnter={e => { e.target.style.background = '#6355e0' }} onMouseLeave={e => { e.target.style.background = '#7c6ff7' }} style={{ padding: '8px 16px', background: '#7c6ff7', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '14px', transition: 'background 0.2s' }}>Sign Up</button>

        </div>
      </nav>
    </div>
  )
}

export default Navbar