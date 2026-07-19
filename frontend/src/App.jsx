import ScrollToTop from './components/ScrollToTop'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Signup from './pages/Signup'
import AdminDashboard from './pages/AdminDashboard'
import Blog from './pages/Blog'
import Careers from './pages/Careers'
import ContactPage from './pages/ContactPage'
import Documentation from './pages/Documentation'
import ForgotPassword from './pages/ForgotPassword'
import HelpCenter from './pages/HelpCenter'
import Roadmap from './pages/Roadmap'
import Security from './pages/Security'
import Status from './pages/Status'
import NotePrivacy from './pages/NotePrivacy'
import TermsOfService from './pages/TermsOfService'
import NoteCookies from './pages/NoteCookies'
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from './context/ThemeContext'

function App() {
  const token = localStorage.getItem('token');
  const userData = localStorage.getItem('user');
  const user = userData ? JSON.parse(userData) : null;
  const isAuthenticated = !!token;

  // Protected Route wrapper — only enforces role check if requiredRole is passed
  const ProtectedRoute = ({ children, requiredRole }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }

    if (requiredRole && user?.role !== requiredRole) {
      return <Navigate to="/dashboard" replace />;
    }

    return children;
  };

  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Toaster position="top-right" toastOptions={{ style: { background: "var(--surface)", color: "var(--text)", border: "1px solid var(--border)" } }} />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/docs" element={<Documentation />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/help" element={<HelpCenter />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/security" element={<Security />} />
          <Route path="/status" element={<Status />} />
          <Route path="/privacy" element={<NotePrivacy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/cookies" element={<NoteCookies />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/adminDashboard"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App;