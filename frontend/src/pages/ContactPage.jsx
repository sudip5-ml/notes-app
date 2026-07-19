import React from 'react'
import { useNavigate } from 'react-router-dom'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

function ContactPage() {
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

      <Contact />
      <Footer />
    </div>
  )
}

export default ContactPage
