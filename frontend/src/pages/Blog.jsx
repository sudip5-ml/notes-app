import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Footer from '../components/Footer'

function Blog() {
  const navigate = useNavigate()

  const posts = [
    {
      title: 'Introducing NoteNest — The Simplest Notes App for Students',
      date: 'June 15, 2026',
      category: 'Announcement',
      excerpt: 'We built NoteNest because we were tired of complex, expensive note-taking apps. Here\'s our story and what makes NoteNest different.',
      readTime: '4 min read',
      color: '#7c6ff7',
    },
    {
      title: '5 Tips for Better Note-Taking in College',
      date: 'June 10, 2026',
      category: 'Tips',
      excerpt: 'Effective note-taking is a skill that can dramatically improve your academic performance. Here are five practical strategies every student should know.',
      readTime: '3 min read',
      color: '#3b82f6',
    },
    {
      title: 'How We Built NoteNest with React & Node.js',
      date: 'June 5, 2026',
      category: 'Engineering',
      excerpt: 'A deep dive into the tech stack behind NoteNest — from our React frontend to our Express backend and MongoDB database.',
      readTime: '6 min read',
      color: '#22c55e',
    },
    {
      title: 'Why We Made NoteNest Free Forever',
      date: 'May 28, 2026',
      category: 'Philosophy',
      excerpt: 'Students shouldn\'t have to pay to organize their thoughts. Here\'s why we committed to keeping NoteNest free — no strings attached.',
      readTime: '3 min read',
      color: '#f59e0b',
    },
  ]

  return (
    <div style={{ background: '#0f0f1a', minHeight: '100vh' }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 40px', background: 'rgba(15,15,26,0.95)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(124,111,247,0.3)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
          <span style={{ background: 'linear-gradient(135deg, #7c6ff7, #a78bfa)', borderRadius: '10px', padding: '6px 10px', fontSize: '16px', fontWeight: '900', color: 'white', boxShadow: '0 0 15px rgba(124,111,247,0.6)' }}>NN</span>
          <span style={{ fontWeight: '800', fontSize: '18px', color: '#ffffff' }}>NoteNest</span>
        </div>
        <button onClick={() => navigate('/')} style={{ padding: '8px 16px', background: 'transparent', color: '#7c6ff7', border: '1px solid #2a2a4a', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '14px' }}>← Back to Home</button>
      </nav>

      <section style={{ padding: '100px 80px', maxWidth: '800px', margin: '0 auto' }}>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ fontSize: '48px', fontWeight: '800', color: '#ffffff', marginBottom: '16px', letterSpacing: '-1.5px' }}
        >
          NoteNest{' '}
          <span style={{ background: 'linear-gradient(135deg, #7c6ff7, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Blog</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ color: '#9ca3af', fontSize: '18px', lineHeight: '1.8', marginBottom: '60px' }}
        >
          Updates, tips, and stories from the NoteNest team.
        </motion.p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {posts.map((post, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
              style={{
                background: '#13131f',
                borderRadius: '16px',
                padding: '32px',
                border: '1px solid #1e1e3a',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(124,111,247,0.4)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = '#1e1e3a'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                <span style={{ background: `${post.color}20`, color: post.color, padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}>{post.category}</span>
                <span style={{ color: '#4b5563', fontSize: '13px' }}>{post.date}</span>
                <span style={{ color: '#4b5563', fontSize: '13px' }}>·</span>
                <span style={{ color: '#4b5563', fontSize: '13px' }}>{post.readTime}</span>
              </div>
              <h2 style={{ color: '#ffffff', fontSize: '22px', fontWeight: '700', marginBottom: '10px', lineHeight: '1.3' }}>{post.title}</h2>
              <p style={{ color: '#6b7280', fontSize: '15px', lineHeight: '1.7', margin: 0 }}>{post.excerpt}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Blog
