import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Footer from '../components/Footer'

function Security() {
  const navigate = useNavigate()

  const features = [
    { icon: '🔐', title: 'Secure Authentication', desc: 'Industry-standard JWT-based authentication keeps your account protected. Passwords are hashed with bcrypt before storage.' },
    { icon: '🛡️', title: 'Data Encryption', desc: 'All data in transit is encrypted via HTTPS/TLS. Your notes travel securely between your device and our servers.' },
    { icon: '🔒', title: 'Private by Default', desc: 'Your notes are private to your account. No one — not even our team — can read your personal notes.' },
    { icon: '🚫', title: 'No Data Selling', desc: 'We never sell, share, or monetize your data. Your notes belong to you, period.' },
    { icon: '🗑️', title: 'Safe Deletion', desc: 'Deleted notes go to Trash first. Permanently deleted data is removed from our servers completely.' },
    { icon: '🔄', title: 'Session Management', desc: 'Automatic session expiration and secure token refresh keep your account safe even on shared devices.' },
  ]

  return (
    <div style={{ background: '#0f0f1a', minHeight: '100vh' }}>
      {/* Simple top nav */}
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
          Security at{' '}
          <span style={{ background: 'linear-gradient(135deg, #7c6ff7, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>NoteNest</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ color: '#9ca3af', fontSize: '18px', lineHeight: '1.8', marginBottom: '60px', maxWidth: '600px' }}
        >
          Your notes are personal. We take every measure to ensure they stay that way.
        </motion.p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
              style={{
                background: '#13131f',
                borderRadius: '16px',
                padding: '32px',
                border: '1px solid #1e1e3a',
                transition: 'border-color 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(124,111,247,0.4)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#1e1e3a'}
            >
              <div style={{ fontSize: '32px', marginBottom: '16px' }}>{f.icon}</div>
              <h3 style={{ color: '#ffffff', fontSize: '18px', fontWeight: '600', marginBottom: '10px' }}>{f.title}</h3>
              <p style={{ color: '#6b7280', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Security
