import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer style={{ padding: '80px 80px 40px', background: '#0a0a14', borderTop: '1px solid #1e1e3a' }}>
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '40px', marginBottom: '60px', maxWidth: '1200px', margin: '0 auto 60px' }}>
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
            <a
              href="https://github.com/sudip5-ml/notes-app"
              target="_blank"
              rel="noopener noreferrer"
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
                fontSize: '16px',
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
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>
        </div>


        {/* Product */}
        <div>
          <h4 style={{ color: '#ffffff', marginBottom: '20px', fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Product
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <a href="#features" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '14px' }}
              onMouseEnter={e => e.target.style.color='#7c6ff7'}
              onMouseLeave={e => e.target.style.color='#6b7280'}>
              Features
            </a>
            <a href="#pricing" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '14px' }}
              onMouseEnter={e => e.target.style.color='#7c6ff7'}
              onMouseLeave={e => e.target.style.color='#6b7280'}>
              Pricing
            </a>
            <Link to="/security" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '14px' }}
              onMouseEnter={e => e.target.style.color='#7c6ff7'}
              onMouseLeave={e => e.target.style.color='#6b7280'}>
              Security
            </Link>
            <Link to="/roadmap" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '14px' }}
              onMouseEnter={e => e.target.style.color='#7c6ff7'}
              onMouseLeave={e => e.target.style.color='#6b7280'}>
              Roadmap
            </Link>
          </div>
        </div>

        {/* Company */}
        <div>
          <h4 style={{ color: '#ffffff', marginBottom: '20px', fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Company
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

            {/* ✅ About with scroll fix */}
            <span
              onClick={() => {
                window.location.href = '/#about'
                setTimeout(() => {
                  document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
                }, 100)
              }}
              style={{ 
                color: '#6b7280', 
                textDecoration: 'none', 
                fontSize: '14px', 
                cursor: 'pointer' 
              }}
              onMouseEnter={e => e.target.style.color='#7c6ff7'}
              onMouseLeave={e => e.target.style.color='#6b7280'}
            >
              About
            </span>

            <Link to="/blog" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '14px' }}
              onMouseEnter={e => e.target.style.color='#7c6ff7'}
              onMouseLeave={e => e.target.style.color='#6b7280'}>
              Blog
            </Link>
            <Link to="/careers" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '14px' }}
              onMouseEnter={e => e.target.style.color='#7c6ff7'}
              onMouseLeave={e => e.target.style.color='#6b7280'}>
              Careers
            </Link>
            <Link to="/contact" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '14px' }}
              onMouseEnter={e => e.target.style.color='#7c6ff7'}
              onMouseLeave={e => e.target.style.color='#6b7280'}>
              Contact
            </Link>
          </div>
        </div>

        {/* Resources */}
        <div>
          <h4 style={{ color: '#ffffff', marginBottom: '20px', fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Resources
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Link to="/help" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '14px' }}
              onMouseEnter={e => e.target.style.color='#7c6ff7'}
              onMouseLeave={e => e.target.style.color='#6b7280'}>
              Help Center
            </Link>
            <Link to="/docs" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '14px' }}
              onMouseEnter={e => e.target.style.color='#7c6ff7'}
              onMouseLeave={e => e.target.style.color='#6b7280'}>
              Documentation
            </Link>
            <a href="#faq" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '14px' }}
              onMouseEnter={e => e.target.style.color='#7c6ff7'}
              onMouseLeave={e => e.target.style.color='#6b7280'}>
              FAQ
            </a>
            <Link to="/status" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '14px' }}
              onMouseEnter={e => e.target.style.color='#7c6ff7'}
              onMouseLeave={e => e.target.style.color='#6b7280'}>
              Status
            </Link>
          </div>
        </div>

        {/* Legal */}
        <div>
          <h4 style={{ color: '#ffffff', marginBottom: '20px', fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Legal
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Link to="/privacy" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '14px' }}
              onMouseEnter={e => e.target.style.color='#7c6ff7'}
              onMouseLeave={e => e.target.style.color='#6b7280'}>
              Privacy Policy
            </Link>
            <Link to="/terms" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '14px' }}
              onMouseEnter={e => e.target.style.color='#7c6ff7'}
              onMouseLeave={e => e.target.style.color='#6b7280'}>
              Terms of Service
            </Link>
            <Link to="/cookies" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '14px' }}
              onMouseEnter={e => e.target.style.color='#7c6ff7'}
              onMouseLeave={e => e.target.style.color='#6b7280'}>
              Cookie Policy
            </Link>
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div style={{ borderTop: '1px solid #1e1e3a', paddingTop: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <p style={{ color: '#4b5563', fontSize: '13px', margin: 0 }}>
          © 2026 NoteNest. Built by students at Kathmandu Institute of Technology.
        </p>
        <p style={{ color: '#4b5563', fontSize: '13px', margin: 0 }}>
          Made with purpose in Nepal 🇳🇵
        </p>
      </div>

    </footer>
  )
}

export default Footer