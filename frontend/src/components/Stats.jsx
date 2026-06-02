import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

// Clean, readable word-by-word stagger animation
export function AnimatedHeading({ text, style }) {
  const words = text.split(" ");
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      }
    }
  };
  
  const wordVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        damping: 16,
        stiffness: 120
      }
    }
  };
  
  return (
    <motion.h2
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        ...style
      }}
    >
      {words.map((word, wordIndex) => (
        <motion.span
          key={wordIndex}
          variants={wordVariants}
          style={{ display: "inline-block", marginRight: "10px" }}
        >
          {word}
        </motion.span>
      ))}
    </motion.h2>
  );
}

function useCountUp(end, duration = 4000, start = false, slow = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start) return
    let startTime = null

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      
      const eased = slow 
        ? progress 
        : 1 - Math.pow(1 - progress, 4)
        
      setCount(Math.floor(eased * end))
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [start, end, duration, slow])

  return count
}

function StatItem({ number, suffix, label, delay, duration, slow }) {
  const [started, setStarted] = useState(false)
  const ref = useRef(null)
  const count = useCountUp(number, duration, started, slow)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      className="stat-item"
      style={{ textAlign: 'center', flex: 1, minWidth: '220px', padding: '10px' }}>
      <div style={{
        fontSize: 'clamp(48px, 6vw, 76px)',
        fontWeight: '900',
        background: 'linear-gradient(135deg, #7c6ff7, #a78bfa)', // design.md primary gradient
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        letterSpacing: '-2px',
        lineHeight: '1.1',
        marginBottom: '16px'
      }}>
        {count}{suffix}
      </div>
      <div style={{
        color: '#9ca3af', // design.md secondary text
        fontSize: '15px',
        fontWeight: '500',
        lineHeight: '1.6',
        maxWidth: '220px',
        margin: '0 auto'
      }}>
        {label}
      </div>
    </motion.div>
  )
}

function Stats() {
  const stats = [
    { number: 250, suffix: 'k+', label: 'Total notes created by students', delay: 0, duration: 1500, slow: false },
    { number: 500, suffix: '+', label: 'Study projects and collaborations', delay: 0.15, duration: 8000, slow: true }, // counts up to 500 over 8s
    { number: 98, suffix: '%', label: 'Student satisfaction rate', delay: 0.3, duration: 1500, slow: false },
    { number: 50, suffix: 'k', label: 'Study notes shared globally', delay: 0.45, duration: 1500, slow: false },
  ]

  return (
    <section id="stats" style={{
      padding: '120px 40px',
      background: '#0f0f1a', // design.md base bg
      borderTop: '1px solid #1e1e3a',
      position: 'relative',
      overflow: 'hidden'
    }}>
      
      {/* Subtle background glow */}
      <div style={{
        position: 'absolute',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(124,111,247,0.06) 0%, transparent 70%)',
        borderRadius: '50%',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', zIndex: 1, position: 'relative' }}>
        
        {/* Header with Staggered Word Animation */}
        <div style={{ marginBottom: '80px', textAlign: 'center' }}>
          <AnimatedHeading 
            text="NoteNest by the Numbers" 
            style={{
              fontSize: 'clamp(28px, 4vw, 42px)', 
              fontWeight: '800', 
              color: '#ffffff', 
              letterSpacing: '-1px',
              marginBottom: '16px',
              justifyContent: 'center'
            }} 
          />
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{ color: '#6b7280', fontSize: '16px' }}
          >
            Scaling high performance features for creators and teams globally
          </motion.p>
        </div>

        {/* Stats Row */}
        <div 
          className="stats-container"
          style={{
            display: 'flex',
            gap: '20px',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {stats.map((s, i) => (
            <React.Fragment key={i}>
              <StatItem
                number={s.number}
                suffix={s.suffix}
                label={s.label}
                delay={s.delay}
                duration={s.duration}
                slow={s.slow}
              />
              {i < stats.length - 1 && (
                <div 
                  className="stats-separator"
                  style={{
                    width: '1px',
                    height: '80px',
                    background: 'linear-gradient(to bottom, transparent, #1e1e3a, transparent)', // design.md divider
                    alignSelf: 'center'
                  }} 
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Stats