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
  FiSun,
  FiMoon,
  FiLogOut,
} from "react-icons/fi";
import { fetchNotes, createNote, updateNote, deleteNote } from "../utils/api";
import toast from "react-hot-toast";
import { useTheme } from "../context/ThemeContext";

const mapNote = (n) => ({
  id: n._id,
  title: n.title,
  content: n.content,
  date: (n.created_at || n.updated_at || "").split("T")[0],
  favorite: n.favorite,
  trashed: n.is_trash,
});

function Dashboard() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const [activeNav, setActiveNav] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [draftTitle, setDraftTitle] = useState("");
  const [draftContent, setDraftContent] = useState("");
  const [saving, setSaving] = useState(false);

  const [notes, setNotes] = useState([]);

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

  const weeklyActivity = useMemo(() => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const counts = {};
    days.forEach((d) => (counts[d] = 0));

    notes.forEach((note) => {
      const d = new Date(note.date);
      if (!isNaN(d)) {
        const dayLabel = days[(d.getDay() + 6) % 7];
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

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const data = await fetchNotes();
        setNotes(data.map(mapNote));
      } catch (err) {
        console.error("Failed to load notes:", err);
      }
    };
    loadNotes();
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

    const saveNote = async () => {
    if (!draftTitle.trim()) return;
    setSaving(true);

    try {
      if (editingNote) {
        const updated = await updateNote(editingNote.id, {
          title: draftTitle,
          content: draftContent,
        });
        setNotes(notes.map((n) => (n.id === editingNote.id ? mapNote(updated) : n)));
        toast.success("Note updated");
      } else {
        const created = await createNote({
          title: draftTitle,
          content: draftContent,
        });
        setNotes([mapNote(created), ...notes]);
        toast.success("Note created");
      }
      closeEditor();
    } catch (err) {
      console.error("Failed to save note:", err);
      toast.error("Couldn't save note");
    } finally {
      setSaving(false);
    }
  };

  const toggleFavorite = async (id) => {
    const note = notes.find((n) => n.id === id);
    if (!note) return;
    try {
      const updated = await updateNote(id, { favorite: !note.favorite });
      setNotes(notes.map((n) => (n.id === id ? mapNote(updated) : n)));
      toast.success("Favorite updated");
    } catch (err) {
      console.error("Failed to toggle favorite:", err);
      toast.error("Couldn't update favorite");
    }
  };

  const moveToTrash = async (id) => {
    try {
      const updated = await updateNote(id, { is_trash: true });
      setNotes(notes.map((n) => (n.id === id ? mapNote(updated) : n)));
      toast.success("Moved to trash");
    } catch (err) {
      console.error("Failed to move to trash:", err);
      toast.error("Couldn't move to trash");
    }
  };

  const restoreFromTrash = async (id) => {
    try {
      const updated = await updateNote(id, { is_trash: false });
      setNotes(notes.map((n) => (n.id === id ? mapNote(updated) : n)));
      toast.success("Note restored");
    } catch (err) {
      console.error("Failed to restore note:", err);
      toast.error("Couldn't restore note");
    }
  };

  const deletePermanently = async (id) => {
    try {
      await deleteNote(id);
      setNotes(notes.filter((n) => n.id !== id));
      toast.success("Note deleted permanently");
    } catch (err) {
      console.error("Failed to delete note:", err);
      toast.error("Couldn't delete note");
    }
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
      <aside style={styles.sidebar}>
        <div style={styles.logoContainer}>
          <span style={styles.logoBadge}>NN</span>
          <span style={styles.logoText}>NoteNest</span>
        </div>

        <button
          onClick={toggleTheme}
          style={styles.themeToggle}
          title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        >
         {theme === "dark" ? <FiMoon size={14} /> : <FiSun size={14} />}
<span>{theme === "dark" ? "Dark" : "Light"}</span>
        </button>

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

       <div style={styles.userFooter}>
  <div style={styles.userInfo}>
    <div style={styles.avatar}>{getInitial(user.username)}</div>
    <div style={styles.userName}>{user.username || user.fullName}</div>
  </div>
  <div
    className="icon-btn"
    style={styles.logoutText}
    onClick={handleLogout}
    title="Click to log out"
  >
    <FiLogOut size={14} />
    Logout
  </div>
</div>
      </aside>

      <main style={styles.main}>
        <div style={styles.contentLayout}>
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
                  <FiSearch size={16} style={{ color: "var(--text-dim)" }} />
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
    <FiFileText size={48} style={{ color: "var(--empty-icon)" }} />
    <p style={styles.emptyText}>
      {activeNav === "trash" ? "Trash is empty" : "No notes yet"}
    </p>
    <p style={styles.emptySubtext}>
      {activeNav === "trash"
        ? "Deleted notes will appear here"
        : "Hit New Note to start writing"}
    </p>
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
whileHover={{ y: -3, borderColor: "var(--accent)", boxShadow: "0 8px 24px var(--accent-glow)" }}
                      style={styles.noteCard}
                      onClick={() => activeNav !== "trash" && openEditNoteEditor(note)}
                    >
                      <div style={styles.noteAccent} />
                      <h3 style={styles.noteTitle}>{note.title}</h3>
                      <p style={styles.notePreview}>{note.content}</p>

                      <div style={styles.noteFooter}>
                        <span style={styles.noteDate}>{note.date}</span>
                        <div style={styles.noteActions}>
                          {activeNav === "trash" ? (
                            <>
                              <button
                                className="icon-btn"
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
                                className="icon-btn"
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
                                className="icon-btn"
                                whileTap={{ scale: 1.4 }}
                                style={styles.iconBtn}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleFavorite(note.id);
                                }}
                              >
                                <FiStar
                                  size={14}
                                  color={note.favorite ? "#facc15" : "var(--text-muted)"}
                                  fill={note.favorite ? "#facc15" : "none"}
                                />
                              </motion.button>
                              <button
                                className="icon-btn"
                                style={styles.iconBtn}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  moveToTrash(note.id);
                                }}
                              >
                                <FiTrash2 size={14} color="var(--text-muted)" />
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {activeNav !== "trash" && (
  <div
    className="add-note-card"
    style={styles.addNoteCard}
    onClick={openNewNoteEditor}
  >
    <FiPlus size={24} />
    <span style={{ fontSize: "13px", fontWeight: 600 }}>Add a note</span>
  </div>
)}
              </div>
            )}
          </div>

          <aside style={styles.rightPanel}>
  <div style={{ ...styles.statCard, borderTop: "3px solid #7c6ff7", background: "linear-gradient(180deg, rgba(124,111,247,0.08), var(--surface) 40%)" }}>
  <div style={styles.statValue}>{activeCount}</div>
  <div style={styles.statLabel}>Total Notes</div>
</div>
<div style={{ ...styles.statCard, borderTop: "3px solid #facc15", background: "linear-gradient(180deg, rgba(250,204,21,0.08), var(--surface) 40%)" }}>
  <div style={{ ...styles.statValue, color: "#facc15" }}>{favoriteCount}</div>
  <div style={styles.statLabel}>Favorites</div>
</div>
<div style={{ ...styles.statCard, borderTop: "3px solid #f87171", background: "linear-gradient(180deg, rgba(248,113,113,0.08), var(--surface) 40%)" }}>
  <div style={{ ...styles.statValue, color: "#f87171" }}>{trashCount}</div>
  <div style={styles.statLabel}>In Trash</div>
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
                  <FiX size={20} style={{ color: "var(--text-muted)" }} />
                </button>
              </div>

              <input
                type="text"
                placeholder="Note title"
                value={draftTitle}
                onChange={(e) => setDraftTitle(e.target.value)}
                className="title-input"
                style={styles.titleInput}
                autoFocus
              />

              <textarea
                placeholder="Start writing..."
                value={draftContent}
                onChange={(e) => setDraftContent(e.target.value)}
                className="content-textarea"
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
  pageContainer: { display: "flex", width: "100%", minHeight: "100vh", backgroundColor: "var(--bg)", fontFamily: "'Outfit', sans-serif" },
  sidebar: { width: "260px", backgroundColor: "var(--surface)", borderRight: "1px solid var(--border)", display: "flex", flexDirection: "column", padding: "24px 16px", flexShrink: 0 },
  logoContainer: { display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px", padding: "0 8px" },
  logoBadge: { background: "linear-gradient(135deg, #7c6ff7, #a78bfa)", borderRadius: "8px", padding: "6px 9px", fontSize: "14px", fontWeight: "900", color: "white" },
  logoText: { fontWeight: "700", fontSize: "17px", color: "var(--text)" },
  themeToggle: { display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", width: "100%", padding: "9px 12px", borderRadius: "8px", border: "1px solid var(--border)", background: "var(--surface-alt)", color: "var(--text-muted)", fontSize: "13px", fontWeight: "600", cursor: "pointer", marginBottom: "16px", transition: "background 0.2s, color 0.2s, border-color 0.2s" },
  newNoteBtn: { display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", background: "linear-gradient(135deg, #7c6ff7, #a78bfa)", color: "#ffffff", border: "none", borderRadius: "8px", padding: "12px", fontSize: "14px", fontWeight: "600", cursor: "pointer", marginBottom: "24px", boxShadow: "0 0 20px rgba(124, 111, 247, 0.2)" },
  navList: { display: "flex", flexDirection: "column", gap: "4px", flex: 1 },
  navItem: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 12px", borderRadius: "8px", cursor: "pointer", color: "var(--text-muted)", fontSize: "14px", fontWeight: "500" },
  navItemActive: { backgroundColor: "#7c6ff7", color: "#ffffff" },
  navItemLabel: { display: "flex", alignItems: "center", gap: "10px" },
  navBadge: { backgroundColor: "var(--badge-bg)", borderRadius: "10px", padding: "1px 8px", fontSize: "12px", fontWeight: "600" },
  userFooter: { display: "flex", flexDirection: "column", gap: "8px", padding: "12px 8px", borderTop: "1px solid var(--border)", marginTop: "12px" },
  userInfo: { display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" },
  avatar: { width: "34px", height: "34px", borderRadius: "50%", background: "linear-gradient(135deg, #7c6ff7, #a78bfa)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700", fontSize: "14px", color: "#ffffff", flexShrink: 0 },
  userName: { fontSize: "14px", fontWeight: "600", color: "var(--text)" },
logoutText: {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  fontSize: "13px",
  fontWeight: "600",
  color: "#f87171",
  cursor: "pointer",
  padding: "10px 12px",
  borderRadius: "8px",
  border: "1px solid rgba(248, 113, 113, 0.2)",
  backgroundColor: "rgba(248, 113, 113, 0.05)",
  marginTop: "4px",
  transition: "background-color 0.15s ease, border-color 0.15s ease",
},  main: { flex: 1, padding: "28px 36px", overflowY: "auto" },
  contentLayout: { display: "flex", gap: "28px", alignItems: "flex-start" },
  notesColumn: { flex: 1, minWidth: 0 },
  topBar: { display: "flex", flexDirection: "column", alignItems: "center", gap: "18px", marginBottom: "28px" },
  pageTitle: { fontSize: "22px", fontWeight: "700", color: "var(--text)", margin: 0, alignSelf: "flex-start" },
  searchRow: { display: "flex", justifyContent: "center", width: "100%" },
  searchWrapper: { display: "flex", alignItems: "center", gap: "8px", backgroundColor: "var(--surface)", border: "1px solid var(--border)", borderRadius: "8px", padding: "10px 14px", width: "100%", maxWidth: "420px" },
  searchInput: { background: "transparent", border: "none", outline: "none", color: "var(--text)", fontSize: "14px", width: "100%" },
  notesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 320px))",
    gap: "20px",
  },
  noteCard: {
    backgroundColor: "var(--surface)",
    border: "1px solid var(--border)",
    borderRadius: "12px",
    padding: "20px",
    cursor: "pointer",
    transition: "box-shadow 0.2s ease, border-color 0.2s ease",
    boxShadow: "var(--card-shadow)",
  },
  addNoteCard: {
    backgroundColor: "transparent",
    border: "2px dashed var(--border-dashed)",
    borderRadius: "12px",
    padding: "20px",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    minHeight: "160px",
    color: "var(--text-dim)",
    transition: "border-color 0.2s ease, color 0.2s ease",
  },
  noteAccent: {
    width: "36px",
    height: "4px",
    borderRadius: "2px",
    background: "linear-gradient(90deg, #7c6ff7, #a78bfa)",
    marginBottom: "14px",
  },
  noteTitle: {
  fontSize: "17px",
  fontWeight: "700",
  color: "var(--text)",
  margin: "0 0 8px 0",
  letterSpacing: "-0.01em",
  display: "-webkit-box",
  WebkitLineClamp: 1,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  wordBreak: "break-all",
},
  notePreview: {
    fontSize: "13px",
    color: "var(--text-preview)",
    lineHeight: "1.6",
    margin: "0 0 20px 0",
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },
  noteFooter: { display: "flex", alignItems: "center", justifyContent: "space-between" },
  noteDate: { fontSize: "12px", color: "var(--text-faint)" },
  noteActions: { display: "flex", gap: "4px" },
  iconBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "6px",
    display: "flex",
    alignItems: "center",
    color: "var(--text-muted)",
    borderRadius: "6px",
  },
  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    padding: "80px 20px",
    textAlign: "center",
  },
  emptyText: {
    color: "var(--text-empty)",
    fontSize: "18px",
    fontWeight: 600,
    margin: 0,
  },
  emptySubtext: {
    color: "var(--text-empty-sub)",
    fontSize: "14px",
    margin: 0,
  },
  rightPanel: { width: "280px", flexShrink: 0, display: "flex", flexDirection: "column", gap: "18px" },
  statsGrid: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" },
  statCard: {
    backgroundColor: "var(--surface)",
    border: "1px solid var(--border)",
    borderTop: "2px solid #7c6ff7",
    borderRadius: "10px",
    padding: "14px 8px",
    textAlign: "center",
    transition: "transform 0.2s ease",
  },
  statValue: { fontSize: "20px", fontWeight: "700", color: "var(--text)" },
  statLabel: { fontSize: "11px", color: "var(--text-dim)", marginTop: "4px" },
  panelCard: { backgroundColor: "var(--surface)", border: "1px solid var(--border)", borderRadius: "12px", padding: "18px" },
  panelHeader: { display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" },
  panelHeaderText: { fontSize: "13px", fontWeight: "600", color: "var(--text)" },
  barChart: { display: "flex", alignItems: "flex-end", justifyContent: "space-between", height: "100px", gap: "6px" },
  barColumn: { display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", flex: 1 },
  barTrack: { width: "100%", height: "80px", display: "flex", alignItems: "flex-end", backgroundColor: "var(--surface-alt)", borderRadius: "4px", overflow: "hidden" },
  barFill: { width: "100%", background: "linear-gradient(180deg, #a78bfa, #7c6ff7)", borderRadius: "4px 4px 0 0" },
  barLabel: { fontSize: "10px", color: "var(--text-dim)" },
  tipText: { fontSize: "13px", color: "var(--text-muted)", lineHeight: "1.6", margin: 0 },
  modalOverlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "var(--overlay)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: "20px" },
  modalCard: {
    backgroundColor: "var(--surface)",
    border: "1px solid var(--border-dashed)",
    borderRadius: "16px",
    width: "100%",
    maxWidth: "560px",
    padding: "24px",
    boxShadow: "var(--modal-shadow)",
    display: "flex",
    flexDirection: "column",
  },
  modalHeader: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" },
  modalTitle: { fontSize: "18px", fontWeight: "600", color: "var(--text)", margin: 0 },
  closeBtn: { background: "none", border: "none", cursor: "pointer", display: "flex" },
  titleInput: {
    backgroundColor: "var(--input-bg)",
    border: "1px solid var(--border)",
    borderRadius: "8px",
    padding: "12px 14px",
    fontSize: "16px",
    fontWeight: "600",
    color: "var(--text)",
    outline: "none",
    marginBottom: "12px",
    transition: "border-color 0.2s ease",
  },
  contentTextarea: {
    backgroundColor: "var(--input-bg)",
    border: "1px solid var(--border)",
    borderRadius: "8px",
    padding: "12px 14px",
    fontSize: "14px",
    color: "var(--text)",
    outline: "none",
    minHeight: "180px",
    resize: "vertical",
    fontFamily: "'Outfit', sans-serif",
    lineHeight: "1.6",
    marginBottom: "20px",
    transition: "border-color 0.2s ease",
  },
  modalFooter: { display: "flex", justifyContent: "flex-end", gap: "12px" },
  cancelBtn: { backgroundColor: "transparent", border: "1px solid var(--border)", borderRadius: "8px", padding: "10px 18px", color: "var(--text-muted)", fontSize: "14px", fontWeight: "600", cursor: "pointer" },
  saveBtn: { background: "linear-gradient(135deg, #7c6ff7, #a78bfa)", border: "none", borderRadius: "8px", padding: "10px 18px", color: "#ffffff", fontSize: "14px", fontWeight: "600" },
};

export default Dashboard;
