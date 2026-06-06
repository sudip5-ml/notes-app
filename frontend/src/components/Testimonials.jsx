import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AnimatedHeading } from './Stats'

function Testimonials() {
  const [current, setCurrent] = useState(0)

  const testimonials = [
    { name: 'Aron Lama', role: 'BCA Student', avatar: 'AL', review: 'NoteNest is the best notes app I have ever used! Super simple and clean. I use it every day for my college notes. Highly recommended for all students!', stars: 5, color: '#7c6ff7' },
    { name: 'Pramesh Shrestha', role: 'CSIT Student', avatar: 'PS', review: 'I love how easy it is to search and find my notes instantly. The dark theme is absolutely perfect for late night studying sessions!', stars: 5, color: '#3b82f6' },
    { name: 'Milan Saru', role: 'IT Student', avatar: 'MS', review: 'The trash and restore feature saved me so many times. I accidentally deleted an important note and got it back instantly. Amazing!', stars: 5, color: '#22c55e' },
    { name: 'Sita Gurung', role: 'BIT Student', avatar: 'SG', review: 'Finally a notes app that is completely free and simple to use. No complicated menus, just write your notes and you are done!', stars: 5, color: '#f59e0b' },
    { name: 'Dipesh Rai', role: 'BCE Student', avatar: 'DR', review: 'The favorites feature is so useful. I mark my most important notes and find them in seconds. NoteNest is a game changer!', stars: 5, color: '#ef4444' },
    { name: 'Anita Magar', role: 'BSc Student', avatar: 'AM', review: 'I recommended NoteNest to all my friends. It works perfectly on my phone browser too which is super convenient for studying!', stars: 5, color: '#a78bfa' },
  ]

  const prev = () => setCurrent(current === 0 ? testimonials.length - 1 : current - 1)
  const next = () => setCurrent(current === testimonials.length - 1 ? 0 : current + 1)

  return (
    <section id="testimonials" style={{
      padding: '100px 80px',
      background: '#13131f',
      textAlign: 'center'
    }}>

      
      {/* Title with Letter Stagger Animation */}
      <AnimatedHeading 
        text="What Students Say" 
        style={{
          fontSize: '40px', 
          fontWeight: '800',
          marginBottom: '12px', 
          color: '#ffffff',
          letterSpacing: '-1px',
          justifyContent: 'center'
        }} 
      />

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{ color: '#6b7280', marginBottom: '60px', fontSize: '16px' }}>
        Loved by students across Nepal
      </motion.p>

      {/* Card Stack */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '40px'
      }}>

        {/* Up Button */}
        <button
          onClick={prev}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(124,111,247,0.2)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
          style={{
            width: '48px', height: '48px',
            borderRadius: '50%',
            background: 'transparent',
            border: '1px solid #1e1e3a',
            color: '#ffffff',
            fontSize: '18px',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s',
            flexShrink: 0
          }}>
          ↑
        </button>

        {/* Stacked Cards */}
        <div style={{ position: 'relative', width: '620px', height: '320px' }}>

          {/* Back cards for depth effect */}
          <div style={{
            position: 'absolute',
            top: '16px', left: '16px', right: '16px',
            height: '100%',
            background: 'rgba(124,111,247,0.05)',
            borderRadius: '20px',
            border: '1px solid #1e1e3a',
          }} />
          <div style={{
            position: 'absolute',
            top: '8px', left: '8px', right: '8px',
            height: '100%',
            background: 'rgba(124,111,247,0.08)',
            borderRadius: '20px',
            border: '1px solid #1e1e3a',
          }} />

          {/* Main Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              style={{
                position: 'absolute',
                top: 0, left: 0, right: 0,
                background: '#1a1a2e',
                borderRadius: '20px',
                padding: '40px 48px',
                border: '1px solid rgba(124,111,247,0.3)',
                boxShadow: '0 0 40px rgba(124,111,247,0.1)',
                textAlign: 'left',
                height: '100%',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>

              {/* Stars */}
              <div>
                <div style={{ marginBottom: '20px', fontSize: '16px' }}>
                  {'⭐'.repeat(testimonials[current].stars)}
                </div>

                {/* Review */}
                <p style={{
                  color: '#ffffff',
                  fontSize: '17px',
                  lineHeight: '1.8',
                  fontStyle: 'italic',
                  margin: 0
                }}>
                  " {testimonials[current].review} "
                </p>
              </div>

              {/* User */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '28px' }}>
                <div style={{
                  width: '48px', height: '48px',
                  borderRadius: '12px',
                  background: `linear-gradient(135deg, ${testimonials[current].color}, #a78bfa)`,
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px', fontWeight: '700',
                  color: 'white', flexShrink: 0
                }}>
                  {testimonials[current].avatar}
                </div>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: '700', color: '#ffffff' }}>
                    {testimonials[current].name}
                  </div>
                  <div style={{ fontSize: '13px', color: '#6b7280' }}>
                    {testimonials[current].role}
                  </div>
                </div>

                {/* Counter */}
                <div style={{
                  marginLeft: 'auto',
                  fontSize: '13px',
                  color: '#3a3a5a'
                }}>
                  {current + 1} / {testimonials.length}
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

        {/* Down Button */}
        <button
          onClick={next}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(124,111,247,0.2)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
          style={{
            width: '48px', height: '48px',
            borderRadius: '50%',
            background: 'transparent',
            border: '1px solid #1e1e3a',
            color: '#ffffff',
            fontSize: '18px',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.2s',
            flexShrink: 0
          }}>
          ↓
        </button>

      </div>

      {/* Dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '32px' }}>
        {testimonials.map((_, i) => (
          <div
            key={i}
            onClick={() => setCurrent(i)}
            style={{
              width: i === current ? '24px' : '8px',
              height: '8px',
              borderRadius: '4px',
              background: i === current ? '#7c6ff7' : '#1e1e3a',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          />
        ))}
      </div>

    </section>
  )
}

export default Testimonials