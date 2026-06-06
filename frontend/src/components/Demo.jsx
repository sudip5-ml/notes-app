import { motion } from 'framer-motion'
import dashboardVideo from '../assets/vidforloop.mp4'

function Demo() {
  return (
   <section id="demo" style={{
  padding: '100px 80px',
  background: '#0f0f1a',
  textAlign: 'center',
  position: 'relative'
}}>
  
      {/* Background glow */}
      <div style={{
        position: 'absolute',
        width: '800px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(124,111,247,0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none'
      }} />

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8, delay: 0.1 }}
        style={{
          fontSize: '40px',
          fontWeight: '800',
          marginBottom: '12px',
          color: '#ffffff',
          letterSpacing: '-1px'
        }}>
        Simple, Fast and{' '}
        <span style={{
          background: 'linear-gradient(135deg, #7c6ff7, #a78bfa)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>Beautiful</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{
          color: '#6b7280',
          marginBottom: '48px',
          fontSize: '16px'
        }}>
        Watch how easy it is to manage your notes with NoteNest
      </motion.p>

      {/* Video */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8, delay: 0.3 }}
        style={{
          borderRadius: '20px',
          overflow: 'hidden',
          border: '1px solid #1e1e3a',
          boxShadow: '0 0 80px rgba(124,111,247,0.25)',
          maxWidth: '900px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 1
        }}>

        {/* Fake browser bar */}
        <div style={{
          background: '#13131f',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          borderBottom: '1px solid #1e1e3a'
        }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444' }} />
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f59e0b' }} />
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#22c55e' }} />
          <div style={{
            flex: 1, background: '#0f0f1a', borderRadius: '6px',
            padding: '4px 12px', fontSize: '12px', color: '#6b7280',
            marginLeft: '8px'
          }}>
            localhost:5173/dashboard
          </div>
        </div>

        <video
          src={dashboardVideo}
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: '100%',
            display: 'block'
          }}
        />
      </motion.div>

    </section>
  )
}

export default Demo