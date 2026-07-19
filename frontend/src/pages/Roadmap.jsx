import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Footer from '../components/Footer'

function Roadmap() {
  const navigate = useNavigate()

  const phases = [
    {
      phase: 'Phase 1 — Foundation',
      status: 'completed',
      color: '#22c55e',
      items: [
        'User authentication (signup/login)',
        'Create, edit, and delete notes',
        'Search functionality',
        'Responsive dashboard',
        'Dark theme UI',
      ]
    },
    {
      phase: 'Phase 2 — Core Features',
      status: 'completed',
      color: '#22c55e',
      items: [
        'Trash & restore functionality',
        'Favorites / starred notes',
        'Rich text editing',
        'Note timestamps',
        'Landing page with demo',
      ]
    },
    {
      phase: 'Phase 3 — Polish',
      status: 'in-progress',
      color: '#f59e0b',
      items: [
        'Performance optimization',
        'Accessibility improvements',
        'Mobile responsiveness',
        'Error handling & validation',
        'Documentation',
      ]
    },
    {
      phase: 'Phase 4 — Future',
      status: 'planned',
      color: '#6b7280',
      items: [
        'Note sharing & collaboration',
        'Tags and categories',
        'Export notes (PDF/Markdown)',
        'Offline support (PWA)',
        'AI-powered note summarization',
      ]
    },
  ]

  const statusLabel = {
    'completed': { text: 'Completed', bg: 'rgba(34,197,94,0.15)', color: '#22c55e' },
    'in-progress': { text: 'In Progress', bg: 'rgba(245,158,11,0.15)', color: '#f59e0b' },
    'planned': { text: 'Planned', bg: 'rgba(107,114,128,0.15)', color: '#6b7280' },
  }

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
          Product{' '}
          <span style={{ background: 'linear-gradient(135deg, #7c6ff7, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Roadmap</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ color: '#9ca3af', fontSize: '18px', lineHeight: '1.8', marginBottom: '60px', maxWidth: '600px' }}
        >
          Here's what we've built and what's coming next for NoteNest.
        </motion.p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {phases.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
              style={{
                background: '#13131f',
                borderRadius: '16px',
                padding: '32px',
                border: '1px solid #1e1e3a',
                borderLeft: `3px solid ${p.color}`,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <h3 style={{ color: '#ffffff', fontSize: '20px', fontWeight: '700', margin: 0 }}>{p.phase}</h3>
                <span style={{
                  background: statusLabel[p.status].bg,
                  color: statusLabel[p.status].color,
                  padding: '4px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: '600',
                }}>{statusLabel[p.status].text}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {p.items.map((item, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#9ca3af', fontSize: '15px' }}>
                    <span style={{ color: p.color, fontSize: '14px' }}>
                      {p.status === 'completed' ? '✓' : p.status === 'in-progress' ? '◉' : '○'}
                    </span>
                    {item}
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

export default Roadmap
