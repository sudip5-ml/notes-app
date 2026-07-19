import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Footer from '../components/Footer'

function Documentation() {
  const navigate = useNavigate()

  const sections = [
    {
      title: 'Quick Start',
      items: [
        { title: 'Creating an Account', desc: 'Sign up with your email and password to get started instantly.' },
        { title: 'Your Dashboard', desc: 'After login, you\'ll see your dashboard with all your notes, search bar, and action buttons.' },
        { title: 'Creating a Note', desc: 'Click "Add Note" on your dashboard. Enter a title and content, then save.' },
      ]
    },
    {
      title: 'Features',
      items: [
        { title: 'Search', desc: 'Use the search bar at the top of your dashboard to filter notes by title or content in real-time.' },
        { title: 'Favorites', desc: 'Star important notes to mark them as favorites. Access them quickly via the favorites filter.' },
        { title: 'Trash & Restore', desc: 'When you delete a note, it moves to Trash. You can restore it or permanently delete it from there.' },
        { title: 'Edit Notes', desc: 'Click on any note to open it in edit mode. Changes are saved when you click the save button.' },
      ]
    },
    {
      title: 'Account',
      items: [
        { title: 'Login', desc: 'Use your registered email and password to log in. Sessions are maintained via secure tokens.' },
        { title: 'Logout', desc: 'Click the logout button on the dashboard to securely end your session.' },
        { title: 'Security', desc: 'Passwords are hashed with bcrypt. All communication uses HTTPS encryption.' },
      ]
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

      <section style={{ padding: '100px 80px', maxWidth: '800px', margin: '0 auto' }}>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ fontSize: '48px', fontWeight: '800', color: '#ffffff', marginBottom: '16px', letterSpacing: '-1.5px' }}
        >
          <span style={{ background: 'linear-gradient(135deg, #7c6ff7, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Documentation</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ color: '#9ca3af', fontSize: '18px', lineHeight: '1.8', marginBottom: '60px', maxWidth: '600px' }}
        >
          Complete guide to using NoteNest effectively.
        </motion.p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
          {sections.map((section, si) => (
            <motion.div
              key={si}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 + si * 0.1 }}
            >
              <h2 style={{
                color: '#7c6ff7',
                fontSize: '14px',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                marginBottom: '24px',
              }}>{section.title}</h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {section.items.map((item, ii) => (
                  <div
                    key={ii}
                    style={{
                      background: '#13131f',
                      borderRadius: '12px',
                      padding: '24px',
                      border: '1px solid #1e1e3a',
                    }}
                  >
                    <h3 style={{ color: '#ffffff', fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>{item.title}</h3>
                    <p style={{ color: '#6b7280', fontSize: '14px', lineHeight: '1.7', margin: 0 }}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Documentation
