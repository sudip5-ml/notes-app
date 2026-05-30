import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import heroImg from '../assets/hero.jpg'

function Hero() {
  const navigate = useNavigate()

  return (
    <section style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '100px 80px',
      background: '#0f0f1a',
      position: 'relative',
      overflow: 'hidden',
      gap: '60px'
    }}>

      {/* Background glow */}
      <div style={{
        position: 'absolute',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(124,111,247,0.15) 0%, transparent 70%)',
        borderRadius: '50%',
        top: '50%',
        left: '30%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none'
      }} />

      {/* Left side */}
      <div style={{ flex: 1, zIndex: 1 }}>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: false }}
transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          style={{
            fontSize: '58px',
            fontWeight: '800',
            marginBottom: '24px',
            lineHeight: '1.1',
            color: '#ffffff',
            letterSpacing: '-1px'
          }}>
          Your Notes,{' '}
          <span style={{
            background: 'linear-gradient(135deg, #7c6ff7, #a78bfa)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Safe & Organized
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 60 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: false }}
transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          style={{
            fontSize: '18px',
            color: '#6b7280',
            maxWidth: '480px',
            marginBottom: '48px',
            lineHeight: '1.8'
          }}>
          NoteNest is a simple and secure place to store all your notes.
          Add, edit, search and access them from anywhere!
        </motion.p>

        {/* Buttons */}
        <motion.div
         initial={{ opacity: 0, y: 60 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: false }}
transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <button
            onClick={() => navigate('/signup')}
            onMouseEnter={e => e.target.style.background = '#6355e0'}
            onMouseLeave={e => e.target.style.background = '#7c6ff7'}
            style={{
              padding: '14px 36px', fontSize: '16px',
              background: '#7c6ff7', color: 'white',
              border: 'none', borderRadius: '8px',
              cursor: 'pointer', fontWeight: 'bold',
              transition: 'background 0.2s'
            }}>
            Get Started Free →
          </button>

          <button
            onClick={() => navigate('/login')}
            onMouseEnter={e => { e.target.style.background = 'rgba(124,111,247,0.1)'; e.target.style.borderColor = '#7c6ff7' }}
            onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.borderColor = '#2a2a4a' }}
            style={{
              padding: '14px 36px', fontSize: '16px',
              background: 'transparent', color: 'white',
              border: '1px solid #2a2a4a', borderRadius: '8px',
              cursor: 'pointer', fontWeight: 'bold',
              transition: 'all 0.2s'
            }}>
            Login
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: false }}
transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          style={{ display: 'flex', gap: '48px', marginTop: '64px', flexWrap: 'wrap' }}>
          {[
            { number: '100%', label: 'Free to use' },
            { number: '3', label: 'Team members' },
            { number: '∞', label: 'Notes you can store' },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#7c6ff7' }}>{s.number}</div>
              <div style={{ fontSize: '13px', color: '#6b7280', marginTop: '4px' }}>{s.label}</div>
            </div>
          ))}
        </motion.div>

      </div>

      {/* Right side - Image */}
      <motion.div
       initial={{ opacity: 0, y: 60 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: false }}
transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
        style={{
          flex: 1, zIndex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <div style={{
          borderRadius: '20px',
          overflow: 'hidden',
          border: '1px solid #1e1e3a',
          boxShadow: '0 0 60px rgba(124,111,247,0.2)',
          maxWidth: '500px',
          width: '100%'
        }}>
          <img
            src={heroImg}
            alt="Person using NoteNest"
            style={{
              width: '100%',
              height: '400px',
              objectFit: 'cover',
              display: 'block'
            }}
          />
        </div>
      </motion.div>

    </section>
  )
}

export default Hero