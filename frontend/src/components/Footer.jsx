import React from 'react'

const logoStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '10px'
}

const nnStyle = {
  background: 'linear-gradient(135deg, #7c6ff7, #a78bfa)',
  borderRadius: '10px',
  padding: '6px 10px',
  fontSize: '16px',
  fontWeight: '900',
  color: 'white',
  letterSpacing: '-0.5px',
  boxShadow: '0 0 15px rgba(124,111,247,0.6), 0 0 30px rgba(124,111,247,0.3)',
  border: '1px solid rgba(167,139,250,0.5)'
}

function Footer() {
  return (
    <footer style={{ padding: '48px 80px', background: '#0a0a14', borderTop: '1px solid #1e1e3a' }}>

      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '40px', marginBottom: '40px' }}>

        {/* Brand */}
        <div style={{ maxWidth: '260px' }}>
          <div style={{ ...logoStyle, marginBottom: '12px', fontSize: '20px', fontWeight: '800', color: '#7c6ff7' }}>
            <span style={nnStyle}>NN</span>
            NoteNest
          </div>
          <p style={{ color: '#6b7280', fontSize: '14px', lineHeight: '1.8' }}>
            A simple and secure notes app built by students for students.
          </p>
        </div>

        {/* Links */}
        <div>
          <h4 style={{ color: '#ffffff', marginBottom: '16px', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Quick Links
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <a href="#features" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '14px' }} onMouseEnter={e => e.target.style.color='#7c6ff7'} onMouseLeave={e => e.target.style.color='#6b7280'}>Features</a>
            <a href="#about" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '14px' }} onMouseEnter={e => e.target.style.color='#7c6ff7'} onMouseLeave={e => e.target.style.color='#6b7280'}>About</a>
            <a href="#contact" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '14px' }} onMouseEnter={e => e.target.style.color='#7c6ff7'} onMouseLeave={e => e.target.style.color='#6b7280'}>Contact</a>
          </div>
        </div>

        {/* Team */}
        <div>
          <h4 style={{ color: '#ffffff', marginBottom: '16px', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>Team</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>Sudip Neupane</p>
            <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>Umesh Budha</p>
            <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>Nabi Akhtar Khan</p>
          </div>
        </div>

        {/* College */}
        <div>
          <h4 style={{ color: '#ffffff', marginBottom: '16px', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>College</h4>
          <p style={{ color: '#6b7280', fontSize: '14px', lineHeight: '1.8', margin: 0 }}>
            Kathmandu Institute<br/>of Technology<br/>Tokha-Milantole
          </p>
        </div>

      </div>

      {/* Bottom */}
      <div style={{ borderTop: '1px solid #1e1e3a', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
        <p style={{ color: '#6b7280', fontSize: '13px', margin: 0 }}>© 2083 NoteNest. Built with ❤️ by Team KIT.</p>
        <p style={{ color: '#6b7280', fontSize: '13px', margin: 0 }}>Kathmandu Institute of Technology</p>
      </div>

    </footer>
  )
}

export default Footer