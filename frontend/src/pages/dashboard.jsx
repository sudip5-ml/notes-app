import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSearch,
  FiStar,
  FiTrash2,
  FiPlus,
  FiFileText,
  FiX,
  FiTrendingUp,
  FiZap,
} from "react-icons/fi";

function Dashboard() {
  const navigate = useNavigate();

  const [activeNav, setActiveNav] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [draftTitle, setDraftTitle] = useState("");
  const [draftContent, setDraftContent] = useState("");
  const [saving, setSaving] = useState(false);

  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "My First Note",
      content: "This is my first note on NoteNest! Welcome to your personal notes space.",
      date: "2026-07-04",
      favorite: false,
      trashed: false,
    },
    {
      id: 2,
      title: "Study Notes",
      content: "React is a frontend library built by Facebook. It uses components to build UIs.",
      date: "2026-07-04",
      favorite: false,
      trashed: false,
    },
    {
      id: 3,
      title: "Project Ideas",
      content: "Build a notes app using React and Node.js. Add login, search and delete features.",
      date: "2026-07-04",
      favorite: false,
      trashed: false,
    },
  ]);

  const user = JSON.parse(localStorage.getItem("user")) || { username: "Guest" };

  const visibleNotes = notes.filter((n) => {
    if (activeNav === "favorites") return n.favorite && !n.trashed;
    if (activeNav === "trash") return n.trashed;
    return !n.trashed;
  });

  const filteredNotes = visibleNotes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeCount = notes.filter((n) => !n.trashed).length;
  const favoriteCount = notes.filter((n) => n.favorite && !n.trashed).length;
  const trashCount = notes.filter((n) => n.trashed).length;

  // ---- Data for the right-side weekly activity widget ----
  const weeklyActivity = useMemo(() => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const counts = {};
    days.forEach((d) => (counts[d] = 0));

    notes.forEach((note) => {
      const d = new Date(note.date);
      if (!isNaN(d)) {
        const dayLabel = days[(d.getDay() + 6) % 7]; // Mon-first index
        counts[dayLabel] += 1;
      }
    });

    const max = Math.max(1, ...Object.values(counts));
    return days.map((day) => ({
      day,
      count: counts[day],
      pct: Math.round((counts[day] / max) * 100),
    }));
  }, [notes]);

  const tips = [
    "Star a note to pin it under Favorites for quick access.",
    "Deleted notes go to Trash first — nothing is lost instantly.",
    "Use the search bar to jump straight to any note by title or content.",
    "Keep note titles short; the preview line does the rest of the work.",
  ];
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex((i) => (i + 1) % tips.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const openNewNoteEditor = () => {
    setEditingNote(null);
    setDraftTitle("");
    setDraftContent("");
    setIsEditorOpen(true);
  };

  const openEditNoteEditor = (note) => {
    setEditingNote(note);
    setDraftTitle(note.title);
    setDraftContent(note.content);
    setIsEditorOpen(true);
  };

  const closeEditor = () => {
    setIsEditorOpen(false);
    setEditingNote(null);
    setDraftTitle("");
    setDraftContent("");
  };

  const saveNote = () => {
    if (!draftTitle.trim()) return;
    setSaving(true);
    const today = new Date().toISOString().split("T")[0];

    if (editingNote) {
      setNotes(
        notes.map((n) =>
          n.id === editingNote.id
            ? { ...n, title: draftTitle, content: draftContent, date: today }
            : n
        )
      );
    } else {
      const newNote = {
        id: Date.now(),
        title: draftTitle,
        content: draftContent,
        date: today,
        favorite: false,
        trashed: false,
      };
      setNotes([newNote, ...notes]);
    }

    setTimeout(() => {
      setSaving(false);
      closeEditor();
    }, 250);
  };

  const toggleFavorite = (id) => {
    setNotes(notes.map((n) => (n.id === id ? { ...n, favorite: !n.favorite } : n)));
  };

  const moveToTrash = (id) => {
    setNotes(notes.map((n) => (n.id === id ? { ...n, trashed: true } : n)));
  };

  const restoreFromTrash = (id) => {
    setNotes(notes.map((n) => (n.id === id ? { ...n, trashed: false } : n)));
  };

  const deletePermanently = (id) => {
    setNotes(notes.filter((n) => n.id !== id));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const goHome = () => {
    navigate("/");
  };

  const getInitial = (name) => (name ? name.charAt(0).toUpperCase() : "U");

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") closeEditor();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <div style={styles.pageContainer}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.logoContainer}>
          <span style={styles.logoBadge}>NN</span>
          <span style={styles.logoText}>NoteNest</span>
        </div>

        <motion.button
          style={styles.newNoteBtn}
          onClick={openNewNoteEditor}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
        >
          <FiPlus size={16} />
          New Note
        </motion.button>

        <nav style={styles.navList}>
          <div
            style={{ ...styles.navItem, ...(activeNav === "all" ? styles.navItemActive : {}) }}
            onClick={() => setActiveNav("all")}
          >
            <span style={styles.navItemLabel}>
              <FiFileText size={16} />
              All Notes
            </span>
            <span style={styles.navBadge}>{activeCount}</span>
          </div>

          <div
            style={{ ...styles.navItem, ...(activeNav === "favorites" ? styles.navItemActive : {}) }}
            onClick={() => setActiveNav("favorites")}
          >
            <span style={styles.navItemLabel}>
              <FiStar size={16} color="#facc15" />
              Favorites
            </span>
          </div>

          <div
            style={{ ...styles.navItem, ...(activeNav === "trash" ? styles.navItemActive : {}) }}
            onClick={() => setActiveNav("trash")}
          >
            <span style={styles.navItemLabel}>
              <FiTrash2 size={16} />
              Trash
            </span>
          </div>
        </nav>

        {/* User footer: avatar/name logs out, "Back to Home" navigates home */}
        <div style={styles.userFooter}>
          <div style={styles.userInfo} onClick={handleLogout} title="Click to log out">
            <div style={styles.avatar}>{getInitial(user.username)}</div>
            <div style={styles.userName}>{user.username || user.fullName}</div>
          </div>
          <div style={styles.logoutText} onClick={goHome}>
            ← Back to Home
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main style={styles.main}>
        <div style={styles.contentLayout}>
          {/* Notes column */}
          <div style={styles.notesColumn}>
            <div style={styles.topBar}>
              <h1 style={styles.pageTitle}>
                {activeNav === "favorites"
                  ? "Favorites"
                  : activeNav === "trash"
                  ? "Trash"
                  : "All Notes"}
              </h1>

              <div style={styles.searchRow}>
                <div style={styles.searchWrapper}>
                  <FiSearch size={16} color="#6b7280" />
                  <input
                    type="text"
                    placeholder="Search notes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={styles.searchInput}
                  />
                </div>
              </div>
            </div>

            {filteredNotes.length === 0 ? (
              <motion.div
                style={styles.emptyState}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {activeNav === "trash" ? "Trash is empty." : "No notes found."}
              </motion.div>
            ) : (
              <div style={styles.notesGrid}>
                <AnimatePresence>
                  {filteredNotes.map((note, index) => (
                    <motion.div
                      key={note.id}
                      layout
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.25, delay: index * 0.03 }}
                      whileHover={{ y: -3, borderColor: "#7c6ff7" }}
                      style={styles.noteCard}
                      onClick={() => activeNav !== "trash" && openEditNoteEditor(note)}
                    >
                      <h3 style={styles.noteTitle}>{note.title}</h3>
                      <p style={styles.notePreview}>{note.content}</p>

                      <div style={styles.noteFooter}>
                        <span style={styles.noteDate}>{note.date}</span>
                        <div style={styles.noteActions}>
                          {activeNav === "trash" ? (
                            <>
                              <button
                                style={styles.iconBtn}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  restoreFromTrash(note.id);
                                }}
                                title="Restore"
                              >
                                ↺
                              </button>
                              <button
                                style={styles.iconBtn}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deletePermanently(note.id);
                                }}
                                title="Delete forever"
                              >
                                <FiTrash2 size={14} color="#ef4444" />
                              </button>
                            </>
                          ) : (
                            <>
                              <motion.button
                                whileTap={{ scale: 1.4 }}
                                style={styles.iconBtn}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleFavorite(note.id);
                                }}
                              >
                                <FiStar
                                  size={14}
                                  color={note.favorite ? "#facc15" : "#6b7280"}
                                  fill={note.favorite ? "#facc15" : "none"}
                                />
                              </motion.button>
                              <button
                                style={styles.iconBtn}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  moveToTrash(note.id);
                                }}
                              >
                                <FiTrash2 size={14} color="#6b7280" />
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Right-side insights panel — fills previously empty space */}
          <aside style={styles.rightPanel}>
            <div style={styles.statsGrid}>
              <div style={styles.statCard}>
                <div style={styles.statValue}>{activeCount}</div>
                <div style={styles.statLabel}>Total Notes</div>
              </div>
              <div style={styles.statCard}>
                <div style={{ ...styles.statValue, color: "#facc15" }}>{favoriteCount}</div>
                <div style={styles.statLabel}>Favorites</div>
              </div>
              <div style={styles.statCard}>
                <div style={{ ...styles.statValue, color: "#f87171" }}>{trashCount}</div>
                <div style={styles.statLabel}>In Trash</div>
              </div>
            </div>

            <div style={styles.panelCard}>
              <div style={styles.panelHeader}>
                <FiTrendingUp size={15} color="#7c6ff7" />
                <span style={styles.panelHeaderText}>Weekly Activity</span>
              </div>
              <div style={styles.barChart}>
                {weeklyActivity.map((d) => (
                  <div key={d.day} style={styles.barColumn}>
                    <div style={styles.barTrack}>
                      <motion.div
                        style={styles.barFill}
                        initial={{ height: 0 }}
                        animate={{ height: `${Math.max(d.pct, 4)}%` }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                      />
                    </div>
                    <span style={styles.barLabel}>{d.day}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={styles.panelCard}>
              <div style={styles.panelHeader}>
                <FiZap size={15} color="#facc15" />
                <span style={styles.panelHeaderText}>Quick Tip</span>
              </div>
              <AnimatePresence mode="wait">
                <motion.p
                  key={tipIndex}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3 }}
                  style={styles.tipText}
                >
                  {tips[tipIndex]}
                </motion.p>
              </AnimatePresence>
            </div>
          </aside>
        </div>
      </main>

      {/* Note editor modal */}
      <AnimatePresence>
        {isEditorOpen && (
          <motion.div
            style={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeEditor}
          >
            <motion.div
              style={styles.modalCard}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={styles.modalHeader}>
                <h2 style={styles.modalTitle}>{editingNote ? "Edit Note" : "New Note"}</h2>
                <button style={styles.closeBtn} onClick={closeEditor}>
                  <FiX size={20} color="#9ca3af" />
                </button>
              </div>

              <input
                type="text"
                placeholder="Note title"
                value={draftTitle}
                onChange={(e) => setDraftTitle(e.target.value)}
                style={styles.titleInput}
                autoFocus
              />

              <textarea
                placeholder="Start writing..."
                value={draftContent}
                onChange={(e) => setDraftContent(e.target.value)}
                style={styles.contentTextarea}
              />

              <div style={styles.modalFooter}>
                <button style={styles.cancelBtn} onClick={closeEditor}>
                  Cancel
                </button>
                <motion.button
                  whileHover={{ scale: draftTitle.trim() ? 1.02 : 1 }}
                  whileTap={{ scale: draftTitle.trim() ? 0.97 : 1 }}
                  style={{
                    ...styles.saveBtn,
                    opacity: draftTitle.trim() ? 1 : 0.5,
                    cursor: draftTitle.trim() ? "pointer" : "not-allowed",
                  }}
                  onClick={saveNote}
                  disabled={!draftTitle.trim() || saving}
                >
                  {saving ? "Saving..." : editingNote ? "Save changes" : "Create note"}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const styles = {
  pageContainer: {
    display: "flex",
    width: "100%",
    minHeight: "100vh",
    backgroundColor: "#0f0f1a",
    fontFamily: "'Outfit', sans-serif",
  },

  // Sidebar
  sidebar: {
    width: "260px",
    backgroundColor: "#131324",
    borderRight: "1px solid #1e1e3a",
    display: "flex",
    flexDirection: "column",
    padding: "24px 16px",
    flexShrink: 0,
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "28px",
    padding: "0 8px",
  },
  logoBadge: {
    background: "linear-gradient(135deg, #7c6ff7, #a78bfa)",
    borderRadius: "8px",
    padding: "6px 9px",
    fontSize: "14px",
    fontWeight: "900",
    color: "white",
  },
  logoText: {
    fontWeight: "700",
    fontSize: "17px",
    color: "#ffffff",
  },
  newNoteBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    background: "linear-gradient(135deg, #7c6ff7, #a78bfa)",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    padding: "12px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    marginBottom: "24px",
    boxShadow: "0 0 20px rgba(124, 111, 247, 0.2)",
  },
  navList: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    flex: 1,
  },
  navItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "11px 12px",
    borderRadius: "8px",
    cursor: "pointer",
    color: "#9ca3af",
    fontSize: "14px",
    fontWeight: "500",
    transition: "background-color 0.15s ease, color 0.15s ease",
  },
  navItemActive: {
    backgroundColor: "#7c6ff7",
    color: "#ffffff",
  },
  navItemLabel: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  navBadge: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: "10px",
    padding: "1px 8px",
    fontSize: "12px",
    fontWeight: "600",
  },

  // User footer
  userFooter: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    padding: "12px 8px",
    borderTop: "1px solid #1e1e3a",
    marginTop: "12px",
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer",
  },
  avatar: {
    width: "34px",
    height: "34px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #7c6ff7, #a78bfa)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "700",
    fontSize: "14px",
    color: "#ffffff",
    flexShrink: 0,
  },
  userName: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#ffffff",
  },
  logoutText: {
    fontSize: "12px",
    color: "#6b7280",
    cursor: "pointer",
    marginLeft: "44px",
  },

  // Main content
  main: {
    flex: 1,
    padding: "28px 36px",
    overflowY: "auto",
  },

  // Two-column layout: notes on the left, insights panel on the right
  contentLayout: {
    display: "flex",
    gap: "28px",
    alignItems: "flex-start",
  },
  notesColumn: {
    flex: 1,
    minWidth: 0,
  },

  // Top bar: title on its own row, search centered below it
  topBar: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "18px",
    marginBottom: "28px",
  },
  pageTitle: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#ffffff",
    margin: 0,
    alignSelf: "flex-start",
  },
  searchRow: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  searchWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    backgroundColor: "#131324",
    border: "1px solid #1e1e3a",
    borderRadius: "8px",
    padding: "10px 14px",
    width: "100%",
    maxWidth: "420px",
  },
  searchInput: {
    background: "transparent",
    border: "none",
    outline: "none",
    color: "#ffffff",
    fontSize: "14px",
    width: "100%",
  },

  // Notes grid
  notesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
    gap: "20px",
  },
  noteCard: {
    backgroundColor: "#131324",
    border: "1px solid #1e1e3a",
    borderRadius: "12px",
    padding: "20px",
    cursor: "pointer",
  },
  noteTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#ffffff",
    margin: "0 0 10px 0",
  },
  notePreview: {
    fontSize: "13px",
    color: "#9ca3af",
    lineHeight: "1.5",
    margin: "0 0 20px 0",
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },
  noteFooter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  noteDate: {
    fontSize: "12px",
    color: "#4b5563",
  },
  noteActions: {
    display: "flex",
    gap: "4px",
  },
  iconBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "4px",
    display: "flex",
    alignItems: "center",
    color: "#9ca3af",
  },
  emptyState: {
    color: "#6b7280",
    fontSize: "14px",
    textAlign: "center",
    padding: "60px 0",
  },

  // Right insights panel
  rightPanel: {
    width: "280px",
    flexShrink: 0,
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "10px",
  },
  statCard: {
    backgroundColor: "#131324",
    border: "1px solid #1e1e3a",
    borderRadius: "10px",
    padding: "14px 8px",
    textAlign: "center",
  },
  statValue: {
    fontSize: "20px",
    fontWeight: "700",
    color: "#ffffff",
  },
  statLabel: {
    fontSize: "11px",
    color: "#6b7280",
    marginTop: "4px",
  },
  panelCard: {
    backgroundColor: "#131324",
    border: "1px solid #1e1e3a",
    borderRadius: "12px",
    padding: "18px",
  },
  panelHeader: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "16px",
  },
  panelHeaderText: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#ffffff",
  },
  barChart: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: "100px",
    gap: "6px",
  },
  barColumn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "6px",
    flex: 1,
  },
  barTrack: {
    width: "100%",
    height: "80px",
    display: "flex",
    alignItems: "flex-end",
    backgroundColor: "#1a1a30",
    borderRadius: "4px",
    overflow: "hidden",
  },
  barFill: {
    width: "100%",
    background: "linear-gradient(180deg, #a78bfa, #7c6ff7)",
    borderRadius: "4px 4px 0 0",
  },
  barLabel: {
    fontSize: "10px",
    color: "#6b7280",
  },
  tipText: {
    fontSize: "13px",
    color: "#9ca3af",
    lineHeight: "1.6",
    margin: 0,
  },

  // Modal
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
    padding: "20px",
  },
  modalCard: {
    backgroundColor: "#131324",
    border: "1px solid #1e1e3a",
    borderRadius: "16px",
    width: "100%",
    maxWidth: "560px",
    padding: "24px",
    boxShadow: "0 30px 100px rgba(0,0,0,0.6)",
    display: "flex",
    flexDirection: "column",
  },
  modalHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "16px",
  },
  modalTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#ffffff",
    margin: 0,
  },
  closeBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    display: "flex",
  },
  titleInput: {
    backgroundColor: "transparent",
    border: "1px solid #1e1e3a",
    borderRadius: "8px",
    padding: "12px 14px",
    fontSize: "16px",
    fontWeight: "600",
    color: "#ffffff",
    outline: "none",
    marginBottom: "12px",
  },
  contentTextarea: {
    backgroundColor: "transparent",
    border: "1px solid #1e1e3a",
    borderRadius: "8px",
    padding: "12px 14px",
    fontSize: "14px",
    color: "#ffffff",
    outline: "none",
    minHeight: "180px",
    resize: "vertical",
    fontFamily: "'Outfit', sans-serif",
    lineHeight: "1.6",
    marginBottom: "20px",
  },
  modalFooter: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
  },
  cancelBtn: {
    backgroundColor: "transparent",
    border: "1px solid #1e1e3a",
    borderRadius: "8px",
    padding: "10px 18px",
    color: "#9ca3af",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
  },
  saveBtn: {
    background: "linear-gradient(135deg, #7c6ff7, #a78bfa)",
    border: "none",
    borderRadius: "8px",
    padding: "10px 18px",
    color: "#ffffff",
    fontSize: "14px",
    fontWeight: "600",
  },
};

export default Dashboard;
