import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  // Get user data from localStorage
  const token = localStorage.getItem('token');
  const userData = localStorage.getItem('user');
  const user = userData ? JSON.parse(userData) : null;
  
  // Check if user is authenticated
  const isAuthenticated = !!token;

  // Protected Route wrapper
  const ProtectedRoute = ({ children, requiredRole }) => {
    // If not authenticated, redirect to login
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }

    // If role doesn't match, redirect to appropriate dashboard
    if (requiredRole && user?.role !== requiredRole) {
      if (user?.role === 'admin') {
        return <Navigate to="/adminDashboard" replace />;
      } else if (user?.role === 'user') {
        return <Navigate to="/Dashboard" replace />;
      }
      return <Navigate to="/login" replace />;
    }

    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route 
          path="/Dashboard" 
          element={
            <ProtectedRoute requiredRole="user">
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

        {/* Redirect root to appropriate dashboard if logged in */}
        <Route 
          path="/" 
          element={
            isAuthenticated ? (
              user?.role === 'admin' ? 
                <Navigate to="/adminDashboard" /> : 
                <Navigate to="/dashboard" />
            ) : (
              <Home />
            )
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;