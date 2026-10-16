import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Footer from '../components/Footer'

function Careers() {
  const navigate = useNavigate()

  return (
    <div style={{ background: '#0f0f1a', minHeight: '100vh' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 40px', background: 'rgba(15,15,26,0.95)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(124,111,247,0.3)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
          <span style={{ background: 'linear-gradient(135deg, #7c6ff7, #a78bfa)', borderRadius: '10px', padding: '6px 10px', fontSize: '16px', fontWeight: '900', color: 'white', boxShadow: '0 0 15px rgba(124,111,247,0.6)' }}>NN</span>
          <span style={{ fontWeight: '800', fontSize: '18px', color: '#ffffff' }}>NoteNest</span>
        </div>
        <button onClick={() => navigate('/')} style={{ padding: '8px 16px', background: 'transparent', color: '#7c6ff7', border: '1px solid #2a2a4a', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '14px' }}>← Back to Home</button>
      </nav>

      <section style={{ padding: '100px 80px', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            background: 'linear-gradient(135deg, rgba(124,111,247,0.1), rgba(167,139,250,0.05))',
            borderRadius: '20px',
            padding: '80px 60px',
            border: '1px solid rgba(124,111,247,0.2)',
          }}
        >
          <div style={{ fontSize: '64px', marginBottom: '24px' }}>🚀</div>
          <h1 style={{ fontSize: '42px', fontWeight: '800', color: '#ffffff', marginBottom: '16px', letterSpacing: '-1px' }}>
            Join the{' '}
            <span style={{ background: 'linear-gradient(135deg, #7c6ff7, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>NoteNest</span>{' '}
            Team
          </h1>
          <p style={{ color: '#9ca3af', fontSize: '18px', lineHeight: '1.8', marginBottom: '32px', maxWidth: '500px', margin: '0 auto 32px' }}>
            We're a small student team at Kathmandu Institute of Technology. While we don't have open positions right now, we're always looking for passionate people.
          </p>
          <p style={{ color: '#6b7280', fontSize: '15px', lineHeight: '1.7', marginBottom: '40px' }}>
            If you're interested in contributing to NoteNest — whether it's code, design, or ideas — reach out to us!
          </p>
          <button
            onClick={() => navigate('/contact')}
            onMouseEnter={e => e.target.style.background = '#6355e0'}
            onMouseLeave={e => e.target.style.background = '#7c6ff7'}
            style={{
              padding: '14px 32px',
              background: '#7c6ff7',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
          >
            Get in Touch →
          </button>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}

export default Careers
