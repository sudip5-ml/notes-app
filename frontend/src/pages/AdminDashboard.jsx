import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiUsers, FiFileText, FiUserPlus, FiTrash2, FiShield } from "react-icons/fi";

// ASSUMPTION: your API base is http://localhost:5000 (same as Login/Signup).
// Swap this for an env variable when you deploy.
const API_BASE = "http://localhost:5000/api/admin";

function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("users"); // "users" | "notes"
  const [stats, setStats] = useState({ totalUsers: 0, totalNotes: 0, newUsersThisWeek: 0 });
  const [users, setUsers] = useState([]);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")) || {};

  const authHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  // Guard: kick non-admins out immediately
  // useEffect(() => {
  //   if (!token) {
  //     navigate("/login");
  //     return;
  //   }
  //   if (user.role !== "admin") {
  //     navigate("/dashboard");
  //     return;
  //   }
  //   loadData();
  // }, []);

  const loadData = async () => {
    setLoading(true);
    setError("");
    try {
      const [statsRes, usersRes, notesRes] = await Promise.all([
        fetch(`${API_BASE}/stats`, { headers: authHeaders }),
        fetch(`${API_BASE}/users`, { headers: authHeaders }),
        fetch(`${API_BASE}/notes`, { headers: authHeaders }),
      ]);

      if (!statsRes.ok || !usersRes.ok || !notesRes.ok) {
        throw new Error("Failed to load admin data");
      }

      setStats(await statsRes.json());
      setUsers(await usersRes.json());
      setNotes(await notesRes.json());
    } catch (err) {
      setError(err.message || "Something went wrong loading the admin dashboard.");
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Delete this user and all their notes?")) return;
    try {
      const res = await fetch(`${API_BASE}/users/${id}`, {
        method: "DELETE",
        headers: authHeaders,
      });
      if (!res.ok) throw new Error("Failed to delete user");
      setUsers(users.filter((u) => u.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteNote = async (id) => {
    if (!window.confirm("Delete this note?")) return;
    try {
      const res = await fetch(`${API_BASE}/notes/${id}`, {
        method: "DELETE",
        headers: authHeaders,
      });
      if (!res.ok) throw new Error("Failed to delete note");
      setNotes(notes.filter((n) => n.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  // Logout function
  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Redirect to login page
    navigate('/login');
  }
  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString();

  return (
    <div style={styles.pageContainer}>
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={styles.logoContainer}>
          <span style={styles.logoBadge}>NN</span>
          <span style={styles.logoText}>NoteNest</span>
        </div>
        <div style={styles.adminTag}>
          <FiShield size={14} />
          Admin Panel
        </div>

        <nav style={styles.navList}>
          <div
            style={{ ...styles.navItem, ...(activeTab === "users" ? styles.navItemActive : {}) }}
            onClick={() => setActiveTab("users")}
          >
            <FiUsers size={16} />
            Users
            <span style={styles.navBadge}>{stats.totalUsers}</span>
          </div>
          <div
            style={{ ...styles.navItem, ...(activeTab === "notes" ? styles.navItemActive : {}) }}
            onClick={() => setActiveTab("notes")}
          >
            <FiFileText size={16} />
            All Notes
            <span style={styles.navBadge}>{stats.totalNotes}</span>
          </div>
        </nav>

      {/* Logout Button */}
            <div style={styles.userFooter}>
              <button 
                onClick={handleLogout}
                style={styles.logoutButton}
              >
                Logout
              </button>
            </div>

        {/* <div style={styles.userFooter}>
          <div style={styles.logoutText} onClick={() => navigate("/dashboard")}>
            ← Back to My Dashboard
          </div>
        </div> */}
      </aside>

      {/* Main content */}
      <main style={styles.main}>
        <h1 style={styles.pageTitle}>Admin Overview</h1>

        {error && <div style={styles.errorAlert}>{error}</div>}

        {/* Stat cards */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <FiUsers size={20} color="#7c6ff7" />
            <div style={styles.statValue}>{stats.totalUsers}</div>
            <div style={styles.statLabel}>Total Users</div>
          </div>
          <div style={styles.statCard}>
            <FiFileText size={20} color="#a78bfa" />
            <div style={styles.statValue}>{stats.totalNotes}</div>
            <div style={styles.statLabel}>Total Notes</div>
          </div>
          <div style={styles.statCard}>
            <FiUserPlus size={20} color="#22c55e" />
            <div style={styles.statValue}>{stats.newUsersThisWeek}</div>
            <div style={styles.statLabel}>New Users (7d)</div>
          </div>
        </div>

        {loading ? (
          <div style={styles.emptyState}>Loading admin data...</div>
        ) : activeTab === "users" ? (
          <div style={styles.tableCard}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Email</th>
                  <th style={styles.th}>Role</th>
                  <th style={styles.th}>Joined</th>
                  <th style={styles.th}></th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} style={styles.tr}>
                    <td style={styles.td}>{u.full_name || "—"}</td>
                    <td style={styles.td}>{u.email}</td>
                    <td style={styles.td}>
                      <span
                        style={{
                          ...styles.roleBadge,
                          backgroundColor: u.role === "admin" ? "#7c6ff733" : "#1e1e3a",
                          color: u.role === "admin" ? "#a78bfa" : "#9ca3af",
                        }}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td style={styles.td}>{formatDate(u.created_at)}</td>
                    <td style={styles.td}>
                      <button style={styles.iconBtn} onClick={() => deleteUser(u.id)}>
                        <FiTrash2 size={14} color="#ef4444" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {users.length === 0 && <div style={styles.emptyState}>No users found.</div>}
          </div>
        ) : (
          <div style={styles.tableCard}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Title</th>
                  <th style={styles.th}>Owner</th>
                  <th style={styles.th}>Created</th>
                  <th style={styles.th}></th>
                </tr>
              </thead>
              <tbody>
                {notes.map((n) => (
                  <tr key={n.id} style={styles.tr}>
                    <td style={styles.td}>{n.title}</td>
                    <td style={styles.td}>{n.owner_name || n.owner_email}</td>
                    <td style={styles.td}>{formatDate(n.created_at)}</td>
                    <td style={styles.td}>
                      <button style={styles.iconBtn} onClick={() => deleteNote(n.id)}>
                        <FiTrash2 size={14} color="#ef4444" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {notes.length === 0 && <div style={styles.emptyState}>No notes found.</div>}
          </div>
        )}
      </main>
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
  sidebar: {
    width: "240px",
    backgroundColor: "#131324",
    borderRight: "1px solid #1e1e3a",
    display: "flex",
    flexDirection: "column",
    padding: "24px 16px",
    flexShrink: 0,
  },
  logoContainer: { display: "flex", alignItems: "center", gap: "10px", padding: "0 8px" },
  logoBadge: {
    background: "linear-gradient(135deg, #7c6ff7, #a78bfa)",
    borderRadius: "8px",
    padding: "6px 9px",
    fontSize: "14px",
    fontWeight: "900",
    color: "white",
  },
  logoText: { fontWeight: "700", fontSize: "17px", color: "#ffffff" },
  adminTag: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "11px",
    fontWeight: "600",
    color: "#a78bfa",
    backgroundColor: "#7c6ff722",
    padding: "5px 10px",
    borderRadius: "6px",
    margin: "14px 8px 24px 8px",
    width: "fit-content",
  },
  navList: { display: "flex", flexDirection: "column", gap: "4px", flex: 1 },
  navItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "11px 12px",
    borderRadius: "8px",
    cursor: "pointer",
    color: "#9ca3af",
    fontSize: "14px",
    fontWeight: "500",
  },
  navItemActive: { backgroundColor: "#7c6ff7", color: "#ffffff" },
  navBadge: {
    marginLeft: "auto",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: "10px",
    padding: "1px 8px",
    fontSize: "12px",
    fontWeight: "600",
  },
  userFooter: { padding: "12px 8px", borderTop: "1px solid #1e1e3a", marginTop: "12px" },
  logoutText: { fontSize: "12px", color: "#6b7280", cursor: "pointer" },
  main: { flex: 1, padding: "28px 36px", overflowY: "auto" },
  pageTitle: { fontSize: "22px", fontWeight: "700", color: "#ffffff", marginBottom: "24px" },
  errorAlert: {
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    border: "1px solid #ef4444",
    borderRadius: "6px",
    padding: "10px 14px",
    color: "#ef4444",
    fontSize: "13px",
    marginBottom: "20px",
  },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "28px" },
  statCard: {
    backgroundColor: "#131324",
    border: "1px solid #1e1e3a",
    borderRadius: "12px",
    padding: "18px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  statValue: { fontSize: "24px", fontWeight: "700", color: "#ffffff" },
  statLabel: { fontSize: "12px", color: "#6b7280" },
  tableCard: {
    backgroundColor: "#131324",
    border: "1px solid #1e1e3a",
    borderRadius: "12px",
    overflow: "hidden",
  },
  table: { width: "100%", borderCollapse: "collapse" },
  th: {
    textAlign: "left",
    padding: "14px 18px",
    fontSize: "12px",
    color: "#6b7280",
    borderBottom: "1px solid #1e1e3a",
    textTransform: "uppercase",
  },
  tr: { borderBottom: "1px solid #1e1e3a" },
  td: { padding: "14px 18px", fontSize: "14px", color: "#ffffff" },
  roleBadge: { padding: "3px 10px", borderRadius: "6px", fontSize: "12px", fontWeight: "600" },
  iconBtn: { background: "none", border: "none", cursor: "pointer", padding: "4px" },
  emptyState: { color: "#6b7280", fontSize: "14px", textAlign: "center", padding: "40px 0" },
  userFooter: {
    padding: '20px',
    borderTop: '1px solid #eee',
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center'
  },
  logoutButton: {
    backgroundColor: 'rgb(124, 111, 247)',
    color: 'white',
    border: 'none',
    padding: '10px 30px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '500',
    transition: 'background-color 0.3s'
  },
  // Add hover effect
  logoutButtonHover: {
    backgroundColor: '#c82333'
  }
};

export default AdminDashboard;
