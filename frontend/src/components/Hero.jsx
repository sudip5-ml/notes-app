import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import dashboardVideo from '../assets/vidforloop.mp4'

function Hero() {
  const navigate = useNavigate()

  return (
    <section style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      padding: '120px 20px 80px 20px',
      background: '#0f0f1a',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Background glow effects */}
      <div style={{
        position: 'absolute',
        width: '800px',
        height: '800px',
        background: 'radial-gradient(circle, rgba(124,111,247,0.12) 0%, transparent 70%)',
        borderRadius: '50%',
        top: '10%',
        left: '50%',
        transform: 'translateX(-50%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div style={{
        position: 'absolute',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(167,139,250,0.08) 0%, transparent 70%)',
        borderRadius: '50%',
        bottom: '10%',
        left: '10%',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      {/* Hero Content Wrapper */}
      <div style={{ maxWidth: '1000px', width: '100%', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            fontSize: 'clamp(40px, 6vw, 68px)',
            fontWeight: '800',
            marginBottom: '24px',
            lineHeight: '1.15',
            color: '#ffffff',
            letterSpacing: '-2px',
            maxWidth: '800px'
          }}>
          The Simplest{' '}
          <span style={{
            background: 'linear-gradient(135deg, #7c6ff7, #a78bfa)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Notes App
          </span>{' '}
          for Students
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          style={{
            fontSize: 'clamp(16px, 2.5vw, 20px)',
            color: '#9ca3af',
            maxWidth: '680px',
            marginBottom: '40px',
            lineHeight: '1.6',
            fontWeight: '400'
          }}>
          Remember everything and tackle any project with your notes, tasks, and schedule all in one place.
        </motion.p>

        {/* Call to Action Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', marginBottom: '64px' }}
        >
          <button
            onClick={() => navigate('/signup')}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #8b7eff, #bba4ff)'
              e.currentTarget.style.boxShadow = '0 0 25px rgba(124, 111, 247, 0.4)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #7c6ff7, #a78bfa)'
              e.currentTarget.style.boxShadow = '0 0 20px rgba(124, 111, 247, 0.2)'
            }}
            style={{
              padding: '16px 40px',
              fontSize: '18px',
              background: 'linear-gradient(135deg, #7c6ff7, #a78bfa)',
              color: 'white',
              border: 'none',
              borderRadius: '30px',
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: 'all 0.3s ease',
              boxShadow: '0 0 20px rgba(124, 111, 247, 0.2)'
            }}>
            Get NoteNest free
          </button>

          <div style={{ fontSize: '15px', color: '#9ca3af' }}>
            Already have an account?{' '}
            <span 
              onClick={() => navigate('/login')}
              onMouseEnter={e => e.currentTarget.style.color = '#a78bfa'}
              onMouseLeave={e => e.currentTarget.style.color = '#7c6ff7'}
              style={{
                color: '#7c6ff7',
                textDecoration: 'underline',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'color 0.2s'
              }}
            >
              Log in
            </span>
          </div>
        </motion.div>

        {/* Dashboard Mockup (Browser Style) */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: "easeOut", delay: 0.45 }}
          style={{
            width: '100%',
            maxWidth: '900px',
            borderRadius: '16px',
            overflow: 'hidden',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            background: '#131324',
            boxShadow: '0 30px 100px rgba(0, 0, 0, 0.6), 0 0 50px rgba(124, 111, 247, 0.15)',
            zIndex: 2
          }}
          whileHover={{
            y: -5,
            boxShadow: '0 35px 110px rgba(0, 0, 0, 0.7), 0 0 60px rgba(124, 111, 247, 0.25)',
            transition: { duration: 0.3 }
          }}
        >
          {/* Browser Header Bar */}
          <div style={{
            background: '#13131f',
            padding: '12px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
          }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444' }} />
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f59e0b' }} />
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#22c55e' }} />
            <div style={{
              flex: 1,
              background: '#0f0f1a',
              borderRadius: '6px',
              padding: '6px 16px',
              fontSize: '13px',
              color: '#9ca3af',
              marginLeft: '12px',
              textAlign: 'left',
              fontFamily: 'monospace',
              border: '1px solid rgba(255, 255, 255, 0.03)'
            }}>
              notenest.com/dashboard
            </div>
          </div>

          {/* Looping Dashboard Video */}
          <video
            src={dashboardVideo}
            autoPlay
            loop
            muted
            playsInline
            style={{
              width: '100%',
              display: 'block',
              borderBottomLeftRadius: '16px',
              borderBottomRightRadius: '16px'
            }}
          />
        </motion.div>

      </div>

    </section>
  )
}

export default Hero