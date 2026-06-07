import React, { useState } from 'react'

function Dashboard() {
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: 'Welcome to NoteNest',
      content: 'Create notes, mark favorites, and keep everything organized in one place.',
      date: '2026-06-06',
      favorite: true,
      trash: false,
    },
    {
      id: 2,
      title: 'Team meeting notes',
      content: 'Review the latest features, prioritize tasks, and follow up on blockers after the standup.',
      date: '2026-06-05',
      favorite: false,
      trash: false,
    },
    {
      id: 3,
      title: 'Research ideas',
      content: 'Collect inspiration, write quick summaries, and pin the notes you want to return to later.',
      date: '2026-06-04',
      favorite: false,
      trash: false,
    },
  ])

  const [selected, setSelected] = useState(notes[0] || null)
  const [search, setSearch] = useState('')
  const [activeNav, setActiveNav] = useState('All Notes')
  const [showNewNote, setShowNewNote] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newContent, setNewContent] = useState('')
  const [editMode, setEditMode] = useState(false)
  const [editTitle, setEditTitle] = useState('')
  const [editContent, setEditContent] = useState('')

  const visibleNotes = notes.filter(note => {
    if (activeNav === 'Favorites') return note.favorite && !note.trash
    if (activeNav === 'Trash') return note.trash
    return !note.trash
  }).filter(note => {
    const query = search.toLowerCase()
    if (!query) return true
    return note.title.toLowerCase().includes(query) || note.content.toLowerCase().includes(query)
  })

  const selectNote = note => {
    setSelected(note)
    setShowNewNote(false)
    setEditMode(false)
  }

  const addNote = () => {
    if (!newTitle.trim()) return
    const note = {
      id: Date.now(),
      title: newTitle.trim(),
      content: newContent.trim() || 'Start writing your note here...',
      date: new Date().toLocaleDateString(),
      favorite: false,
      trash: false,
    }
    setNotes([note, ...notes])
    setSelected(note)
    setActiveNav('All Notes')
    setShowNewNote(false)
    setNewTitle('')
    setNewContent('')
  }

  const toggleTrash = id => {
    setNotes(prevNotes => prevNotes.map(note => note.id === id ? { ...note, trash: !note.trash } : note))
    if (selected?.id === id) setSelected(null)
  }

  const restoreNote = id => {
    setNotes(prevNotes => {
      const updated = prevNotes.map(note => note.id === id ? { ...note, trash: false } : note)
      if (selected?.id === id) {
        setSelected(updated.find(note => note.id === id))
      }
      return updated
    })
  }

  const deleteNotePermanently = id => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id))
    if (selected?.id === id) setSelected(null)
  }

  const toggleFavorite = id => {
    setNotes(prevNotes => prevNotes.map(note => note.id === id ? { ...note, favorite: !note.favorite } : note))
    if (selected?.id === id) setSelected(prev => ({ ...prev, favorite: !prev.favorite }))
  }

  const saveEdit = () => {
    if (!selected) return
    setNotes(notes.map(note => note.id === selected.id ? { ...note, title: editTitle.trim(), content: editContent.trim() } : note))
    setSelected({ ...selected, title: editTitle.trim(), content: editContent.trim() })
    setEditMode(false)
  }

  const noteCount = notes.filter(note => !note.trash).length
  const favoriteCount = notes.filter(note => note.favorite && !note.trash).length
  const trashCount = notes.filter(note => note.trash).length

  return (
    <div style={styles.page}>
      <aside style={styles.sidebar}>
        <div>
          <div style={styles.logo}>NoteNest</div>
          <p style={styles.subtext}>A simple notes workspace.</p>
        </div>

        <div style={styles.navGroup}>
          {[
            { label: 'All Notes', count: noteCount },
            { label: 'Favorites', count: favoriteCount },
            { label: 'Trash', count: trashCount },
          ].map(item => (
            <button
              type="button"
              key={item.label}
              onClick={() => { setActiveNav(item.label); setSelected(null); setShowNewNote(false) }}
              style={{
                ...styles.navButton,
                ...(activeNav === item.label ? styles.navButtonActive : {}),
              }}
            >
              <span>{item.label}</span>
              <span style={styles.navCount}>{item.count}</span>
            </button>
          ))}
        </div>

        <button type="button" onClick={() => { setShowNewNote(true); setSelected(null); setEditMode(false) }} style={styles.primaryButton}>
          + New Note
        </button>
      </aside>

      <main style={styles.main}>
        <div style={styles.topBar}>
          <div>
            <h1 style={styles.title}>{activeNav}</h1>
            <p style={styles.description}>Search, create, and manage your notes in one clean view.</p>
          </div>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search notes..."
            style={styles.search}
          />
        </div>

        <div style={styles.contentGrid}>
          <section style={styles.listPanel}>
            <div style={styles.panelHeader}>
              <span>Notes</span>
              <span>{visibleNotes.length}</span>
            </div>

            <div style={styles.noteList}>
              {visibleNotes.length === 0 ? (
                <div style={styles.emptyState}>No notes found.</div>
              ) : visibleNotes.map(note => (
                <button
                  key={note.id}
                  type="button"
                  onClick={() => selectNote(note)}
                  style={{
                    ...styles.noteItem,
                    ...(selected?.id === note.id ? styles.noteItemActive : {}),
                  }}
                >
                  <div>
                    <div style={styles.noteTitle}>{note.title}</div>
                    <div style={styles.noteSnippet}>{note.content.slice(0, 70)}...</div>
                  </div>
                  <div style={styles.noteMeta}>
                    {note.favorite ? '⭐' : ''}
                    <span>{note.date}</span>
                  </div>
                </button>
              ))}
            </div>
          </section>

          <section style={styles.detailPanel}>
            {showNewNote ? (
              <div style={styles.editorCard}>
                <div style={styles.editorHeader}>
                  <h2 style={styles.editorTitle}>New note</h2>
                </div>
                <input
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="Title"
                  style={styles.input}
                />
                <textarea
                  value={newContent}
                  onChange={e => setNewContent(e.target.value)}
                  placeholder="Write your note..."
                  style={styles.textarea}
                />
                <div style={styles.buttonRow}>
                  <button type="button" onClick={addNote} style={styles.primaryButton}>Save</button>
                  <button type="button" onClick={() => setShowNewNote(false)} style={styles.secondaryButton}>Cancel</button>
                </div>
              </div>
            ) : selected ? (
              <div style={styles.editorCard}>
                <div style={styles.editorHeader}>
                  <div>
                    <h2 style={styles.editorTitle}>{selected.title}</h2>
                    <div style={styles.noteInfo}>{selected.date}</div>
                  </div>
                  <div style={styles.buttonRow}>
                    <button type="button" onClick={() => { setEditMode(true); setEditTitle(selected.title); setEditContent(selected.content) }} style={styles.secondaryButton}>Edit</button>
                    {activeNav === 'Trash' ? (
                      <>
                        <button type="button" onClick={() => restoreNote(selected.id)} style={styles.secondaryButton}>Restore</button>
                        <button type="button" onClick={() => deleteNotePermanently(selected.id)} style={styles.primaryButton}>Delete permanently</button>
                      </>
                    ) : (
                      <button type="button" onClick={() => toggleTrash(selected.id)} style={styles.secondaryButton}>Move to trash</button>
                    )}
                  </div>
                </div>

                {editMode ? (
                  <>
                    <input
                      value={editTitle}
                      onChange={e => setEditTitle(e.target.value)}
                      placeholder="Title"
                      style={styles.input}
                    />
                    <textarea
                      value={editContent}
                      onChange={e => setEditContent(e.target.value)}
                      placeholder="Edit your note..."
                      style={styles.textarea}
                    />
                    <div style={styles.buttonRow}>
                      <button type="button" onClick={saveEdit} style={styles.primaryButton}>Save</button>
                      <button type="button" onClick={() => setEditMode(false)} style={styles.secondaryButton}>Cancel</button>
                    </div>
                  </>
                ) : (
                  <>
                    <p style={styles.noteBody}>{selected.content}</p>
                    <div style={styles.actionRow}>
                      <button type="button" onClick={() => toggleFavorite(selected.id)} style={styles.favoriteButton}>
                        {selected.favorite ? 'Unfavorite' : 'Mark favorite'}
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div style={styles.emptyPanel}>
                <h2 style={{ margin: 0 }}>Pick a note</h2>
                <p style={{ marginTop: '10px', color: '#a1a1bb' }}>Select a note from the list or create a new one.</p>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  )
}

const styles = {
  page: {
    display: 'grid',
    gridTemplateColumns: '220px 1fr',
    minHeight: '100vh',
    background: '#0f0f1d',
    color: '#edf2ff',
    fontFamily: 'Inter, system-ui, sans-serif',
  },
  sidebar: {
    background: '#111126',
    borderRight: '1px solid #1d1d34',
    padding: '28px 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  logo: {
    fontSize: '22px',
    fontWeight: '800',
  },
  subtext: {
    marginTop: '8px',
    color: '#a1a1bb',
    fontSize: '13px',
    lineHeight: '1.6',
  },
  navGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  navButton: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: '12px 14px',
    borderRadius: '12px',
    border: 'none',
    background: 'transparent',
    color: '#d4d4f8',
    cursor: 'pointer',
    textAlign: 'left',
    fontSize: '14px',
  },
  navButtonActive: {
    background: '#1f1f3a',
    color: '#ffffff',
  },
  navCount: {
    background: '#1f1f3a',
    borderRadius: '999px',
    padding: '4px 8px',
    fontSize: '12px',
  },
  primaryButton: {
    border: 'none',
    borderRadius: '12px',
    padding: '12px 16px',
    background: 'linear-gradient(135deg, #7c6ff7, #a78bfa)',
    color: '#ffffff',
    fontWeight: '600',
    cursor: 'pointer',
  },
  secondaryButton: {
    border: '1px solid #3f3f68',
    borderRadius: '12px',
    padding: '12px 16px',
    background: 'transparent',
    color: '#edf2ff',
    cursor: 'pointer',
  },
  main: {
    padding: '28px 30px',
    overflowY: 'auto',
  },
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: '20px',
    marginBottom: '24px',
  },
  title: {
    margin: 0,
    fontSize: '30px',
    fontWeight: '800',
  },
  description: {
    margin: '8px 0 0',
    color: '#a1a1bb',
    fontSize: '14px',
  },
  search: {
    width: '260px',
    padding: '12px 16px',
    borderRadius: '14px',
    border: '1px solid #2b2b4b',
    background: '#111126',
    color: '#edf2ff',
    outline: 'none',
  },
  contentGrid: {
    display: 'grid',
    gridTemplateColumns: '320px 1fr',
    gap: '24px',
    minHeight: 'calc(100vh - 120px)',
  },
  listPanel: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  panelHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 16px',
    borderRadius: '16px',
    background: '#111126',
    color: '#c7c7d4',
    fontSize: '13px',
  },
  noteList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    overflowY: 'auto',
    paddingRight: '4px',
  },
  noteItem: {
    width: '100%',
    padding: '14px 16px',
    borderRadius: '16px',
    border: '1px solid #1f1f3a',
    background: '#12122c',
    color: '#edf2ff',
    textAlign: 'left',
    cursor: 'pointer',
    display: 'grid',
    gridTemplateColumns: '1fr auto',
    gap: '12px',
  },
  noteItemActive: {
    borderColor: '#7c6ff7',
    background: '#17173d',
  },
  noteTitle: {
    fontSize: '15px',
    fontWeight: '700',
    marginBottom: '6px',
  },
  noteSnippet: {
    fontSize: '13px',
    color: '#a1a1bb',
    lineHeight: '1.6',
  },
  noteMeta: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    fontSize: '12px',
    color: '#9ca3af',
  },
  detailPanel: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  editorCard: {
    background: '#111126',
    borderRadius: '24px',
    padding: '24px',
    boxShadow: '0 30px 80px rgba(0, 0, 0, 0.25)',
    minHeight: '400px',
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
  },
  editorHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '16px',
    alignItems: 'flex-start',
  },
  editorTitle: {
    margin: 0,
    fontSize: '22px',
    fontWeight: '800',
  },
  noteInfo: {
    marginTop: '8px',
    fontSize: '13px',
    color: '#9ca3af',
  },
  input: {
    width: '100%',
    padding: '14px 16px',
    borderRadius: '16px',
    border: '1px solid #1f1f3a',
    background: '#12122c',
    color: '#edf2ff',
    outline: 'none',
    fontSize: '14px',
  },
  textarea: {
    width: '100%',
    minHeight: '220px',
    padding: '14px 16px',
    borderRadius: '16px',
    border: '1px solid #1f1f3a',
    background: '#12122c',
    color: '#edf2ff',
    outline: 'none',
    resize: 'vertical',
    fontSize: '14px',
    lineHeight: '1.7',
  },
  buttonRow: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
  },
  noteBody: {
    color: '#d1d5db',
    lineHeight: '1.8',
    fontSize: '15px',
  },
  actionRow: {
    display: 'flex',
    gap: '12px',
  },
  favoriteButton: {
    border: '1px solid #3f3f68',
    borderRadius: '12px',
    padding: '12px 16px',
    background: 'transparent',
    color: '#edf2ff',
    cursor: 'pointer',
  },
  emptyState: {
    padding: '18px 16px',
    borderRadius: '16px',
    background: '#111126',
    textAlign: 'center',
    color: '#9ca3af',
  },
  emptyPanel: {
    padding: '32px',
    borderRadius: '24px',
    background: '#111126',
    color: '#d1d5db',
  },
}

export default Dashboard
