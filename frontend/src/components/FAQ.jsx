import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    { q: 'Is NoteNest free?', a: 'Yes! NoteNest is completely free for all students. No hidden charges or subscriptions.' },
    { q: 'Do I need to install anything?', a: 'No installation needed. Just open it in any browser and start using it instantly!' },
    { q: 'Is my data safe?', a: 'Yes! Each user has their own private account with secure login. Nobody else can see your notes.' },
    { q: 'Can I use it on my phone?', a: 'Yes! NoteNest works on any device with a browser — phone, tablet or laptop.' },
    { q: 'Can I search my notes?', a: 'Yes! You can search any note instantly using the search bar on the dashboard.' },
    { q: 'What if I delete a note by mistake?', a: 'No worries! Deleted notes go to Trash first. You can restore them anytime before permanently deleting.' },
  ]

  return (
    <section id="faq" style={{
      padding: '100px 80px',
      background: '#0f0f1a',
      textAlign: 'center'
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
        Frequently Asked{' '}
        <span style={{
          background: 'linear-gradient(135deg, #7c6ff7, #a78bfa)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>Questions</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        style={{ color: '#6b7280', marginBottom: '60px', fontSize: '16px' }}>
        Everything you need to know about NoteNest
      </motion.p>

      {/* FAQ Items */}
      <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'left' }}>

        {/* Top border */}
        <div style={{ borderTop: '1px solid #1e1e3a' }} />

        {faqs.map((faq, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.4, delay: i * 0.06, ease: "easeOut" }}>

            {/* Question Row */}
            <div
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              style={{
                padding: '22px 4px',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '20px'
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.8'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
              <span style={{
                fontSize: '16px',
                fontWeight: '600',
                color: openIndex === i ? '#7c6ff7' : '#ffffff',
                transition: 'color 0.2s',
                lineHeight: '1.4'
              }}>
                {faq.q}
              </span>
              <span style={{
                color: '#7c6ff7',
                fontSize: '22px',
                fontWeight: '300',
                flexShrink: 0,
                transform: openIndex === i ? 'rotate(45deg)' : 'rotate(0)',
                transition: 'transform 0.3s ease',
                display: 'inline-block'
              }}>+</span>
            </div>

            {/* Answer */}
            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ overflow: 'hidden' }}>
                  <p style={{
                    color: '#6b7280',
                    fontSize: '15px',
                    lineHeight: '1.9',
                    margin: '0 0 20px 0',
                    paddingRight: '40px'
                  }}>
                    {faq.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Divider */}
            <div style={{ borderTop: '1px solid #1e1e3a' }} />

          </motion.div>
        ))}
      </div>

    </section>
  )
}

export default FAQ