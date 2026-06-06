import { useState } from 'react'

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = () => {
    if (form.name && form.email && form.message) {
      setSent(true)
    }
  }

  return (
    <section id="contact" style={{
      padding: '100px 80px',
      background: '#0f0f1a',
      textAlign: 'center'
    }}>


      <h2 style={{
        fontSize: '40px',
        fontWeight: '800',
        marginBottom: '12px',
        color: '#ffffff',
        letterSpacing: '-1px'
      }}>
        Get in <span style={{
          background: 'linear-gradient(135deg, #7c6ff7, #a78bfa)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>Touch</span>
      </h2>

      <p style={{
        color: '#6b7280',
        marginBottom: '48px',
        fontSize: '16px'
      }}>
        Have any questions? We'd love to hear from you!
      </p>

      {sent ? (
        <div style={{
          background: 'rgba(124,111,247,0.15)',
          border: '1px solid rgba(124,111,247,0.4)',
          borderRadius: '16px',
          padding: '40px',
          maxWidth: '400px',
          margin: '0 auto'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎉</div>
          <h3 style={{ color: '#ffffff', marginBottom: '8px' }}>Message Sent!</h3>
          <p style={{ color: '#6b7280' }}>We'll get back to you soon.</p>
        </div>
      ) : (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          maxWidth: '440px',
          margin: '0 auto',
          background: '#13131f',
          padding: '40px',
          borderRadius: '16px',
          border: '1px solid #1e1e3a'
        }}>
          {['name', 'email'].map((field) => (
            <input
              key={field}
              placeholder={`Your ${field.charAt(0).toUpperCase() + field.slice(1)}`}
              value={form[field]}
              onChange={e => setForm({ ...form, [field]: e.target.value })}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid #1e1e3a',
                background: '#0f0f1a',
                color: 'white',
                fontSize: '15px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
              onFocus={e => e.target.style.borderColor = '#7c6ff7'}
              onBlur={e => e.target.style.borderColor = '#1e1e3a'}
            />
          ))}

          <textarea
            placeholder="Your Message"
            rows={4}
            value={form.message}
            onChange={e => setForm({ ...form, message: e.target.value })}
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: '8px',
              border: '1px solid #1e1e3a',
              background: '#0f0f1a',
              color: 'white',
              fontSize: '15px',
              resize: 'none',
              outline: 'none',
              boxSizing: 'border-box'
            }}
            onFocus={e => e.target.style.borderColor = '#7c6ff7'}
            onBlur={e => e.target.style.borderColor = '#1e1e3a'}
          />

          <button
            onClick={handleSubmit}
            onMouseEnter={e => e.target.style.background = '#6355e0'}
            onMouseLeave={e => e.target.style.background = '#7c6ff7'}
            style={{
              width: '100%',
              padding: '13px',
              background: '#7c6ff7',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '15px',
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: 'background 0.2s'
            }}>
            Send Message →
          </button>
        </div>
      )}

    </section>
  )
}

export default Contact