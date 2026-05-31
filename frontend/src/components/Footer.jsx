import React from 'react'

function Footer() {
  return (
    <footer style={{ padding: '80px 80px 40px', background: '#0a0a14', borderTop: '1px solid #1e1e3a' }}>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '40px', marginBottom: '60px', maxWidth: '1200px', margin: '0 auto 60px' }}>

        {/* Brand */}
        <div style={{ gridColumn: 'span 2' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <span style={{
              background: 'linear-gradient(135deg, #7c6ff7, #a78bfa)',
              borderRadius: '10px',
              padding: '6px 10px',
              fontSize: '16px',
              fontWeight: '900',
              color: 'white',
              boxShadow: '0 0 15px rgba(124,111,247,0.6)',
              border: '1px solid rgba(167,139,250,0.5)'
            }}>NN</span>
            <span style={{ fontSize: '20px', fontWeight: '800', color: '#ffffff' }}>NoteNest</span>
          </div>
          <p style={{ color: '#6b7280', fontSize: '14px', lineHeight: '1.7', marginBottom: '24px', maxWidth: '280px' }}>
            The simplest notes app for students. Free forever, no subscriptions, no clutter.
          </p>
          <div style={{ display: 'flex', gap: '12px' }}>
            {['𝕏', '𝐆', '𝐋'].map((icon, i) => (
              <a
                key={i}
                href="#"
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  background: '#13131f',
                  border: '1px solid #1e1e3a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#6b7280',
                  textDecoration: 'none',
                  fontSize: '14px',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#7c6ff7'
                  e.currentTarget.style.color = '#7c6ff7'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = '#1e1e3a'
                  e.currentTarget.style.color = '#6b7280'
                }}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Product */}
        <div>
          <h4 style={{ color: '#ffffff', marginBottom: '20px', fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Product
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <a href="#features" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color='#7c6ff7'} onMouseLeave={e => e.target.style.color='#6b7280'}>Features</a>
            <a href="#pricing" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color='#7c6ff7'} onMouseLeave={e => e.target.style.color='#6b7280'}>Pricing</a>
            <a href="#" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color='#7c6ff7'} onMouseLeave={e => e.target.style.color='#6b7280'}>Security</a>
            <a href="#" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color='#7c6ff7'} onMouseLeave={e => e.target.style.color='#6b7280'}>Roadmap</a>
          </div>
        </div>

        {/* Company */}
        <div>
          <h4 style={{ color: '#ffffff', marginBottom: '20px', fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Company
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <a href="#about" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color='#7c6ff7'} onMouseLeave={e => e.target.style.color='#6b7280'}>About</a>
            <a href="#" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color='#7c6ff7'} onMouseLeave={e => e.target.style.color='#6b7280'}>Blog</a>
            <a href="#" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color='#7c6ff7'} onMouseLeave={e => e.target.style.color='#6b7280'}>Careers</a>
            <a href="#" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color='#7c6ff7'} onMouseLeave={e => e.target.style.color='#6b7280'}>Contact</a>
          </div>
        </div>

        {/* Resources */}
        <div>
          <h4 style={{ color: '#ffffff', marginBottom: '20px', fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Resources
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <a href="#" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color='#7c6ff7'} onMouseLeave={e => e.target.style.color='#6b7280'}>Help Center</a>
            <a href="#" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color='#7c6ff7'} onMouseLeave={e => e.target.style.color='#6b7280'}>Documentation</a>
            <a href="#faq" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color='#7c6ff7'} onMouseLeave={e => e.target.style.color='#6b7280'}>FAQ</a>
            <a href="#" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color='#7c6ff7'} onMouseLeave={e => e.target.style.color='#6b7280'}>Status</a>
          </div>
        </div>

        {/* Legal */}
        <div>
          <h4 style={{ color: '#ffffff', marginBottom: '20px', fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Legal
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <a href="#" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color='#7c6ff7'} onMouseLeave={e => e.target.style.color='#6b7280'}>Privacy Policy</a>
            <a href="#" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color='#7c6ff7'} onMouseLeave={e => e.target.style.color='#6b7280'}>Terms of Service</a>
            <a href="#" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '14px', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color='#7c6ff7'} onMouseLeave={e => e.target.style.color='#6b7280'}>Cookie Policy</a>
          </div>
        </div>

      </div>

      {/* Newsletter */}
      <div style={{
        maxWidth: '600px',
        margin: '0 auto 60px',
        padding: '32px',
        background: 'linear-gradient(135deg, rgba(124,111,247,0.1), rgba(167,139,250,0.05))',
        borderRadius: '12px',
        border: '1px solid rgba(124,111,247,0.2)',
        textAlign: 'center'
      }}>
        <h3 style={{ color: '#ffffff', fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
          Stay updated
        </h3>
        <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '20px' }}>
          Get the latest updates and tips for better note-taking.
        </p>
        <div style={{ display: 'flex', gap: '12px', maxWidth: '400px', margin: '0 auto' }}>
          <input
            type="email"
            placeholder="Enter your email"
            style={{
              flex: 1,
              padding: '12px 16px',
              borderRadius: '8px',
              border: '1px solid #1e1e3a',
              background: '#0f0f1a',
              color: 'white',
              fontSize: '14px',
              outline: 'none'
            }}
          />
          <button
            style={{
              padding: '12px 24px',
              background: '#7c6ff7',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
            onMouseEnter={e => e.target.style.background = '#6355e0'}
            onMouseLeave={e => e.target.style.background = '#7c6ff7'}
          >
            Subscribe
          </button>
        </div>
      </div>

      {/* Bottom */}
      <div style={{ borderTop: '1px solid #1e1e3a', paddingTop: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <p style={{ color: '#4b5563', fontSize: '13px', margin: 0 }}>
          © 2026 NoteNest. Built by students at Kathmandu Institute of Technology.
        </p>
        <p style={{ color: '#4b5563', fontSize: '13px', margin: 0 }}>
          Made with purpose in Nepal
        </p>
      </div>

    </footer>
  )
}

export default Footer