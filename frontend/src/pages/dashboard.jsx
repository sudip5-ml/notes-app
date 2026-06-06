import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const formatDate = (d = new Date()) =>
  d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })

const seedNotes = () => [
  { id: 1, title: 'My First Note', content: 'This is my first note on NoteNest! Welcome to your personal notes space.', date: formatDate(), favorite: false },
  { id: 2, title: 'Study Notes', content: 'React is a frontend library built by Facebook. It uses components to build UIs.', date: formatDate(), favorite: false },
  { id: 3, title: 'Project Ideas', content: 'Build a notes app using React and Node.js. Add login, search and delete features.', date: formatDate(), favorite: false },
]

const load = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function Dashboard() {
  const navigate = useNavigate()
  const userName = localStorage.getItem('nn_user') || 'Sudip Neupane'
  const userInitial = userName.trim().charAt(0).toUpperCase() || 'S'

  const [notes, setNotes] = useState(() => load('nn_notes', seedNotes()))
  const [trash, setTrash] = useState(() => load('nn_trash', []))

  // Persist notes and trash so they survive a page refresh
  useEffect(() => {
    localStorage.setItem('nn_notes', JSON.stringify(notes))
  }, [notes])
  useEffect(() => {
    localStorage.setItem('nn_trash', JSON.stringify(trash))
  }, [trash])
  const [selected, setSelected] = useState(null)
  const [search, setSearch] = useState('')
  const [activeNav, setActiveNav] = useState('All Notes')
  const [showNewNote, setShowNewNote] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newContent, setNewContent] = useState('')
  const [editMode, setEditMode] = useState(false)
  const [editTitle, setEditTitle] = useState('')
  const [editContent, setEditContent] = useState('')

  // ── Filtered notes based on active nav and search ──
  const getVisibleNotes = () => {
    if (activeNav === 'Favorites') return notes.filter(n => n.favorite)
    if (activeNav === 'Trash') return trash
    return notes.filter(n =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.content.toLowerCase().includes(search.toLowerCase())
    )
  }

  // ── Add note ──
  const addNote = () => {
    if (newTitle.trim()) {
      const note = {
        id: Date.now(),
        title: newTitle,
        content: newContent,
        date: formatDate(),
        favorite: false
      }
      setNotes([note, ...notes])
      setNewTitle('')
      setNewContent('')
      setShowNewNote(false)
    }
  }

  // ── Delete note → move to trash ──
  const deleteNote = (id) => {
    const note = notes.find(n => n.id === id)
    setTrash([note, ...trash])
    setNotes(notes.filter(n => n.id !== id))
    if (selected?.id === id) setSelected(null)
  }

  // ── Restore from trash ──
  const restoreNote = (id) => {
    const note = trash.find(n => n.id === id)
    setNotes([note, ...notes])
    setTrash(trash.filter(n => n.id !== id))
    if (selected?.id === id) setSelected(null)
  }

  // ── Permanently delete from trash ──
  const permanentDelete = (id) => {
    setTrash(trash.filter(n => n.id !== id))
    if (selected?.id === id) setSelected(null)
  }

  // ── Toggle favorite ──
  const toggleFavorite = (id) => {
    setNotes(notes.map(n =>
      n.id === id ? { ...n, favorite: !n.favorite } : n
    ))
    if (selected?.id === id) {
      setSelected({ ...selected, favorite: !selected.favorite })
    }
  }

  // ── Save edit ──
  const saveEdit = () => {
    setNotes(notes.map(n =>
      n.id === selected.id ? { ...n, title: editTitle, content: editContent } : n
    ))
    setSelected({ ...selected, title: editTitle, content: editContent })
    setEditMode(false)
  }

  const visibleNotes = getVisibleNotes()

  return (
    <div style={{
      display: 'flex', height: '100vh',
      background: 'var(--bg)', color: '#ffffff',
      fontFamily: 'var(--font)', overflow: 'hidden'
    }}>

      {/* ── SIDEBAR ── */}
      <div style={{
        width: '240px', minWidth: '240px',
        background: '#13131f',
        borderRight: '1px solid #1e1e3a',
        display: 'flex', flexDirection: 'column',
        padding: '20px 12px'
      }}>

        {/* Logo */}
        <div style={{
          display: 'flex', alignItems: 'center',
          gap: '10px', marginBottom: '28px', paddingLeft: '8px'
        }}>
          <span style={{
            background: 'linear-gradient(135deg, #7c6ff7, #a78bfa)',
            borderRadius: '8px', padding: '4px 8px',
            fontSize: '14px', fontWeight: '900', color: 'white',
            boxShadow: '0 0 15px rgba(124,111,247,0.4)'
          }}>NN</span>
          <span style={{ fontWeight: '800', fontSize: '16px' }}>NoteNest</span>
        </div>

        {/* New Note Button */}
        <button
          onClick={() => { setShowNewNote(true); setActiveNav('All Notes'); setSelected(null) }}
          onMouseEnter={e => e.currentTarget.style.background = '#6355e0'}
          onMouseLeave={e => e.currentTarget.style.background = '#7c6ff7'}
          style={{
            width: '100%', padding: '10px',
            background: '#7c6ff7', color: 'white',
            border: 'none', borderRadius: '8px',
            cursor: 'pointer', fontWeight: '700',
            fontSize: '13px', marginBottom: '20px',
            transition: 'background 0.2s'
          }}>
          + New Note
        </button>

        {/* Nav Items */}
        {[
          { icon: '📝', label: 'All Notes', count: notes.length },
          { icon: '⭐', label: 'Favorites', count: notes.filter(n => n.favorite).length },
          { icon: '🗑️', label: 'Trash', count: trash.length },
        ].map((item, i) => (
          <div key={i}
            onClick={() => { setActiveNav(item.label); setSelected(null) }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(124,111,247,0.1)'}
            onMouseLeave={e => e.currentTarget.style.background = activeNav === item.label ? 'rgba(124,111,247,0.15)' : 'transparent'}
            style={{
              display: 'flex', alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 12px', borderRadius: '8px',
              cursor: 'pointer', marginBottom: '4px',
              background: activeNav === item.label ? 'rgba(124,111,247,0.15)' : 'transparent',
              color: activeNav === item.label ? '#7c6ff7' : '#6b7280',
              transition: 'all 0.2s'
            }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span>{item.icon}</span>
              <span style={{ fontSize: '14px', fontWeight: '500' }}>{item.label}</span>
            </div>
            {item.count > 0 && (
              <span style={{
                fontSize: '11px', background: 'rgba(124,111,247,0.2)',
                color: '#7c6ff7', borderRadius: '10px', padding: '2px 7px'
              }}>{item.count}</span>
            )}
          </div>
        ))}

        {/* Bottom User */}
        <div style={{
          marginTop: 'auto',
          borderTop: '1px solid #1e1e3a',
          paddingTop: '16px',
          display: 'flex', alignItems: 'center', gap: '10px'
        }}>
          <div style={{
            width: '34px', height: '34px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #7c6ff7, #a78bfa)',
            display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: '14px',
            fontWeight: 'bold', flexShrink: 0
          }}>{userInitial}</div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: '600' }}>{userName}</div>
            <div style={{ fontSize: '11px', color: '#6b7280', cursor: 'pointer' }}
              onClick={() => navigate('/')}>
              ← Back to Home
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* Top Bar */}
        <div style={{
          padding: '16px 28px',
          borderBottom: '1px solid #1e1e3a',
          display: 'flex', alignItems: 'center', gap: '16px'
        }}>
          {selected ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
              <button onClick={() => { setSelected(null); setEditMode(false) }} style={{
                background: 'transparent', border: 'none',
                color: '#7c6ff7', cursor: 'pointer',
                fontSize: '14px', fontWeight: '600'
              }}>← Back</button>
              <span style={{ color: '#3a3a5a', fontSize: '13px' }}>{activeNav} / {selected.title}</span>
            </div>
          ) : (
            <>
              <h2 style={{ fontSize: '18px', fontWeight: '700', margin: 0, minWidth: 'fit-content' }}>
                {activeNav}
              </h2>
              {activeNav !== 'Trash' && (
                <input
                  placeholder="🔍 Search notes..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  style={{
                    flex: 1, padding: '9px 16px', borderRadius: '8px',
                    border: '1px solid #1e1e3a', background: '#13131f',
                    color: 'white', fontSize: '14px', outline: 'none'
                  }}
                  onFocus={e => e.target.style.borderColor = '#7c6ff7'}
                  onBlur={e => e.target.style.borderColor = '#1e1e3a'}
                />
              )}
            </>
          )}
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '28px' }}>

          {/* New Note Form */}
          <AnimatePresence>
            {showNewNote && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                style={{
                  background: '#13131f', borderRadius: '12px',
                  padding: '20px', marginBottom: '24px',
                  border: '1px solid rgba(124,111,247,0.4)'
                }}>
                <input
                  placeholder="Note title..."
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  style={{
                    width: '100%', padding: '10px 0',
                    background: 'transparent', border: 'none',
                    borderBottom: '1px solid #1e1e3a',
                    color: 'white', fontSize: '18px',
                    fontWeight: '700', outline: 'none',
                    marginBottom: '12px', boxSizing: 'border-box'
                  }}
                />
                <textarea
                  placeholder="Write your note here..."
                  value={newContent}
                  onChange={e => setNewContent(e.target.value)}
                  rows={4}
                  style={{
                    width: '100%', padding: '10px 0',
                    background: 'transparent', border: 'none',
                    color: '#a0aec0', fontSize: '14px',
                    outline: 'none', resize: 'none',
                    lineHeight: '1.8', boxSizing: 'border-box'
                  }}
                />
                <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                  <button onClick={addNote} style={{
                    padding: '8px 20px', background: '#7c6ff7',
                    color: 'white', border: 'none', borderRadius: '6px',
                    cursor: 'pointer', fontWeight: '600', fontSize: '13px'
                  }}>Save Note</button>
                  <button onClick={() => setShowNewNote(false)} style={{
                    padding: '8px 20px', background: 'transparent',
                    color: '#6b7280', border: '1px solid #1e1e3a',
                    borderRadius: '6px', cursor: 'pointer', fontSize: '13px'
                  }}>Cancel</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Selected Note */}
          <AnimatePresence mode="wait">
            {selected ? (
              <motion.div
                key="note-view"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                style={{ maxWidth: '720px' }}>

                {editMode ? (
                  <>
                    <input
                      value={editTitle}
                      onChange={e => setEditTitle(e.target.value)}
                      style={{
                        width: '100%', fontSize: '36px', fontWeight: '800',
                        background: 'transparent', border: 'none',
                        borderBottom: '1px solid #1e1e3a', color: 'white',
                        outline: 'none', marginBottom: '20px',
                        boxSizing: 'border-box', paddingBottom: '8px'
                      }}
                    />
                    <textarea
                      value={editContent}
                      onChange={e => setEditContent(e.target.value)}
                      rows={12}
                      style={{
                        width: '100%', background: 'transparent',
                        border: '1px solid #1e1e3a', borderRadius: '8px',
                        color: '#a0aec0', fontSize: '16px', padding: '16px',
                        outline: 'none', resize: 'none', lineHeight: '1.9',
                        boxSizing: 'border-box'
                      }}
                    />
                    <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
                      <button onClick={saveEdit} style={{
                        padding: '8px 20px', background: '#7c6ff7',
                        color: 'white', border: 'none', borderRadius: '6px',
                        cursor: 'pointer', fontWeight: '600', fontSize: '13px'
                      }}>Save Changes</button>
                      <button onClick={() => setEditMode(false)} style={{
                        padding: '8px 20px', background: 'transparent',
                        color: '#6b7280', border: '1px solid #1e1e3a',
                        borderRadius: '6px', cursor: 'pointer', fontSize: '13px'
                      }}>Cancel</button>
                    </div>
                  </>
                ) : (
                  <>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <h1 style={{ fontSize: '36px', fontWeight: '800', lineHeight: '1.2', margin: 0 }}>
                        {selected.title}
                      </h1>
                      <span
                        onClick={() => toggleFavorite(selected.id)}
                        style={{ fontSize: '24px', cursor: 'pointer' }}
                        title={selected.favorite ? 'Remove from favorites' : 'Add to favorites'}>
                        {selected.favorite ? '⭐' : '☆'}
                      </span>
                    </div>
                    <p style={{ fontSize: '12px', color: '#3a3a5a', marginBottom: '32px' }}>
                      {selected.date}
                    </p>
                    <p style={{
                      fontSize: '16px', color: '#a0aec0',
                      lineHeight: '1.9', whiteSpace: 'pre-wrap'
                    }}>{selected.content}</p>

                    {activeNav !== 'Trash' && (
                      <div style={{ display: 'flex', gap: '10px', marginTop: '40px' }}>
                        <button
                          onClick={() => { setEditMode(true); setEditTitle(selected.title); setEditContent(selected.content) }}
                          style={{
                            padding: '8px 20px', background: 'transparent',
                            color: '#7c6ff7', border: '1px solid #7c6ff7',
                            borderRadius: '6px', cursor: 'pointer', fontSize: '13px'
                          }}>✏️ Edit</button>
                        <button
                          onClick={() => deleteNote(selected.id)}
                          style={{
                            padding: '8px 20px', background: 'transparent',
                            color: '#ef4444', border: '1px solid #ef4444',
                            borderRadius: '6px', cursor: 'pointer', fontSize: '13px'
                          }}>🗑️ Delete</button>
                      </div>
                    )}

                    {activeNav === 'Trash' && (
                      <div style={{ display: 'flex', gap: '10px', marginTop: '40px' }}>
                        <button
                          onClick={() => restoreNote(selected.id)}
                          style={{
                            padding: '8px 20px', background: 'transparent',
                            color: '#22c55e', border: '1px solid #22c55e',
                            borderRadius: '6px', cursor: 'pointer', fontSize: '13px'
                          }}>↩️ Restore</button>
                        <button
                          onClick={() => permanentDelete(selected.id)}
                          style={{
                            padding: '8px 20px', background: 'transparent',
                            color: '#ef4444', border: '1px solid #ef4444',
                            borderRadius: '6px', cursor: 'pointer', fontSize: '13px'
                          }}>❌ Delete Forever</button>
                      </div>
                    )}
                  </>
                )}
              </motion.div>
            ) : (
              // Notes Grid
              <motion.div
                key="notes-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignContent: 'flex-start' }}>

                {visibleNotes.length === 0 ? (
                  <div style={{ color: '#6b7280', fontSize: '14px', marginTop: '40px', width: '100%', textAlign: 'center' }}>
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>
                      {activeNav === 'Favorites' ? '⭐' : activeNav === 'Trash' ? '🗑️' : '📭'}
                    </div>
                    {activeNav === 'Favorites' ? 'No favorite notes yet!' :
                      activeNav === 'Trash' ? 'Trash is empty!' :
                        'No notes found. Create your first note!'}
                  </div>
                ) : (
                  visibleNotes.map((note, i) => (
                    <motion.div
                      key={note.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => setSelected(note)}
                      onMouseEnter={e => {
                        e.currentTarget.style.borderColor = 'rgba(124,111,247,0.5)'
                        e.currentTarget.style.transform = 'translateY(-4px)'
                        e.currentTarget.style.boxShadow = '0 0 20px rgba(124,111,247,0.15)'
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.borderColor = '#1e1e3a'
                        e.currentTarget.style.transform = 'translateY(0px)'
                        e.currentTarget.style.boxShadow = 'none'
                      }}
                      style={{
                        background: '#13131f', borderRadius: '12px',
                        padding: '20px', width: '260px',
                        border: '1px solid #1e1e3a', cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                        <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#ffffff', margin: 0 }}>
                          {note.title}
                        </h3>
                        <span style={{ fontSize: '14px' }}>{note.favorite ? '⭐' : ''}</span>
                      </div>
                      <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: '1.6', marginBottom: '16px' }}>
                        {note.content.length > 80 ? note.content.slice(0, 80) + '…' : note.content}
                      </p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '11px', color: '#3a3a5a' }}>{note.date}</span>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          {activeNav !== 'Trash' && (
                            <span
                              onClick={e => { e.stopPropagation(); toggleFavorite(note.id) }}
                              style={{ fontSize: '13px', cursor: 'pointer', color: '#3a3a5a' }}
                              onMouseEnter={e => e.target.style.color = '#f59e0b'}
                              onMouseLeave={e => e.target.style.color = note.favorite ? '#f59e0b' : '#3a3a5a'}>
                              {note.favorite ? '⭐' : '☆'}
                            </span>
                          )}
                          {activeNav === 'Trash' ? (
                            <span
                              onClick={e => { e.stopPropagation(); restoreNote(note.id) }}
                              style={{ fontSize: '13px', cursor: 'pointer', color: '#22c55e' }}>
                              ↩️
                            </span>
                          ) : (
                            <span
                              onClick={e => { e.stopPropagation(); deleteNote(note.id) }}
                              style={{ fontSize: '13px', cursor: 'pointer', color: '#3a3a5a' }}
                              onMouseEnter={e => e.target.style.color = '#ef4444'}
                              onMouseLeave={e => e.target.style.color = '#3a3a5a'}>
                              🗑️
                            </span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default Dashboard