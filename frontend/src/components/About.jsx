import React from 'react'
import { motion } from 'framer-motion'

function About() {
  return (
    <section id="about" style={{
      padding: '120px 80px',
      background: '#0f0f1a',
      maxWidth: '1000px',
      margin: '0 auto'
    }}>

      {/* Mission Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8 }}
        style={{ marginBottom: '100px' }}
      >
        <h2 style={{
          fontSize: '48px',
          fontWeight: '700',
          marginBottom: '24px',
          color: '#ffffff',
          letterSpacing: '-1.5px',
          lineHeight: '1.2'
        }}>
          We believe note-taking should be{' '}
          <span style={{
            background: 'linear-gradient(135deg, #7c6ff7, #a78bfa)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            simple
          </span>
        </h2>

        <p style={{
          color: '#9ca3af',
          fontSize: '18px',
          lineHeight: '1.8',
          maxWidth: '700px',
          marginBottom: '32px'
        }}>
          NoteNest was built because existing note apps are either too complex or too expensive. 
          We wanted something that just works—no learning curve, no subscriptions, no clutter.
        </p>

        <p style={{
          color: '#6b7280',
          fontSize: '16px',
          lineHeight: '1.7',
          maxWidth: '700px'
        }}>
          As students ourselves, we understand the pain of scattered notes, lost documents, 
          and complicated interfaces. NoteNest is our answer to that problem.
        </p>
      </motion.div>

      {/* Values */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{ marginBottom: '100px' }}
      >
        <h3 style={{
          fontSize: '14px',
          fontWeight: '600',
          color: '#7c6ff7',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          marginBottom: '32px'
        }}>
          Our Principles
        </h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '40px'
        }}>
          {[
            { title: 'Simplicity First', desc: 'No complex features you will never use. Just the essentials.' },
            { title: 'Always Free', desc: 'Students should not have to pay to organize their notes.' },
            { title: 'Privacy Matters', desc: 'Your notes belong to you. We do not sell your data.' }
          ].map((value, i) => (
            <div key={i}>
              <h4 style={{
                color: '#ffffff',
                fontSize: '18px',
                fontWeight: '600',
                marginBottom: '12px'
              }}>
                {value.title}
              </h4>
              <p style={{
                color: '#6b7280',
                fontSize: '15px',
                lineHeight: '1.7'
              }}>
                {value.desc}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Team Section - Minimal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <h3 style={{
          fontSize: '14px',
          fontWeight: '600',
          color: '#7c6ff7',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          marginBottom: '32px'
        }}>
          The Team
        </h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '32px'
        }}>
          {[
            { name: 'Sudip Neupane', role: 'Backend & Lead' },
            { name: 'Umesh Budha', role: 'Design & Frontend' },
            { name: 'Nabi Akhtar Khan', role: 'QA & Documentation' }
          ].map((member, i) => (
            <div
              key={i}
              style={{
                padding: '24px',
                background: '#13131f',
                borderRadius: '8px',
                border: '1px solid #1e1e3a'
              }}
            >
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #7c6ff7, #a78bfa)',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: '700',
                fontSize: '18px'
              }}>
                {member.name.charAt(0)}
              </div>
              <h4 style={{
                color: '#ffffff',
                fontSize: '16px',
                fontWeight: '600',
                marginBottom: '4px'
              }}>
                {member.name}
              </h4>
              <p style={{
                color: '#6b7280',
                fontSize: '13px'
              }}>
                {member.role}
              </p>
            </div>
          ))}
        </div>

        <p style={{
          color: '#4b5563',
          fontSize: '14px',
          marginTop: '32px',
          fontStyle: 'italic'
        }}>
          Kathmandu Institute of Technology • Major Project 2026
        </p>
      </motion.div>

    </section>
  )
}

export default About