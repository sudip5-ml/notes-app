import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../css/Login.css'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const update = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value })
    if (errors[field]) setErrors({ ...errors, [field]: undefined })
  }

  const validate = () => {
    const next = {}
    if (!form.email.trim()) next.email = 'Email is required'
    else if (!EMAIL_RE.test(form.email)) next.email = 'Enter a valid email address'
    if (!form.password) next.password = 'Password is required'
    return next
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length > 0) return

    setLoading(true)
    // Simulated auth — no backend yet, so we persist a session locally.
    const name = form.email.split('@')[0]
    localStorage.setItem('nn_user', name.charAt(0).toUpperCase() + name.slice(1))
    setTimeout(() => navigate('/dashboard'), 600)
  }

  return (
    <div className="login-page">
      <div className="login-container">

        <Link to="/" className="back-home">← Back to home</Link>

        <div className="logo">
          <span>NN</span>
        </div>

        <h1>Welcome Back</h1>

        <p className="description">
          Sign in to access your notes, organize your thoughts,
          and continue where you left off.
        </p>

        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={update('email')}
            className={errors.email ? 'field-error' : ''}
            autoComplete="email"
          />
          {errors.email && <span className="error-text">{errors.email}</span>}

          <label htmlFor="password">Password</label>
          <div className="input-group">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={form.password}
              onChange={update('password')}
              className={errors.password ? 'field-error' : ''}
              autoComplete="current-password"
            />
            <button
              type="button"
              className="toggle-pw"
              onClick={() => setShowPassword((s) => !s)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
          {errors.password && <span className="error-text">{errors.password}</span>}

          <button type="submit" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <p className="footer-text">
          Don't have an account?
          <Link to="/signup"> Sign up</Link>
        </p>

      </div>
    </div>
  );
}

export default Login
