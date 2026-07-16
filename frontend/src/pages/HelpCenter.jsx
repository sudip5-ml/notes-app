import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import FAQ from '../components/FAQ'
import Footer from '../components/Footer'

function HelpCenter() {
  const navigate = useNavigate()

  const guides = [
    { icon: '📝', title: 'Getting Started', desc: 'Learn how to create your account and start taking notes in under a minute.', link: '/signup' },
    { icon: '🔍', title: 'Searching Notes', desc: 'Use the search bar on your dashboard to instantly find any note by title or content.' },
    { icon: '⭐', title: 'Using Favorites', desc: 'Click the star icon on any note to mark it as a favorite for quick access.' },
    { icon: '🗑️', title: 'Trash & Restore', desc: 'Accidentally deleted a note? Find it in Trash and restore it with one click.' },
    { icon: '✏️', title: 'Editing Notes', desc: 'Click on any note to open it, make your changes, and save automatically.' },
    { icon: '🔐', title: 'Account Security', desc: 'Keep your account safe by using a strong password. Your data is encrypted.', link: '/security' },
  ]

  return (
    <div style={{ background: '#0f0f1a', minHeight: '100vh' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 40px', background: 'rgba(15,15,26,0.95)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(124,111,247,0.3)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
          <span style={{ background: 'linear-gradient(135deg, #7c6ff7, #a78bfa)', borderRadius: '10px', padding: '6px 10px', fontSize: '16px', fontWeight: '900', color: 'white', boxShadow: '0 0 15px rgba(124,111,247,0.6)' }}>NN</span>
          <span style={{ fontWeight: '800', fontSize: '18px', color: '#ffffff' }}>NoteNest</span>
        </div>
        <button onClick={() => navigate('/')} style={{ padding: '8px 16px', background: 'transparent', color: '#7c6ff7', border: '1px solid #2a2a4a', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '14px' }}>← Back to Home</button>
      </nav>

      <section style={{ padding: '100px 80px', maxWidth: '900px', margin: '0 auto' }}>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ fontSize: '48px', fontWeight: '800', color: '#ffffff', marginBottom: '16px', letterSpacing: '-1.5px' }}
        >
          Help{' '}
          <span style={{ background: 'linear-gradient(135deg, #7c6ff7, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Center</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ color: '#9ca3af', fontSize: '18px', lineHeight: '1.8', marginBottom: '60px', maxWidth: '600px' }}
        >
          Everything you need to get the most out of NoteNest.
        </motion.p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', marginBottom: '80px' }}>
          {guides.map((g, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
              onClick={() => g.link && navigate(g.link)}
              style={{
                background: '#13131f',
                borderRadius: '16px',
                padding: '28px',
                border: '1px solid #1e1e3a',
                cursor: g.link ? 'pointer' : 'default',
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(124,111,247,0.4)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#1e1e3a'}
            >
              <div style={{ fontSize: '28px', marginBottom: '14px' }}>{g.icon}</div>
              <h3 style={{ color: '#ffffff', fontSize: '17px', fontWeight: '600', marginBottom: '8px' }}>{g.title}</h3>
              <p style={{ color: '#6b7280', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>{g.desc}</p>
            </motion.div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ color: '#ffffff', fontSize: '28px', fontWeight: '700', marginBottom: '12px' }}>Still need help?</h2>
          <p style={{ color: '#6b7280', fontSize: '15px', marginBottom: '24px' }}>Can't find what you're looking for? Reach out to us directly.</p>
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
            Contact Support →
          </button>
        </div>
      </section>

      <FAQ />
      <Footer />
    </div>
  )
}

export default HelpCenter
