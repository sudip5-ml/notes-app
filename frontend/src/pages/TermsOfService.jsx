import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Footer from '../components/Footer'

function TermsOfService() {
  const navigate = useNavigate()

  const sections = [
    {
      title: '1. Acceptance of Terms',
      content: 'By accessing or using NoteNest, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the service. NoteNest is a student project developed at Kathmandu Institute of Technology.'
    },
    {
      title: '2. Use of the Service',
      content: 'NoteNest provides a free, web-based note-taking application. You may use NoteNest for personal, educational, and non-commercial purposes. You are responsible for maintaining the confidentiality of your account credentials.'
    },
    {
      title: '3. User Content',
      content: 'You retain full ownership of the notes and content you create in NoteNest. We do not claim any intellectual property rights over your content. You are responsible for the content you create and must not use the service for any illegal or harmful purposes.'
    },
    {
      title: '4. Account Responsibilities',
      content: 'You are responsible for all activity that occurs under your account. You agree to use a strong password and to notify us immediately if you suspect unauthorized access. You must be a student or educator to use the service (though we do not strictly enforce this).'
    },
    {
      title: '5. Service Availability',
      content: 'NoteNest is provided "as is" without warranties of any kind. As a student project, we strive for reliability but cannot guarantee 100% uptime. We reserve the right to modify or discontinue the service at any time with reasonable notice.'
    },
    {
      title: '6. Limitation of Liability',
      content: 'NoteNest and its team shall not be liable for any indirect, incidental, or consequential damages resulting from your use of the service. We recommend keeping important backups of critical notes outside of NoteNest.'
    },
    {
      title: '7. Changes to Terms',
      content: 'We may update these terms from time to time. Continued use of NoteNest after changes constitutes acceptance. We will make reasonable efforts to notify users of significant changes.'
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
          Terms of{' '}
          <span style={{ background: 'linear-gradient(135deg, #7c6ff7, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Service</span>
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

export default TermsOfService
