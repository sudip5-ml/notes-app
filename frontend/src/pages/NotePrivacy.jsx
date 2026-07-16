import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Footer from '../components/Footer'

function PrivacyPolicy() {
  const navigate = useNavigate()

  const sections = [
    {
      title: '1. Information We Collect',
      content: 'When you create a NoteNest account, we collect your email address and a securely hashed version of your password. We also store the notes you create, including their content, titles, and timestamps. We do not collect any additional personal information, browsing data, or third-party tracking data.'
    },
    {
      title: '2. How We Use Your Information',
      content: 'Your information is used solely to provide the NoteNest service — authenticating your identity, storing your notes, and enabling features like search, favorites, and trash. We do not use your data for advertising, marketing to third parties, or any purpose beyond delivering the service you signed up for.'
    },
    {
      title: '3. Data Storage & Security',
      content: 'Your data is stored securely in our MongoDB database. Passwords are hashed using bcrypt before storage. All data in transit is encrypted via HTTPS/TLS. We follow industry best practices to protect your information from unauthorized access.'
    },
    {
      title: '4. Data Sharing',
      content: 'We do not sell, trade, or share your personal information or note content with any third parties. Your notes are private and accessible only to you through your authenticated account.'
    },
    {
      title: '5. Data Deletion',
      content: 'When you delete a note, it moves to Trash where you can restore or permanently delete it. Permanently deleted notes are removed from our servers. If you wish to delete your entire account, contact us and we will remove all associated data.'
    },
    {
      title: '6. Changes to This Policy',
      content: 'We may update this privacy policy from time to time. Any changes will be reflected on this page with an updated revision date. Continued use of NoteNest after changes constitutes acceptance of the updated policy.'
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
          Privacy{' '}
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

export default PrivacyPolicy
