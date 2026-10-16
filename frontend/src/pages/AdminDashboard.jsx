import { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users, FileText, UserPlus, Trash2, Shield, Search, ChevronUp, ChevronDown,
  X, Check, LogOut, Activity, ChevronLeft, ChevronRight, AlertCircle,
  Loader2, Mail, Calendar, ChevronsUpDown, History, ArrowRight, Download,
} from "lucide-react";
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  PieChart, Pie, Cell, AreaChart, Area,
} from "recharts";

// ASSUMPTION: your API base is http://localhost:5000 (same as Login/Signup).
// Swap this for an env variable when you deploy.
const API_BASE = "http://localhost:5000/api/admin";

// DEMO_MODE: if the real API can't be reached (e.g. previewing this file
// outside your backend), the dashboard falls back to generated sample data
// so you can see the full design. Delete generateDemoData() + the catch
// fallback below once you've wired this into your real project.
const DEMO_MODE_FALLBACK = true;

const PAGE_SIZE = 8;

const tokens = {
  bg: "#0f0f1a",
  card: "#131324",
  cardAlt: "#13131f",
  border: "#1e1e3a",
  accent: "#7c6ff7",
  accent2: "#a78bfa",
  accentHover: "#8b7eff",
  accentHoverSoft: "#bba4ff",
  text: "#ffffff",
  textBase: "#f8f8f8",
  muted: "#9ca3af",
  low: "#6b7280",
  red: "#ef4444",
  amber: "#f59e0b",
  green: "#22c55e",
};

function generateDemoData() {
  const firstNames = ["Amara", "Rohan", "Zoe", "Kian", "Priya", "Leo", "Nadia", "Theo", "Mira", "Sam", "Ines", "Dev", "Oli", "Yuki", "Faye", "Tobi", "Cleo", "Max", "Ada", "Ravi", "Nora", "Kai", "Elin", "Marco"];
  const lastNames = ["Okoro", "Sharma", "Bennett", "Novak", "Iyer", "Wren", "Petrov", "Adeyemi", "Costa", "Blake", "Marsh", "Patel", "Reyes", "Sato", "Lund", "Duke", "Ferro", "Grant", "Voss", "Kumar"];
  const now = Date.now();
  const users = Array.from({ length: 26 }).map((_, i) => {
    const fn = firstNames[i % firstNames.length];
    const ln = lastNames[(i * 3) % lastNames.length];
    const daysAgo = Math.floor(Math.random() * 75);
    return {
      id: `demo-u-${i}`,
      full_name: `${fn} ${ln}`,
      email: `${fn.toLowerCase()}.${ln.toLowerCase()}@example.com`,
      role: i < 3 ? "admin" : "user",
      created_at: new Date(now - daysAgo * 86400000).toISOString(),
    };
  });
  const noteTitles = ["Sprint retro notes", "Grocery list", "Book recs from Sam", "Q3 roadmap draft", "Trip itinerary - Lisbon", "Recipe: miso ramen", "Interview questions", "Reading list 2026", "Apartment hunting", "Workout plan", "Garden layout ideas", "Client call follow-up", "Birthday gift ideas", "Design system audit", "Podcast episode ideas"];
  const notes = Array.from({ length: 18 }).map((_, i) => {
    const owner = users[(i * 5) % users.length];
    const daysAgo = Math.floor(Math.random() * 40);
    return {
      id: `demo-n-${i}`,
      title: noteTitles[i % noteTitles.length],
      owner_name: owner.full_name,
      owner_email: owner.email,
      created_at: new Date(now - daysAgo * 86400000).toISOString(),
    };
  });
  return { users, notes };
}

function generateDemoAuditLog(users) {
  const admin = users.find((u) => u.role === "admin") || users[0];
  const now = Date.now();
  return Array.from({ length: 6 }).map((_, i) => {
    const target = users[(i * 4 + 1) % users.length];
    const goingAdmin = i % 2 === 0;
    return {
      id: `demo-a-${i}`,
      action: "role_change",
      performed_by_name: admin?.full_name || "Admin",
      performed_by_email: admin?.email,
      target_user_name: target.full_name,
      target_user_email: target.email,
      previous_role: goingAdmin ? "user" : "admin",
      new_role: goingAdmin ? "admin" : "user",
      created_at: new Date(now - (i + 1) * 5 * 3600000).toISOString(),
    };
  });
}

function exportToCSV(filename, rows, columns) {
  const escape = (val) => {
    const s = val == null ? "" : String(val);
    if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
    return s;
  };
  const header = columns.map((c) => escape(c.label)).join(",");
  const lines = rows.map((row) => columns.map((c) => escape(c.value(row))).join(","));
  const csv = [header, ...lines].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

function formatRelativeTime(dateStr) {
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const min = Math.floor(diffMs / 60000);
  if (min < 1) return "just now";
  if (min < 60) return `${min}m ago`;
  const hrs = Math.floor(min / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return formatDate(dateStr);
}

function buildGrowthSeries(users, notes, weeks = 8) {
  const buckets = [];
  const now = new Date();
  for (let i = weeks - 1; i >= 0; i--) {
    const end = new Date(now.getTime() - i * 7 * 86400000);
    const start = new Date(end.getTime() - 7 * 86400000);
    buckets.push({
      label: end.toLocaleDateString(undefined, { month: "short", day: "numeric" }),
      start, end,
      users: 0, notes: 0,
    });
  }
  users.forEach((u) => {
    const t = new Date(u.created_at).getTime();
    const b = buckets.find((b) => t >= b.start.getTime() && t < b.end.getTime());
    if (b) b.users += 1;
  });
  notes.forEach((n) => {
    const t = new Date(n.created_at).getTime();
    const b = buckets.find((b) => t >= b.start.getTime() && t < b.end.getTime());
    if (b) b.notes += 1;
  });
  return buckets.map(({ label, users, notes }) => ({ label, users, notes }));
}

function SkeletonBlock({ w = "100%", h = 14, radius = 6 }) {
  return <div className="skeleton" style={{ width: w, height: h, borderRadius: radius }} />;
}

function Toast({ toast, onClose }) {
  return (
    <div className={`toast toast-${toast.type}`}>
      {toast.type === "error" ? <AlertCircle size={16} /> : <Check size={16} />}
      <span>{toast.message}</span>
      <button className="toast-close" onClick={() => onClose(toast.id)}><X size={14} /></button>
    </div>
  );
}

function ConfirmModal({ modal, onCancel }) {
  if (!modal) return null;
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-icon"><AlertCircle size={22} color={tokens.red} /></div>
        <h3 className="modal-title">{modal.title}</h3>
        <p className="modal-message">{modal.message}</p>
        <div className="modal-actions">
          <button className="btn btn-ghost" onClick={onCancel}>Cancel</button>
          <button className="btn btn-danger" onClick={modal.onConfirm}>{modal.confirmLabel || "Delete"}</button>
        </div>
      </div>
    </div>
  );
}

function SortHeader({ label, sortKey, sort, onSort }) {
  const active = sort.key === sortKey;
  return (
    <th className="th sortable" onClick={() => onSort(sortKey)}>
      <span className="th-inner">
        {label}
        {active ? (sort.dir === "asc" ? <ChevronUp size={12} /> : <ChevronDown size={12} />) : <ChevronsUpDown size={12} className="th-sort-idle" />}
      </span>
    </th>
  );
}

function RoleBadge({ role, editing, onStartEdit, onChange, disabled }) {
  if (editing) {
    return (
      <select
        autoFocus
        className="role-select"
        value={role}
        onChange={(e) => onChange(e.target.value)}
        onClick={(e) => e.stopPropagation()}
        onBlur={() => onChange(null)}
      >
        <option value="user">user</option>
        <option value="admin">admin</option>
      </select>
    );
  }
  return (
    <span
      className={`role-badge ${role === "admin" ? "role-admin" : "role-user"}`}
      style={disabled ? { cursor: "default", opacity: 0.7 } : undefined}
      onClick={(e) => { e.stopPropagation(); if (!disabled) onStartEdit(); }}
      title={disabled ? "You can't change your own role" : "Click to change role"}
    >
      {role}{disabled ? " (you)" : ""}
    </span>
  );
}

function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview"); // overview | users | notes
  const [stats, setStats] = useState({ totalUsers: 0, totalNotes: 0, newUsersThisWeek: 0 });
  const [users, setUsers] = useState([]);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [demoMode, setDemoMode] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [confirmModal, setConfirmModal] = useState(null);

  const [userSearch, setUserSearch] = useState("");
  const [noteSearch, setNoteSearch] = useState("");
  const [userSort, setUserSort] = useState({ key: "created_at", dir: "desc" });
  const [noteSort, setNoteSort] = useState({ key: "created_at", dir: "desc" });
  const [userPage, setUserPage] = useState(1);
  const [notePage, setNotePage] = useState(1);
  const [selectedUserIds, setSelectedUserIds] = useState(new Set());
  const [selectedNoteIds, setSelectedNoteIds] = useState(new Set());
  const [editingRoleId, setEditingRoleId] = useState(null);
  const [detailUser, setDetailUser] = useState(null);
  const [detailNote, setDetailNote] = useState(null);
  const [auditLog, setAuditLog] = useState([]);
  const [auditLoading, setAuditLoading] = useState(false);
  const [auditLoaded, setAuditLoaded] = useState(false);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const authHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const showToast = useCallback((type, message) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((t) => [...t, { id, type, message }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3500);
  }, []);

  // Guard: kick non-admins out immediately
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    if (user.role !== "admin") {
      navigate("/dashboard");
      return;
    }
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError("");
    try {
      const [statsRes, usersRes, notesRes] = await Promise.all([
        fetch(`${API_BASE}/stats`, { headers: authHeaders }),
        fetch(`${API_BASE}/users`, { headers: authHeaders }),
        fetch(`${API_BASE}/notes`, { headers: authHeaders }),
      ]);
      if (!statsRes.ok || !usersRes.ok || !notesRes.ok) throw new Error("Failed to load admin data");
      const [statsData, usersData, notesData] = await Promise.all([statsRes.json(), usersRes.json(), notesRes.json()]);
      setStats(statsData);
      setUsers(usersData);
      setNotes(notesData);
      setDemoMode(false);
    } catch (err) {
      if (DEMO_MODE_FALLBACK) {
        const demo = generateDemoData();
        setUsers(demo.users);
        setNotes(demo.notes);
        setStats({
          totalUsers: demo.users.length,
          totalNotes: demo.notes.length,
          newUsersThisWeek: demo.users.filter((u) => Date.now() - new Date(u.created_at).getTime() < 7 * 86400000).length,
        });
        setDemoMode(true);
        setError("");
      } else {
        setError(err.message || "Something went wrong loading the admin dashboard.");
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchAuditLog = useCallback(async () => {
    setAuditLoading(true);
    try {
      if (demoMode) {
        setAuditLog(generateDemoAuditLog(users));
      } else {
        const res = await fetch(`${API_BASE}/audit-log`, { headers: authHeaders });
        if (!res.ok) throw new Error("Failed to load audit log");
        setAuditLog(await res.json());
      }
      setAuditLoaded(true);
    } catch (err) {
      showToast("error", err.message || "Failed to load audit log");
    } finally {
      setAuditLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [demoMode, users]);

  useEffect(() => {
    if (activeTab === "audit" && !auditLoaded && !loading) {
      fetchAuditLog();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, loading]);

  // ---- Users: derived data ----
  const filteredSortedUsers = useMemo(() => {
    let list = users.filter((u) => {
      const q = userSearch.trim().toLowerCase();
      if (!q) return true;
      return (u.full_name || "").toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
    });
    const { key, dir } = userSort;
    list = [...list].sort((a, b) => {
      let av = a[key] ?? "", bv = b[key] ?? "";
      if (key === "created_at") { av = new Date(av).getTime(); bv = new Date(bv).getTime(); }
      else { av = String(av).toLowerCase(); bv = String(bv).toLowerCase(); }
      if (av < bv) return dir === "asc" ? -1 : 1;
      if (av > bv) return dir === "asc" ? 1 : -1;
      return 0;
    });
    return list;
  }, [users, userSearch, userSort]);

  const userTotalPages = Math.max(1, Math.ceil(filteredSortedUsers.length / PAGE_SIZE));
  const paginatedUsers = filteredSortedUsers.slice((userPage - 1) * PAGE_SIZE, userPage * PAGE_SIZE);

  // ---- Notes: derived data ----
  const filteredSortedNotes = useMemo(() => {
    let list = notes.filter((n) => {
      const q = noteSearch.trim().toLowerCase();
      if (!q) return true;
      return n.title.toLowerCase().includes(q) || (n.owner_name || n.owner_email || "").toLowerCase().includes(q);
    });
    const { key, dir } = noteSort;
    list = [...list].sort((a, b) => {
      let av = a[key] ?? "", bv = b[key] ?? "";
      if (key === "created_at") { av = new Date(av).getTime(); bv = new Date(bv).getTime(); }
      else { av = String(av).toLowerCase(); bv = String(bv).toLowerCase(); }
      if (av < bv) return dir === "asc" ? -1 : 1;
      if (av > bv) return dir === "asc" ? 1 : -1;
      return 0;
    });
    return list;
  }, [notes, noteSearch, noteSort]);

  const noteTotalPages = Math.max(1, Math.ceil(filteredSortedNotes.length / PAGE_SIZE));
  const paginatedNotes = filteredSortedNotes.slice((notePage - 1) * PAGE_SIZE, notePage * PAGE_SIZE);

  // ---- Charts ----
  const growthData = useMemo(() => buildGrowthSeries(users, notes), [users, notes]);
  const roleData = useMemo(() => {
    const admins = users.filter((u) => u.role === "admin").length;
    return [
      { name: "Admins", value: admins },
      { name: "Users", value: Math.max(users.length - admins, 0) },
    ];
  }, [users]);

  const activityFeed = useMemo(() => {
    const items = [
      ...users.map((u) => ({ id: `u-${u.id}`, type: "user", label: `${u.full_name || u.email} joined`, at: u.created_at })),
      ...notes.map((n) => ({ id: `n-${n.id}`, type: "note", label: `${n.owner_name || n.owner_email} created "${n.title}"`, at: n.created_at })),
    ];
    return items.sort((a, b) => new Date(b.at) - new Date(a.at)).slice(0, 8);
  }, [users, notes]);

  // ---- Actions ----
  const handleSort = (table, key) => {
    const setSort = table === "users" ? setUserSort : setNoteSort;
    setSort((prev) => (prev.key === key ? { key, dir: prev.dir === "asc" ? "desc" : "asc" } : { key, dir: "asc" }));
  };

  const deleteUser = (id) => {
    setConfirmModal({
      title: "Delete this user?",
      message: "This removes the user and all of their notes. This can't be undone.",
      confirmLabel: "Delete user",
      onConfirm: async () => {
        setConfirmModal(null);
        try {
          if (!demoMode) {
            const res = await fetch(`${API_BASE}/users/${id}`, { method: "DELETE", headers: authHeaders });
            if (!res.ok) throw new Error("Failed to delete user");
          }
          setUsers((u) => u.filter((x) => x.id !== id));
          setSelectedUserIds((s) => { const n = new Set(s); n.delete(id); return n; });
          showToast("success", "User deleted");
        } catch (err) {
          showToast("error", err.message || "Failed to delete user");
        }
      },
    });
  };

  const deleteNote = (id) => {
    setConfirmModal({
      title: "Delete this note?",
      message: "This permanently removes the note.",
      confirmLabel: "Delete note",
      onConfirm: async () => {
        setConfirmModal(null);
        try {
          if (!demoMode) {
            const res = await fetch(`${API_BASE}/notes/${id}`, { method: "DELETE", headers: authHeaders });
            if (!res.ok) throw new Error("Failed to delete note");
          }
          setNotes((n) => n.filter((x) => x.id !== id));
          setSelectedNoteIds((s) => { const n = new Set(s); n.delete(id); return n; });
          showToast("success", "Note deleted");
        } catch (err) {
          showToast("error", err.message || "Failed to delete note");
        }
      },
    });
  };

  const bulkDeleteUsers = () => {
    const selfId = users.find((u) => user?.email && u.email === user.email)?.id;
    const ids = [...selectedUserIds].filter((id) => id !== selfId);
    if (!ids.length) return;
    setConfirmModal({
      title: `Delete ${ids.length} user${ids.length > 1 ? "s" : ""}?`,
      message: "This removes each selected user and all of their notes. This can't be undone.",
      confirmLabel: "Delete selected",
      onConfirm: async () => {
        setConfirmModal(null);
        try {
          if (!demoMode) {
            await Promise.all(ids.map((id) => fetch(`${API_BASE}/users/${id}`, { method: "DELETE", headers: authHeaders })));
          }
          setUsers((u) => u.filter((x) => !ids.includes(x.id)));
          setSelectedUserIds(new Set());
          showToast("success", `${ids.length} user${ids.length > 1 ? "s" : ""} deleted`);
        } catch (err) {
          showToast("error", "Some users could not be deleted");
        }
      },
    });
  };

  const bulkDeleteNotes = () => {
    const ids = [...selectedNoteIds];
    if (!ids.length) return;
    setConfirmModal({
      title: `Delete ${ids.length} note${ids.length > 1 ? "s" : ""}?`,
      message: "This permanently removes the selected notes.",
      confirmLabel: "Delete selected",
      onConfirm: async () => {
        setConfirmModal(null);
        try {
          if (!demoMode) {
            await Promise.all(ids.map((id) => fetch(`${API_BASE}/notes/${id}`, { method: "DELETE", headers: authHeaders })));
          }
          setNotes((n) => n.filter((x) => !ids.includes(x.id)));
          setSelectedNoteIds(new Set());
          showToast("success", `${ids.length} note${ids.length > 1 ? "s" : ""} deleted`);
        } catch (err) {
          showToast("error", "Some notes could not be deleted");
        }
      },
    });
  };

  const updateUserRole = async (id, role) => {
    setEditingRoleId(null);
    if (role == null) return;
    const prevUsers = users;
    setUsers((u) => u.map((x) => (x.id === id ? { ...x, role } : x)));
    try {
      if (!demoMode) {
        const res = await fetch(`${API_BASE}/users/${id}`, {
          method: "PATCH",
          headers: authHeaders,
          body: JSON.stringify({ role }),
        });
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body.error || "Failed to update role");
        }
      }
      showToast("success", "Role updated");
      setAuditLoaded(false);
    } catch (err) {
      setUsers(prevUsers);
      showToast("error", err.message || "Failed to update role");
    }
  };

  const bulkUpdateRole = async (role) => {
    const selfId = users.find((u) => user?.email && u.email === user.email)?.id;
    const ids = [...selectedUserIds].filter((id) => id !== selfId);
    if (!ids.length) return;
    const prevUsers = users;
    setUsers((u) => u.map((x) => (ids.includes(x.id) ? { ...x, role } : x)));
    try {
      if (!demoMode) {
        await Promise.all(ids.map((id) => fetch(`${API_BASE}/users/${id}`, {
          method: "PATCH", headers: authHeaders, body: JSON.stringify({ role }),
        })));
      }
      showToast("success", `${ids.length} user${ids.length > 1 ? "s" : ""} set to ${role}`);
      setSelectedUserIds(new Set());
      setAuditLoaded(false);
    } catch (err) {
      setUsers(prevUsers);
      showToast("error", "Some roles could not be updated");
    }
  };

  const toggleSelectUser = (id) => setSelectedUserIds((s) => {
    const n = new Set(s);
    n.has(id) ? n.delete(id) : n.add(id);
    return n;
  });
  const toggleSelectAllUsers = () => {
    const pageIds = paginatedUsers.filter((u) => !(user?.email && u.email === user.email)).map((u) => u.id);
    const allSelected = pageIds.every((id) => selectedUserIds.has(id));
    setSelectedUserIds((s) => {
      const n = new Set(s);
      pageIds.forEach((id) => (allSelected ? n.delete(id) : n.add(id)));
      return n;
    });
  };

  const toggleSelectNote = (id) => setSelectedNoteIds((s) => {
    const n = new Set(s);
    n.has(id) ? n.delete(id) : n.add(id);
    return n;
  });
  const toggleSelectAllNotes = () => {
    const pageIds = paginatedNotes.map((n) => n.id);
    const allSelected = pageIds.every((id) => selectedNoteIds.has(id));
    setSelectedNoteIds((s) => {
      const n = new Set(s);
      pageIds.forEach((id) => (allSelected ? n.delete(id) : n.add(id)));
      return n;
    });
  };

  const exportUsersCSV = () => {
    exportToCSV(`notenest-users-${new Date().toISOString().slice(0, 10)}.csv`, filteredSortedUsers, [
      { label: "Name", value: (u) => u.full_name || "" },
      { label: "Email", value: (u) => u.email },
      { label: "Role", value: (u) => u.role },
      { label: "Joined", value: (u) => formatDate(u.created_at) },
    ]);
    showToast("success", `Exported ${filteredSortedUsers.length} user${filteredSortedUsers.length === 1 ? "" : "s"}`);
  };

  const exportNotesCSV = () => {
    exportToCSV(`notenest-notes-${new Date().toISOString().slice(0, 10)}.csv`, filteredSortedNotes, [
      { label: "Title", value: (n) => n.title },
      { label: "Owner", value: (n) => n.owner_name || n.owner_email || "" },
      { label: "Created", value: (n) => formatDate(n.created_at) },
    ]);
    showToast("success", `Exported ${filteredSortedNotes.length} note${filteredSortedNotes.length === 1 ? "" : "s"}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const userNotesFor = (u) => (u ? notes.filter((n) => n.owner_email === u.email) : []);

  return (
    <div className="admin-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; }
        .admin-root { font-family: 'Outfit', sans-serif; }
        .admin-root :focus-visible { outline: 2px solid ${tokens.accent2}; outline-offset: 2px; }

        @keyframes pulseDot { 0%,100% { opacity:1; transform:scale(1);} 50% { opacity:.55; transform:scale(1.35);} }
        @keyframes shimmer { 0% { background-position: -400px 0; } 100% { background-position: 400px 0; } }
        @keyframes fadeIn { from { opacity:0; transform: translateY(6px);} to { opacity:1; transform:translateY(0);} }
        @keyframes slideIn { from { transform: translateX(100%);} to { transform: translateX(0);} }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes toastIn { from { opacity:0; transform: translateY(-8px);} to { opacity:1; transform:translateY(0);} }

        .skeleton { background: linear-gradient(90deg, ${tokens.cardAlt} 0%, #1c1c38 50%, ${tokens.cardAlt} 100%); background-size: 800px 100%; animation: shimmer 1.4s infinite linear; }

        .page-container { display:flex; width:100%; min-height:100vh; background:${tokens.bg}; color:${tokens.textBase}; }
        .sidebar { width:240px; background:${tokens.cardAlt}; border-right:1px solid ${tokens.border}; display:flex; flex-direction:column; padding:24px 16px; flex-shrink:0; }
        .logo-row { display:flex; align-items:center; gap:10px; padding:0 8px; }
        .logo-badge { background: linear-gradient(135deg, ${tokens.accent}, ${tokens.accent2}); border-radius:8px; padding:6px 9px; font-size:14px; font-weight:900; color:#fff; }
        .logo-text { font-weight:700; font-size:17px; color:#fff; }
        .admin-tag { display:flex; align-items:center; gap:6px; font-size:11px; font-weight:600; color:${tokens.accent2}; background:rgba(124,111,247,0.13); padding:5px 10px; border-radius:6px; margin:14px 8px 22px 8px; width:fit-content; }
        .demo-tag { display:flex; align-items:center; gap:6px; font-size:10px; font-weight:600; color:${tokens.amber}; background:rgba(245,158,11,0.12); padding:4px 9px; border-radius:6px; margin:0 8px 14px 8px; width:fit-content; }

        .nav-list { display:flex; flex-direction:column; gap:4px; flex:1; }
        .nav-item { display:flex; align-items:center; gap:10px; padding:11px 12px; border-radius:8px; cursor:pointer; color:${tokens.muted}; font-size:14px; font-weight:500; transition: background .15s ease, color .15s ease; }
        .nav-item:hover { background:rgba(124,111,247,0.08); color:#fff; }
        .nav-item.active { background: linear-gradient(135deg, ${tokens.accent}, ${tokens.accent2}); color:#fff; box-shadow:0 0 20px rgba(124,111,247,0.25); }
        .nav-badge { margin-left:auto; background:rgba(255,255,255,0.18); border-radius:10px; padding:1px 8px; font-size:12px; font-weight:600; }

        .sidebar-footer { padding:14px 8px 0 8px; border-top:1px solid ${tokens.border}; margin-top:12px; }
        .logout-btn { width:100%; display:flex; align-items:center; justify-content:center; gap:8px; background: linear-gradient(135deg, ${tokens.accent}, ${tokens.accent2}); color:#fff; border:none; padding:11px 16px; border-radius:8px; cursor:pointer; font-size:14px; font-weight:600; font-family:inherit; transition: box-shadow .15s ease, transform .1s ease; }
        .logout-btn:hover { box-shadow:0 0 25px rgba(124,111,247,0.4); }
        .logout-btn:active { transform: scale(0.98); }

        .main { flex:1; padding:28px 36px; overflow-y:auto; min-width:0; }
        .main-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:24px; gap:16px; flex-wrap:wrap; }
        .page-title { font-size:22px; font-weight:700; color:#fff; margin:0; }
        .live-chip { display:flex; align-items:center; gap:7px; font-size:12px; color:${tokens.muted}; }
        .live-dot { width:8px; height:8px; border-radius:50%; background:${tokens.green}; animation:pulseDot 1.6s infinite ease-in-out; }

        .error-alert { display:flex; align-items:center; gap:8px; background:rgba(239,68,68,0.1); border:1px solid ${tokens.red}; border-radius:8px; padding:10px 14px; color:${tokens.red}; font-size:13px; margin-bottom:20px; }

        .stats-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; margin-bottom:24px; }
        .stat-card { background:${tokens.card}; border:1px solid ${tokens.border}; border-radius:12px; padding:18px; display:flex; flex-direction:column; gap:6px; position:relative; overflow:hidden; transition: border-color .15s ease, transform .15s ease; animation: fadeIn .4s ease both; }
        .stat-card:hover { border-color:${tokens.accent}; transform:translateY(-2px); }
        .stat-top { display:flex; align-items:center; justify-content:space-between; }
        .stat-value { font-size:26px; font-weight:700; color:#fff; }
        .stat-label { font-size:12px; color:${tokens.low}; }
        .stat-spark { position:absolute; bottom:0; left:0; right:0; height:34px; opacity:.85; }

        .grid-2 { display:grid; grid-template-columns:2fr 1fr; gap:16px; margin-bottom:16px; align-items:stretch; }
        .card { background:${tokens.card}; border:1px solid ${tokens.border}; border-radius:12px; padding:18px; animation: fadeIn .4s ease both; }
        .card-title { font-size:14px; font-weight:600; color:#fff; margin:0 0 14px 0; display:flex; align-items:center; gap:8px; }

        .pulse-panel { border-radius:12px; padding:1px; background: linear-gradient(#1a1a3e, #13131f) padding-box, linear-gradient(135deg, ${tokens.accent}, ${tokens.accent2}, ${tokens.accent}) border-box; border:1px solid transparent; animation: fadeIn .4s ease both; }
        .pulse-panel-inner { background:${tokens.cardAlt}; border-radius:11px; padding:18px; }
        .pulse-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:14px; }
        .pulse-title { font-size:14px; font-weight:600; color:#fff; display:flex; align-items:center; gap:8px; margin:0; }
        .feed-list { display:flex; flex-direction:column; gap:2px; max-height:280px; overflow-y:auto; }
        .feed-item { display:flex; align-items:flex-start; gap:10px; padding:9px 4px; border-bottom:1px solid ${tokens.border}; font-size:13px; }
        .feed-item:last-child { border-bottom:none; }
        .feed-icon { width:26px; height:26px; border-radius:7px; display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-top:1px; }
        .feed-icon.user { background:rgba(124,111,247,0.15); color:${tokens.accent2}; }
        .feed-icon.note { background:rgba(34,197,94,0.12); color:${tokens.green}; }
        .feed-label { color:${tokens.textBase}; }
        .feed-time { color:${tokens.low}; font-size:11px; white-space:nowrap; margin-left:auto; padding-left:10px; }

        .toolbar { display:flex; align-items:center; gap:10px; margin-bottom:14px; flex-wrap:wrap; }
        .search-box { display:flex; align-items:center; gap:8px; background:${tokens.cardAlt}; border:1px solid ${tokens.border}; border-radius:8px; padding:9px 12px; flex:1; min-width:200px; max-width:320px; transition:border-color .15s ease; }
        .search-box:focus-within { border-color:${tokens.accent}; }
        .search-box input { background:transparent; border:none; outline:none; color:#fff; font-size:13px; font-family:inherit; width:100%; }
        .search-box input::placeholder { color:${tokens.low}; }

        .bulk-bar { display:flex; align-items:center; gap:10px; background:rgba(124,111,247,0.1); border:1px solid ${tokens.accent}; border-radius:8px; padding:9px 14px; margin-bottom:12px; font-size:13px; color:${tokens.textBase}; animation: fadeIn .2s ease both; flex-wrap:wrap; }
        .bulk-bar strong { color:#fff; }
        .bulk-actions { display:flex; gap:8px; margin-left:auto; }

        .btn { border:none; border-radius:7px; padding:8px 14px; font-size:13px; font-weight:600; cursor:pointer; font-family:inherit; transition: filter .15s ease, transform .1s ease; }
        .btn:active { transform: scale(0.97); }
        .btn-primary { background: linear-gradient(135deg, ${tokens.accent}, ${tokens.accent2}); color:#fff; }
        .btn-primary:hover { filter:brightness(1.08); }
        .btn-ghost { background:${tokens.cardAlt}; color:${tokens.muted}; border:1px solid ${tokens.border}; }
        .btn-ghost:hover { color:#fff; border-color:${tokens.accent}; }
        .btn-danger { background:${tokens.red}; color:#fff; }
        .btn-danger:hover { filter:brightness(1.1); }
        .btn-sm { padding:6px 11px; font-size:12px; }

        .table-card { background:${tokens.card}; border:1px solid ${tokens.border}; border-radius:12px; overflow:hidden; }
        .table-scroll { overflow-x:auto; }
        table.table { width:100%; border-collapse:collapse; min-width:640px; }
        .th { text-align:left; padding:13px 16px; font-size:11px; color:${tokens.low}; border-bottom:1px solid ${tokens.border}; text-transform:uppercase; letter-spacing:.03em; user-select:none; white-space:nowrap; }
        .th.sortable { cursor:pointer; }
        .th-inner { display:inline-flex; align-items:center; gap:5px; }
        .th-sort-idle { opacity:.4; }
        .tr { border-bottom:1px solid ${tokens.border}; cursor:pointer; transition:background .12s ease; }
        .tr:hover { background:rgba(124,111,247,0.06); }
        .td { padding:13px 16px; font-size:13px; color:#fff; }
        .checkbox-cell { width:38px; }
        .checkbox { width:15px; height:15px; accent-color:${tokens.accent}; cursor:pointer; }

        .role-badge { padding:3px 10px; border-radius:6px; font-size:12px; font-weight:600; cursor:pointer; display:inline-block; transition: filter .15s ease; }
        .role-badge:hover { filter:brightness(1.2); }
        .role-admin { background:rgba(124,111,247,0.2); color:${tokens.accent2}; }
        .role-user { background:${tokens.cardAlt}; color:${tokens.muted}; }
        .role-select { background:${tokens.cardAlt}; color:#fff; border:1px solid ${tokens.accent}; border-radius:6px; font-size:12px; padding:3px 6px; font-family:inherit; }

        .icon-btn { background:none; border:none; cursor:pointer; padding:6px; border-radius:6px; display:inline-flex; transition:background .12s ease; }
        .icon-btn:hover { background:rgba(239,68,68,0.12); }

        .empty-state { color:${tokens.low}; font-size:14px; text-align:center; padding:44px 0; }

        .pagination { display:flex; align-items:center; justify-content:space-between; padding:12px 16px; border-top:1px solid ${tokens.border}; font-size:12px; color:${tokens.low}; }
        .pagination-controls { display:flex; align-items:center; gap:6px; }
        .page-btn { background:${tokens.cardAlt}; border:1px solid ${tokens.border}; color:${tokens.muted}; border-radius:6px; padding:5px 8px; cursor:pointer; display:flex; align-items:center; }
        .page-btn:hover:not(:disabled) { color:#fff; border-color:${tokens.accent}; }
        .page-btn:disabled { opacity:.4; cursor:not-allowed; }

        .toast-stack { position:fixed; top:20px; right:20px; display:flex; flex-direction:column; gap:8px; z-index:200; }
        .toast { display:flex; align-items:center; gap:8px; padding:11px 14px; border-radius:8px; font-size:13px; color:#fff; min-width:220px; box-shadow:0 10px 30px rgba(0,0,0,0.4); animation: toastIn .2s ease both; }
        .toast-success { background:#153a24; border:1px solid ${tokens.green}; }
        .toast-error { background:#3a1515; border:1px solid ${tokens.red}; }
        .toast-close { margin-left:auto; background:none; border:none; color:inherit; opacity:.7; cursor:pointer; display:flex; }
        .toast-close:hover { opacity:1; }

        .modal-overlay { position:fixed; inset:0; background:rgba(0,0,0,0.55); display:flex; align-items:center; justify-content:center; z-index:300; animation: fadeIn .15s ease both; }
        .modal-card { background:${tokens.card}; border:1px solid ${tokens.border}; border-radius:14px; padding:26px; width:340px; text-align:center; }
        .modal-icon { width:44px; height:44px; border-radius:50%; background:rgba(239,68,68,0.12); display:flex; align-items:center; justify-content:center; margin:0 auto 14px auto; }
        .modal-title { font-size:16px; font-weight:700; color:#fff; margin:0 0 8px 0; }
        .modal-message { font-size:13px; color:${tokens.muted}; margin:0 0 20px 0; line-height:1.5; }
        .modal-actions { display:flex; gap:10px; justify-content:center; }

        .slideover-overlay { position:fixed; inset:0; background:rgba(0,0,0,0.45); z-index:250; }
        .slideover { position:fixed; top:0; right:0; bottom:0; width:380px; max-width:92vw; background:${tokens.cardAlt}; border-left:1px solid ${tokens.border}; z-index:260; padding:26px; overflow-y:auto; animation: slideIn .2s ease both; }
        .slideover-close { position:absolute; top:20px; right:20px; background:${tokens.card}; border:1px solid ${tokens.border}; border-radius:7px; padding:7px; cursor:pointer; color:${tokens.muted}; }
        .slideover-close:hover { color:#fff; }
        .avatar-lg { width:56px; height:56px; border-radius:14px; background: linear-gradient(135deg, ${tokens.accent}, ${tokens.accent2}); display:flex; align-items:center; justify-content:center; color:#fff; font-weight:700; font-size:20px; margin-bottom:14px; }
        .detail-row { display:flex; align-items:center; gap:8px; font-size:13px; color:${tokens.muted}; margin-bottom:8px; }
        .detail-name { font-size:18px; font-weight:700; color:#fff; margin-bottom:2px; }
        .detail-section-title { font-size:12px; text-transform:uppercase; letter-spacing:.03em; color:${tokens.low}; margin:22px 0 10px 0; }
        .detail-note-item { padding:10px 12px; background:${tokens.card}; border:1px solid ${tokens.border}; border-radius:8px; margin-bottom:8px; font-size:13px; }

        .spin { animation: spin 0.8s linear infinite; }

        @media (max-width: 860px) {
          .page-container { flex-direction:column; }
          .sidebar { width:100%; flex-direction:row; align-items:center; padding:14px 16px; overflow-x:auto; }
          .logo-row { flex-shrink:0; }
          .admin-tag, .demo-tag { margin:0 0 0 12px; }
          .nav-list { flex-direction:row; flex:none; margin-left:12px; }
          .sidebar-footer { border-top:none; border-left:1px solid ${tokens.border}; margin:0 0 0 12px; padding:0 0 0 14px; }
          .logout-btn { width:auto; padding:9px 14px; }
          .grid-2 { grid-template-columns:1fr; }
          .stats-grid { grid-template-columns:1fr 1fr; }
          .main { padding:20px; }
        }
      `}</style>

      <div className="page-container">
        <aside className="sidebar">
          <div className="logo-row">
            <span className="logo-badge">NN</span>
            <span className="logo-text">NoteNest</span>
          </div>
          <div className="admin-tag"><Shield size={14} /> Admin Panel</div>
          {demoMode && <div className="demo-tag">Demo data — API unreachable</div>}

          <nav className="nav-list">
            <div className={`nav-item ${activeTab === "overview" ? "active" : ""}`} onClick={() => setActiveTab("overview")}>
              <Activity size={16} /> Overview
            </div>
            <div className={`nav-item ${activeTab === "users" ? "active" : ""}`} onClick={() => setActiveTab("users")}>
              <Users size={16} /> Users <span className="nav-badge">{stats.totalUsers}</span>
            </div>
            <div className={`nav-item ${activeTab === "notes" ? "active" : ""}`} onClick={() => setActiveTab("notes")}>
              <FileText size={16} /> All Notes <span className="nav-badge">{stats.totalNotes}</span>
            </div>
            <div className={`nav-item ${activeTab === "audit" ? "active" : ""}`} onClick={() => setActiveTab("audit")}>
              <History size={16} /> Audit Log
            </div>
          </nav>

          <div className="sidebar-footer">
            <button className="logout-btn" onClick={handleLogout}><LogOut size={15} /> Logout</button>
          </div>
        </aside>

        <main className="main">
          <div className="main-header">
            <h1 className="page-title">
              {activeTab === "overview" ? "Admin Overview" : activeTab === "users" ? "Users" : activeTab === "notes" ? "All Notes" : "Audit Log"}
            </h1>
            <div className="live-chip"><span className="live-dot" /> Live</div>
          </div>

          {error && <div className="error-alert"><AlertCircle size={15} /> {error}</div>}

          <div className="stats-grid">
            <StatCard icon={<Users size={20} color={tokens.accent} />} label="Total Users" value={stats.totalUsers} loading={loading} series={growthData} dataKey="users" color={tokens.accent} />
            <StatCard icon={<FileText size={20} color={tokens.accent2} />} label="Total Notes" value={stats.totalNotes} loading={loading} series={growthData} dataKey="notes" color={tokens.accent2} />
            <StatCard icon={<UserPlus size={20} color={tokens.green} />} label="New Users (7d)" value={stats.newUsersThisWeek} loading={loading} series={growthData} dataKey="users" color={tokens.green} />
          </div>

          {loading ? (
            <div className="card"><SkeletonBlock h={220} /></div>
          ) : activeTab === "overview" ? (
            <>
              <div className="grid-2">
                <div className="card">
                  <p className="card-title">Growth, last 8 weeks</p>
                  <ResponsiveContainer width="100%" height={220}>
                    <LineChart data={growthData} margin={{ left: -18, right: 10 }}>
                      <CartesianGrid stroke={tokens.border} strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="label" stroke={tokens.low} fontSize={11} tickLine={false} axisLine={{ stroke: tokens.border }} />
                      <YAxis stroke={tokens.low} fontSize={11} tickLine={false} axisLine={false} allowDecimals={false} />
                      <Tooltip contentStyle={{ background: tokens.cardAlt, border: `1px solid ${tokens.border}`, borderRadius: 8, fontSize: 12 }} labelStyle={{ color: "#fff" }} />
                      <Line type="monotone" dataKey="users" stroke={tokens.accent} strokeWidth={2.5} dot={false} name="Users" />
                      <Line type="monotone" dataKey="notes" stroke={tokens.green} strokeWidth={2.5} dot={false} name="Notes" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="card">
                  <p className="card-title">Role split</p>
                  <ResponsiveContainer width="100%" height={220}>
                    <PieChart>
                      <Pie data={roleData} dataKey="value" nameKey="name" innerRadius={55} outerRadius={78} paddingAngle={3}>
                        <Cell fill={tokens.accent} />
                        <Cell fill={tokens.cardAlt} stroke={tokens.border} />
                      </Pie>
                      <Tooltip contentStyle={{ background: tokens.cardAlt, border: `1px solid ${tokens.border}`, borderRadius: 8, fontSize: 12 }} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div style={{ display: "flex", justifyContent: "center", gap: 16, fontSize: 12, color: tokens.muted, marginTop: -6 }}>
                    <span><span style={{ color: tokens.accent2 }}>●</span> Admins {roleData[0].value}</span>
                    <span><span style={{ color: tokens.muted }}>●</span> Users {roleData[1].value}</span>
                  </div>
                </div>
              </div>

              <div className="pulse-panel">
                <div className="pulse-panel-inner">
                  <div className="pulse-header">
                    <p className="pulse-title"><span className="live-dot" /> Recent activity</p>
                  </div>
                  <div className="feed-list">
                    {activityFeed.length === 0 && <div className="empty-state">Nothing has happened yet.</div>}
                    {activityFeed.map((item) => (
                      <div className="feed-item" key={item.id}>
                        <span className={`feed-icon ${item.type}`}>
                          {item.type === "user" ? <UserPlus size={13} /> : <FileText size={13} />}
                        </span>
                        <span className="feed-label">{item.label}</span>
                        <span className="feed-time">{formatRelativeTime(item.at)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          ) : activeTab === "users" ? (
            <>
              <div className="toolbar">
                <div className="search-box">
                  <Search size={14} color={tokens.low} />
                  <input placeholder="Search name or email…" value={userSearch} onChange={(e) => { setUserSearch(e.target.value); setUserPage(1); }} />
                </div>
                <button className="btn btn-ghost" onClick={exportUsersCSV}><Download size={13} /> Export CSV</button>
              </div>

              {selectedUserIds.size > 0 && (
                <div className="bulk-bar">
                  <strong>{selectedUserIds.size}</strong> selected
                  <div className="bulk-actions">
                    <button className="btn btn-ghost btn-sm" onClick={() => bulkUpdateRole("admin")}>Set as admin</button>
                    <button className="btn btn-ghost btn-sm" onClick={() => bulkUpdateRole("user")}>Set as user</button>
                    <button className="btn btn-danger btn-sm" onClick={bulkDeleteUsers}><Trash2 size={12} /> Delete</button>
                  </div>
                </div>
              )}

              <div className="table-card">
                <div className="table-scroll">
                  <table className="table">
                    <thead>
                      <tr>
                        <th className="th checkbox-cell">
                          <input type="checkbox" className="checkbox" checked={paginatedUsers.filter((u) => !(user?.email && u.email === user.email)).length > 0 && paginatedUsers.filter((u) => !(user?.email && u.email === user.email)).every((u) => selectedUserIds.has(u.id))} onChange={toggleSelectAllUsers} />
                        </th>
                        <SortHeader label="Name" sortKey="full_name" sort={userSort} onSort={(k) => handleSort("users", k)} />
                        <SortHeader label="Email" sortKey="email" sort={userSort} onSort={(k) => handleSort("users", k)} />
                        <SortHeader label="Role" sortKey="role" sort={userSort} onSort={(k) => handleSort("users", k)} />
                        <SortHeader label="Joined" sortKey="created_at" sort={userSort} onSort={(k) => handleSort("users", k)} />
                        <th className="th"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedUsers.map((u) => (
                        <tr className="tr" key={u.id} onClick={() => setDetailUser(u)}>
                          <td className="td checkbox-cell" onClick={(e) => e.stopPropagation()}>
                            <input
                              type="checkbox"
                              className="checkbox"
                              checked={selectedUserIds.has(u.id)}
                              onChange={() => toggleSelectUser(u.id)}
                              disabled={user?.email && u.email === user.email}
                              title={user?.email && u.email === user.email ? "You can't bulk-edit your own account" : undefined}
                            />
                          </td>
                          <td className="td">{u.full_name || "—"}</td>
                          <td className="td">{u.email}</td>
                          <td className="td">
                            <RoleBadge
                              role={u.role}
                              editing={editingRoleId === u.id}
                              onStartEdit={() => setEditingRoleId(u.id)}
                              onChange={(role) => updateUserRole(u.id, role)}
                              disabled={user?.email && u.email === user.email}
                            />
                          </td>
                          <td className="td">{formatDate(u.created_at)}</td>
                          <td className="td" onClick={(e) => e.stopPropagation()}>
                            <button className="icon-btn" onClick={() => deleteUser(u.id)}><Trash2 size={14} color={tokens.red} /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {paginatedUsers.length === 0 && <div className="empty-state">No users match your search.</div>}
                <Pagination page={userPage} totalPages={userTotalPages} total={filteredSortedUsers.length} onChange={setUserPage} />
              </div>
            </>
          ) : activeTab === "notes" ? (
            <>
              <div className="toolbar">
                <div className="search-box">
                  <Search size={14} color={tokens.low} />
                  <input placeholder="Search title or owner…" value={noteSearch} onChange={(e) => { setNoteSearch(e.target.value); setNotePage(1); }} />
                </div>
                <button className="btn btn-ghost" onClick={exportNotesCSV}><Download size={13} /> Export CSV</button>
              </div>

              {selectedNoteIds.size > 0 && (
                <div className="bulk-bar">
                  <strong>{selectedNoteIds.size}</strong> selected
                  <div className="bulk-actions">
                    <button className="btn btn-danger btn-sm" onClick={bulkDeleteNotes}><Trash2 size={12} /> Delete</button>
                  </div>
                </div>
              )}

              <div className="table-card">
                <div className="table-scroll">
                  <table className="table">
                    <thead>
                      <tr>
                        <th className="th checkbox-cell">
                          <input type="checkbox" className="checkbox" checked={paginatedNotes.length > 0 && paginatedNotes.every((n) => selectedNoteIds.has(n.id))} onChange={toggleSelectAllNotes} />
                        </th>
                        <SortHeader label="Title" sortKey="title" sort={noteSort} onSort={(k) => handleSort("notes", k)} />
                        <SortHeader label="Owner" sortKey="owner_name" sort={noteSort} onSort={(k) => handleSort("notes", k)} />
                        <SortHeader label="Created" sortKey="created_at" sort={noteSort} onSort={(k) => handleSort("notes", k)} />
                        <th className="th"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedNotes.map((n) => (
                        <tr className="tr" key={n.id} onClick={() => setDetailNote(n)}>
                          <td className="td checkbox-cell" onClick={(e) => e.stopPropagation()}>
                            <input type="checkbox" className="checkbox" checked={selectedNoteIds.has(n.id)} onChange={() => toggleSelectNote(n.id)} />
                          </td>
                          <td className="td">{n.title}</td>
                          <td className="td">{n.owner_name || n.owner_email}</td>
                          <td className="td">{formatDate(n.created_at)}</td>
                          <td className="td" onClick={(e) => e.stopPropagation()}>
                            <button className="icon-btn" onClick={() => deleteNote(n.id)}><Trash2 size={14} color={tokens.red} /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {paginatedNotes.length === 0 && <div className="empty-state">No notes match your search.</div>}
                <Pagination page={notePage} totalPages={noteTotalPages} total={filteredSortedNotes.length} onChange={setNotePage} />
              </div>
            </>
          ) : (
            <div className="table-card">
              {auditLoading ? (
                <div style={{ padding: 20 }}><SkeletonBlock h={180} /></div>
              ) : (
                <div className="table-scroll">
                  <table className="table">
                    <thead>
                      <tr>
                        <th className="th">When</th>
                        <th className="th">Changed by</th>
                        <th className="th">Target user</th>
                        <th className="th">Change</th>
                      </tr>
                    </thead>
                    <tbody>
                      {auditLog.map((l) => (
                        <tr className="tr" key={l.id} style={{ cursor: "default" }}>
                          <td className="td">{formatRelativeTime(l.created_at)}</td>
                          <td className="td">{l.performed_by_name}</td>
                          <td className="td">{l.target_user_name}</td>
                          <td className="td">
                            <span className={`role-badge ${l.previous_role === "admin" ? "role-admin" : "role-user"}`}>{l.previous_role}</span>
                            {" "}<ArrowRight size={11} style={{ verticalAlign: "middle", color: tokens.low }} />{" "}
                            <span className={`role-badge ${l.new_role === "admin" ? "role-admin" : "role-user"}`}>{l.new_role}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {!auditLoading && auditLog.length === 0 && <div className="empty-state">No role changes yet.</div>}
            </div>
          )}
        </main>
      </div>

      {detailUser && (
        <>
          <div className="slideover-overlay" onClick={() => setDetailUser(null)} />
          <div className="slideover">
            <button className="slideover-close" onClick={() => setDetailUser(null)}><X size={16} /></button>
            <div className="avatar-lg">{(detailUser.full_name || detailUser.email || "?").charAt(0).toUpperCase()}</div>
            <div className="detail-name">{detailUser.full_name || "—"}</div>
            <div className="detail-row"><Mail size={13} /> {detailUser.email}</div>
            <div className="detail-row"><Calendar size={13} /> Joined {formatDate(detailUser.created_at)}</div>
            <div className="detail-row">
              <RoleBadge role={detailUser.role} editing={editingRoleId === `d-${detailUser.id}`} onStartEdit={() => setEditingRoleId(`d-${detailUser.id}`)} onChange={(role) => { if (role) setDetailUser((d) => ({ ...d, role })); updateUserRole(detailUser.id, role); }} />
            </div>
            <p className="detail-section-title">Notes ({userNotesFor(detailUser).length})</p>
            {userNotesFor(detailUser).length === 0 && <div className="empty-state" style={{ padding: "20px 0" }}>No notes yet.</div>}
            {userNotesFor(detailUser).map((n) => (
              <div className="detail-note-item" key={n.id}>
                <div style={{ color: "#fff", marginBottom: 3 }}>{n.title}</div>
                <div style={{ color: tokens.low, fontSize: 11 }}>{formatDate(n.created_at)}</div>
              </div>
            ))}
            <button className="btn btn-danger" style={{ width: "100%", marginTop: 16 }} onClick={() => { setDetailUser(null); deleteUser(detailUser.id); }}>
              <Trash2 size={13} /> Delete user
            </button>
          </div>
        </>
      )}

      {detailNote && (
        <>
          <div className="slideover-overlay" onClick={() => setDetailNote(null)} />
          <div className="slideover">
            <button className="slideover-close" onClick={() => setDetailNote(null)}><X size={16} /></button>
            <div className="avatar-lg"><FileText size={24} /></div>
            <div className="detail-name">{detailNote.title}</div>
            <div className="detail-row"><Users size={13} /> {detailNote.owner_name || detailNote.owner_email}</div>
            <div className="detail-row"><Calendar size={13} /> Created {formatDate(detailNote.created_at)}</div>
            {detailNote.content && <p style={{ fontSize: 13, color: tokens.muted, lineHeight: 1.6, marginTop: 16 }}>{detailNote.content}</p>}
            <button className="btn btn-danger" style={{ width: "100%", marginTop: 16 }} onClick={() => { setDetailNote(null); deleteNote(detailNote.id); }}>
              <Trash2 size={13} /> Delete note
            </button>
          </div>
        </>
      )}

      <ConfirmModal modal={confirmModal} onCancel={() => setConfirmModal(null)} />

      <div className="toast-stack">
        {toasts.map((t) => <Toast key={t.id} toast={t} onClose={(id) => setToasts((ts) => ts.filter((x) => x.id !== id))} />)}
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, loading, series, dataKey, color }) {
  return (
    <div className="stat-card">
      <div className="stat-top">{icon}</div>
      {loading ? <SkeletonBlock w={60} h={26} /> : <div className="stat-value">{value}</div>}
      <div className="stat-label">{label}</div>
      {!loading && series && series.length > 1 && (
        <div className="stat-spark">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={series}>
              <Area type="monotone" dataKey={dataKey} stroke={color} fill={color} fillOpacity={0.15} strokeWidth={1.5} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

function Pagination({ page, totalPages, total, onChange }) {
  if (total === 0) return null;
  return (
    <div className="pagination">
      <span>{total} total</span>
      <div className="pagination-controls">
        <button className="page-btn" disabled={page <= 1} onClick={() => onChange(page - 1)}><ChevronLeft size={14} /></button>
        <span>Page {page} of {totalPages}</span>
        <button className="page-btn" disabled={page >= totalPages} onClick={() => onChange(page + 1)}><ChevronRight size={14} /></button>
      </div>
    </div>
  );
}

export default AdminDashboard;