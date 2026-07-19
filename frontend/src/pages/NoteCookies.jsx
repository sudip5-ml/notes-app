import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Footer from '../components/Footer'

function CookiePolicy() {
  const navigate = useNavigate()

  const sections = [
    {
      title: '1. What Are Cookies?',
      content: 'Cookies are small text files stored on your device when you visit a website. They help the website remember your preferences and improve your experience.'
    },
    {
      title: '2. Cookies We Use',
      content: 'NoteNest uses only essential cookies required for the service to function. Specifically, we use authentication tokens (JWT) stored in your browser to keep you logged in. We do not use any advertising, analytics, or third-party tracking cookies.'
    },
    {
      title: '3. Essential Cookies',
      content: 'These cookies are strictly necessary for NoteNest to work. They include your authentication token which identifies your session. Without these, you would not be able to log in or access your notes.'
    },
    {
      title: '4. No Third-Party Cookies',
      content: 'NoteNest does not use any third-party cookies. We do not embed ads, social media trackers, or analytics services that would place cookies on your device.'
    },
    {
      title: '5. Managing Cookies',
      content: 'You can manage or delete cookies through your browser settings. Note that disabling essential cookies will prevent you from logging in to NoteNest. Logging out will clear your authentication cookie.'
    },
    {
      title: '6. Contact Us',
      content: 'If you have questions about our cookie practices, please reach out through our Contact page. We are happy to provide more information.'
    },
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

      <section style={{ padding: '100px 80px', maxWidth: '750px', margin: '0 auto' }}>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ fontSize: '48px', fontWeight: '800', color: '#ffffff', marginBottom: '8px', letterSpacing: '-1.5px' }}
        >
          Cookie{' '}
          <span style={{ background: 'linear-gradient(135deg, #7c6ff7, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Policy</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ color: '#4b5563', fontSize: '14px', marginBottom: '48px' }}
        >
          Last updated: June 2026
        </motion.p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {sections.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.06 }}
            >
              <h2 style={{ color: '#ffffff', fontSize: '20px', fontWeight: '600', marginBottom: '12px' }}>{s.title}</h2>
              <p style={{ color: '#9ca3af', fontSize: '15px', lineHeight: '1.8', margin: 0 }}>{s.content}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default CookiePolicy
