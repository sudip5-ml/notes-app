import { motion } from 'framer-motion'

function Pricing() {
  return (
    <section id="pricing" style={{
      padding: '100px 80px',
      background: '#0f0f1a',
      textAlign: 'center'
    }}>

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          fontSize: '40px',
          fontWeight: '800',
          marginBottom: '12px',
          color: '#ffffff',
          letterSpacing: '-1px'
        }}>
        Simple <span style={{
          background: 'linear-gradient(135deg, #7c6ff7, #a78bfa)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>Pricing</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        style={{
          color: '#6b7280',
          marginBottom: '60px',
          fontSize: '16px'
        }}>
        No hidden fees. No subscriptions. Just free.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        style={{
          maxWidth: '400px',
          margin: '0 auto',
          background: '#13131f',
          borderRadius: '20px',
          padding: '48px',
          border: '2px solid rgba(124,111,247,0.3)',
          boxShadow: '0 0 60px rgba(124,111,247,0.2)'
        }}>
        <div style={{
          fontSize: '64px',
          fontWeight: '900',
          color: '#ffffff',
          marginBottom: '8px',
          letterSpacing: '-2px'
        }}>
          Free
        </div>
        <p style={{
          color: '#7c6ff7',
          fontSize: '16px',
          fontWeight: '600',
          marginBottom: '32px'
        }}>
          Forever
        </p>

        <div style={{
          textAlign: 'left',
          marginBottom: '32px'
        }}>
          {[
            'Unlimited notes',
            'Search & organize',
            'Trash & restore',
            'Favorites',
            'Secure login',
            'Works on all devices'
          ].map((feature, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '12px',
                color: '#9ca3af',
                fontSize: '15px'
              }}
            >
              <span style={{
                color: '#22c55e',
                fontSize: '18px'
              }}>✓</span>
              {feature}
            </div>
          ))}
        </div>

        <button
          onClick={() => window.location.href = '/signup'}
          onMouseEnter={e => e.target.style.background = '#6355e0'}
          onMouseLeave={e => e.target.style.background = '#7c6ff7'}
          style={{
            width: '100%',
            padding: '16px',
            background: '#7c6ff7',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'background 0.2s'
          }}>
          Get Started Free
        </button>
      </motion.div>

    </section>
  )
}

export default Pricing
