import React from 'react'

function About() {
  const team = [
    { name: 'Sudip Neupane', role: 'Backend Developer & Team Lead', icon: '👨‍💻', desc: 'Handles all the backend logic, database and server side of NoteNest.' },
    { name: 'Umesh Budha', role: 'UI/UX Designer & Frontend', icon: '🎨', desc: 'Designs the interface and builds the frontend using React.js and Figma.' },
    { name: 'Nabi Akhtar Khan', role: 'QA & Documentation', icon: '📄', desc: 'Tests the app, finds bugs and handles all project documentation.' },
  ]

  return (
    <section id="about" style={{
      padding: '100px 80px',
      background: '#13131f',
      textAlign: 'center'
    }}>

     

      <h2 style={{
        fontSize: '40px',
        fontWeight: '800',
        marginBottom: '12px',
        color: '#ffffff',
        letterSpacing: '-1px'
      }}>
        Built by <span style={{
          background: 'linear-gradient(135deg, #7c6ff7, #a78bfa)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>Students</span>
      </h2>

      <p style={{
        color: '#6b7280',
        maxWidth: '500px',
        margin: '0 auto 60px',
        lineHeight: '1.8',
        fontSize: '16px'
      }}>
        We are three students from Kathmandu Institute of Technology
        building NoteNest as our major project.
      </p>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '24px',
        flexWrap: 'wrap'
      }}>
        {team.map((m, i) => (
          <div
            key={i}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(124,111,247,0.5)'
              e.currentTarget.style.transform = 'translateY(-6px)'
              e.currentTarget.style.boxShadow = '0 0 30px rgba(124,111,247,0.15)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = '#1e1e3a'
              e.currentTarget.style.transform = 'translateY(0px)'
              e.currentTarget.style.boxShadow = 'none'
            }}
            style={{
              background: '#0f0f1a',
              borderRadius: '16px',
              padding: '36px 24px',
              width: '240px',
              border: '1px solid #1e1e3a',
              transition: 'all 0.3s ease'
            }}>
            <div style={{ fontSize: '52px', marginBottom: '16px' }}>{m.icon}</div>
            <h3 style={{
              marginBottom: '6px',
              color: '#ffffff',
              fontSize: '17px',
              fontWeight: '700'
            }}>{m.name}</h3>
            <p style={{
              color: '#7c6ff7',
              fontSize: '12px',
              marginBottom: '12px',
              fontWeight: '600'
            }}>{m.role}</p>
            <p style={{
              color: '#6b7280',
              fontSize: '13px',
              lineHeight: '1.6'
            }}>{m.desc}</p>
          </div>
        ))}
      </div>

    </section>
  )
}

export default About