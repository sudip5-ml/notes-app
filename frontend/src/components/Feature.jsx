import { useRef } from 'react'
import { motion } from 'framer-motion'
import { FiFileText, FiEdit3, FiSearch, FiLock, FiTrash2, FiStar, FiGlobe, FiLayout } from 'react-icons/fi'

function Feature() {
  const scrollRef = useRef(null)

  const features = [
    { icon: <FiFileText size={28} />, title: 'Add Notes', desc: 'Quickly add notes anytime from any device with just one click.', color: '#7c6ff7', bg: 'rgba(124,111,247,0.15)' },
    { icon: <FiEdit3 size={28} />, title: 'Edit Notes', desc: 'Update and modify your notes whenever you need to.', color: '#3b82f6', bg: 'rgba(59,130,246,0.15)' },
    { icon: <FiSearch size={28} />, title: 'Search', desc: 'Find exactly what you are looking for in seconds.', color: '#22c55e', bg: 'rgba(34,197,94,0.15)' },
    { icon: <FiLock size={28} />, title: 'Secure Login', desc: 'Your notes are private and protected with secure authentication.', color: '#f59e0b', bg: 'rgba(245,158,11,0.15)' },
    { icon: <FiTrash2 size={28} />, title: 'Trash & Restore', desc: 'Deleted notes go to trash first so you can restore them anytime.', color: '#ef4444', bg: 'rgba(239,68,68,0.15)' },
    { icon: <FiStar size={28} />, title: 'Favorites', desc: 'Mark important notes as favorites for quick access.', color: '#f59e0b', bg: 'rgba(245,158,11,0.15)' },
    { icon: <FiGlobe size={28} />, title: 'Access Anywhere', desc: 'Use NoteNest from any browser on any device.', color: '#06b6d4', bg: 'rgba(6,182,212,0.15)' },
    { icon: <FiLayout size={28} />, title: 'Clean UI', desc: 'Simple and beautiful interface designed for students.', color: '#a78bfa', bg: 'rgba(167,139,250,0.15)' },
  ]

  return (
    <section id="features" style={{
      padding: '100px 0px',
      background: '#13131f',
      textAlign: 'center',
      overflow: 'hidden'
    }}>

  
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          fontSize: '40px', fontWeight: '800',
          marginBottom: '12px', color: '#ffffff',
          letterSpacing: '-1px'
        }}>
        Why <span style={{
          background: 'linear-gradient(135deg, #7c6ff7, #a78bfa)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>NoteNest?</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        style={{ color: '#6b7280', marginBottom: '48px', fontSize: '16px' }}>
        Everything you need — scroll or use the arrows to explore
      </motion.p>

      {/* Scrollable Cards */}
      <div
        ref={scrollRef}
        className="no-scrollbar"
        style={{
          display: 'flex',
          gap: '24px',
          overflowX: 'auto',
          padding: '20px 80px 40px 80px',
          scrollSnapType: 'x proximity',
          WebkitOverflowScrolling: 'touch',
        }}>

        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-6px)'
              e.currentTarget.style.boxShadow = '0 0 40px rgba(124,111,247,0.3)'
              e.currentTarget.style.background = 'linear-gradient(#1a1a3e, #13131f) padding-box, linear-gradient(135deg, #7c6ff7, #a78bfa, #7c6ff7) border-box'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0px)'
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)'
              e.currentTarget.style.background = 'linear-gradient(#13131f, #1a1040) padding-box, linear-gradient(135deg, #7c6ff7, #a78bfa, #7c6ff7) border-box'
            }}
            style={{
              background: 'linear-gradient(#13131f, #1a1040) padding-box, linear-gradient(135deg, #7c6ff7, #a78bfa, #7c6ff7) border-box',
              borderRadius: '16px',
              padding: '36px 32px',
              minWidth: '290px',
              maxWidth: '290px',
              border: '2px solid transparent',
              transition: 'all 0.3s ease',
              textAlign: 'left',
              flexShrink: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
              scrollSnapAlign: 'start',
            }}>

            <div>
              <div style={{
                width: '60px', height: '60px',
                background: f.bg,
                borderRadius: '16px',
                display: 'flex', alignItems: 'center',
                justifyContent: 'center',
                color: f.color,
                marginBottom: '24px',
                boxShadow: `0 0 20px ${f.bg}`
              }}>
                {f.icon}
              </div>

              <h3 style={{ fontSize: '19px', fontWeight: '700', color: '#ffffff', marginBottom: '12px' }}>{f.title}</h3>
              <p style={{ color: '#6b7280', fontSize: '14px', lineHeight: '1.7', marginBottom: '28px' }}>{f.desc}</p>
            </div>

            <div style={{ color: f.color, fontSize: '20px', fontWeight: '600' }}>→</div>

          </motion.div>
        ))}
      </div>

      {/* Bottom Arrows */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginTop: '24px' }}>
        <button
          onClick={() => scrollRef.current?.scrollBy({ left: -320, behavior: 'smooth' })}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(124,111,247,0.4)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(124,111,247,0.2)' }}
          style={{
            background: 'rgba(124,111,247,0.2)',
            border: '1px solid rgba(124,111,247,0.4)',
            borderRadius: '50%',
            width: '52px', height: '52px',
            color: '#7c6ff7', fontSize: '22px',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s'
          }}>
          ←
        </button>
        <button
          onClick={() => scrollRef.current?.scrollBy({ left: 320, behavior: 'smooth' })}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(124,111,247,0.4)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(124,111,247,0.2)' }}
          style={{
            background: 'rgba(124,111,247,0.2)',
            border: '1px solid rgba(124,111,247,0.4)',
            borderRadius: '50%',
            width: '52px', height: '52px',
            color: '#7c6ff7', fontSize: '22px',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s'
          }}>
          →
        </button>
      </div>

    </section>
  )
}

export default Feature