import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Footer from '../components/Footer'

function Status() {
  const navigate = useNavigate()

  const services = [
    { name: 'Web Application', status: 'operational', uptime: '99.9%' },
    { name: 'Authentication Service', status: 'operational', uptime: '99.8%' },
    { name: 'API Server', status: 'operational', uptime: '99.9%' },
    { name: 'Database', status: 'operational', uptime: '99.7%' },
  ]

  const statusConfig = {
    operational: { text: 'Operational', color: '#22c55e', bg: 'rgba(34,197,94,0.15)' },
    degraded: { text: 'Degraded', color: '#f59e0b', bg: 'rgba(245,158,11,0.15)' },
    outage: { text: 'Outage', color: '#ef4444', bg: 'rgba(239,68,68,0.15)' },
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

      <section style={{ padding: '100px 80px', maxWidth: '700px', margin: '0 auto' }}>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ fontSize: '48px', fontWeight: '800', color: '#ffffff', marginBottom: '16px', letterSpacing: '-1.5px' }}
        >
          System{' '}
          <span style={{ background: 'linear-gradient(135deg, #7c6ff7, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Status</span>
        </motion.h1>

        {/* Overall status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            background: 'rgba(34,197,94,0.1)',
            border: '1px solid rgba(34,197,94,0.3)',
            borderRadius: '12px',
            padding: '20px 24px',
            marginBottom: '40px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#22c55e', boxShadow: '0 0 10px rgba(34,197,94,0.5)' }} />
          <span style={{ color: '#22c55e', fontSize: '16px', fontWeight: '600' }}>All Systems Operational</span>
        </motion.div>

        {/* Services */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '60px' }}>
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
              style={{
                background: '#13131f',
                borderRadius: '12px',
                padding: '20px 24px',
                border: '1px solid #1e1e3a',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <span style={{ color: '#ffffff', fontSize: '15px', fontWeight: '600' }}>{s.name}</span>
                <span style={{ color: '#4b5563', fontSize: '13px', marginLeft: '12px' }}>Uptime: {s.uptime}</span>
              </div>
              <span style={{
                background: statusConfig[s.status].bg,
                color: statusConfig[s.status].color,
                padding: '4px 14px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '600',
              }}>{statusConfig[s.status].text}</span>
            </motion.div>
          ))}
        </div>

        {/* Uptime bars (visual) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h3 style={{ color: '#ffffff', fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>30-Day Uptime</h3>
          <div style={{ display: 'flex', gap: '3px', height: '32px' }}>
            {Array.from({ length: 30 }, (_, i) => {
              // Deterministic pseudorandom-like values for pure rendering
              const baseOpacity = 0.7 + ((i * 7) % 10) * 0.03
              return (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    background: '#22c55e',
                    borderRadius: '3px',
                    opacity: baseOpacity,
                    transition: 'opacity 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.opacity = '1' }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = String(baseOpacity) }}
                />
              )
            })}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
            <span style={{ color: '#4b5563', fontSize: '12px' }}>30 days ago</span>
            <span style={{ color: '#4b5563', fontSize: '12px' }}>Today</span>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}

export default Status
