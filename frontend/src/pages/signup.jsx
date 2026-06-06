import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../css/Signup.css'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const strengthOf = (pw) => {
  let score = 0
  if (pw.length >= 8) score++
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++
  if (/\d/.test(pw)) score++
  if (/[^A-Za-z0-9]/.test(pw)) score++
  return score // 0-4
}

const STRENGTH_LABEL = ['', 'Weak', 'Fair', 'Good', 'Strong']
const STRENGTH_COLOR = ['#1e1e3a', '#ef4444', '#f59e0b', '#3b82f6', '#22c55e']

function Signup() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const update = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value })
    if (errors[field]) setErrors({ ...errors, [field]: undefined })
  }

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'Full name is required'
    if (!form.email.trim()) next.email = 'Email is required'
    else if (!EMAIL_RE.test(form.email)) next.email = 'Enter a valid email address'
    if (!form.password) next.password = 'Password is required'
    else if (form.password.length < 8) next.password = 'Use at least 8 characters'
    if (!form.confirm) next.confirm = 'Please confirm your password'
    else if (form.confirm !== form.password) next.confirm = 'Passwords do not match'
    return next
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const next = validate()
    setErrors(next)
    if (Object.keys(next).length > 0) return

    setLoading(true)
    localStorage.setItem('nn_user', form.name.trim())
    setTimeout(() => navigate('/dashboard'), 600)
  }

  const strength = strengthOf(form.password)

  return (
    <div className="signup-page">
      <div className="signup-container">

        <Link to="/" className="back-home">← Back to home</Link>

        <div className="logo">
          <span>NN</span>
        </div>

        <h1>Create Account</h1>

        <p className="description">
          Join NoteNest and start organizing your thoughts,
          ideas, and tasks in one place.
        </p>

        <form className="signup-form" onSubmit={handleSubmit} noValidate>

          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            type="text"
            placeholder="Enter your full name"
            value={form.name}
            onChange={update('name')}
            className={errors.name ? 'field-error' : ''}
            autoComplete="name"
          />
          {errors.name && <span className="error-text">{errors.name}</span>}

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
              placeholder="Create a password"
              value={form.password}
              onChange={update('password')}
              className={errors.password ? 'field-error' : ''}
              autoComplete="new-password"
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
          {form.password && (
            <div className="strength">
              <div className="strength-bar">
                {[1, 2, 3, 4].map((i) => (
                  <span
                    key={i}
                    style={{ background: i <= strength ? STRENGTH_COLOR[strength] : '#1e1e3a' }}
                  />
                ))}
              </div>
              <span className="strength-label" style={{ color: STRENGTH_COLOR[strength] }}>
                {STRENGTH_LABEL[strength]}
              </span>
            </div>
          )}
          {errors.password && <span className="error-text">{errors.password}</span>}

          <label htmlFor="confirm">Confirm Password</label>
          <input
            id="confirm"
            type={showPassword ? 'text' : 'password'}
            placeholder="Confirm your password"
            value={form.confirm}
            onChange={update('confirm')}
            className={errors.confirm ? 'field-error' : ''}
            autoComplete="new-password"
          />
          {errors.confirm && <span className="error-text">{errors.confirm}</span>}

          <button type="submit" disabled={loading}>
            {loading ? 'Creating account…' : 'Create Account'}
          </button>

        </form>

        <p className="footer-text">
          Already have an account?
          <Link to="/login"> Sign In</Link>
        </p>

      </div>
    </div>
  );
}

export default Signup
