import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

function useCountUp(end, duration = 4000, start = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start || duration === 0) {
  if (start) setCount(end)
  return
}
    let startTime = null

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(eased * end))
      if (progress < 1) requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  }, [start, end, duration])

  return count
}

function StatItem({ number, suffix, label, delay, duration }) {
  const [started, setStarted] = useState(false)
  const ref = useRef(null)
  const count = useCountUp(number, duration, started)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true) },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.8, delay }}
      className="stat-item"
      style={{ textAlign: 'left', flex: 1, minWidth: '200px' }}>
      <div style={{
        fontSize: '72px',
        fontWeight: '900',
        color: '#ffffff',
        letterSpacing: '-3px',
        lineHeight: '1',
        marginBottom: '16px'
      }}>
        {count}{suffix}
      </div>
      <div style={{
        color: '#6b7280',
        fontSize: '16px',
        fontWeight: '400',
        lineHeight: '1.6',
        maxWidth: '220px'
      }}>
        {label}
      </div>
    </motion.div>
  )
}

function Stats() {
  const stats = [
    { number: 500, suffix: '+', label: 'Students using NoteNest daily', delay: 0, duration: 1500 },
    { number: 5000, suffix: '+', label: 'Notes created by students', delay: 0.1, duration: 1500 },
    { number: 99, suffix: '%', label: 'Student satisfaction rate', delay: 0.2, duration: 1500 },
    { number: 100, suffix: '%', label: 'Free forever no hidden cost', delay: 0.3, duration: 1500 },
  ]

  return (
    <section id="stats" style={{
      padding: '100px 80px',
      background: '#0f0f1a',
    }}>


      {/* Stats Row */}
      <div 
        className="stats-container"
        style={{
          display: 'flex',
          gap: '0px',
          flexWrap: 'wrap',
          alignItems: 'flex-start'
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
            />
            {i < stats.length - 1 && (
              <div 
                className="stats-separator"
                style={{
                  width: '1px',
                  height: '120px',
                  background: 'linear-gradient(to bottom, transparent, #1e1e3a, transparent)',
                  margin: '0 40px',
                  alignSelf: 'center'
                }} 
              />
            )}
          </React.Fragment>
        ))}
      </div>

    </section>
  )
}

export default Stats