import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

function Signup() {
  const navigate = useNavigate();
  
  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [success, setSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(""); // Clear error on change
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      setError("Full name is required");
      return false;
    }
    if (!formData.email.trim()) {
      setError("Email address is required");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }
    if (!formData.password) {
      setError("Password is required");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    return true;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError("");

    // Simulate API request to backend
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    }, 1500);
  };

  const handleGoogleSignup = () => {
    setLoadingGoogle(true);
    setError("");
    
    // Simulate Google Sign-In redirect
    setTimeout(() => {
      setLoadingGoogle(false);
      setSuccess(true);
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    }, 1200);
  };

  return (
    <div style={styles.pageContainer}>
      {/* Background Glows (from design.md tokens) */}
      <div style={styles.glowLeft}></div>
      <div style={styles.glowRight}></div>

      {/* Main Container */}
      <div style={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={styles.card}
        >
          {/* Official NoteNest brand logo */}
          <div 
            onClick={() => navigate("/")} 
            style={styles.logoContainer}
          >
            <span style={styles.logoBadge}>NN</span>
            <span style={styles.logoText}>NoteNest</span>
          </div>

          <h2 style={styles.title}>Create new account</h2>

          {/* Validation Alert */}
          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                style={styles.errorAlert}
              >
                {error}
              </motion.div>
            )}
            {success && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                style={styles.successAlert}
              >
                Account created! Redirecting...
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSignup} style={styles.form}>
            {/* Full Name Input Group */}
            <div style={styles.inputGroup}>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Jamie Davis"
                style={{
                  ...styles.inputField,
                  borderColor: focusedField === "fullName" ? "#7c6ff7" : "#1e1e3a",
                  boxShadow: focusedField === "fullName" ? "0 0 10px rgba(124, 111, 247, 0.15)" : "none",
                }}
                onFocus={() => setFocusedField("fullName")}
                onBlur={() => setFocusedField("")}
                disabled={loading || loadingGoogle}
                autoComplete="name"
              />
              <label
                style={{
                  ...styles.inputLabel,
                  color: focusedField === "fullName" ? "#7c6ff7" : "#9ca3af",
                }}
              >
                Full name
              </label>
            </div>

            {/* Email Input Group */}
            <div style={styles.inputGroup}>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="designer@example.com"
                style={{
                  ...styles.inputField,
                  borderColor: focusedField === "email" ? "#7c6ff7" : "#1e1e3a",
                  boxShadow: focusedField === "email" ? "0 0 10px rgba(124, 111, 247, 0.15)" : "none",
                }}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField("")}
                disabled={loading || loadingGoogle}
                autoComplete="email"
              />
              <label
                style={{
                  ...styles.inputLabel,
                  color: focusedField === "email" ? "#7c6ff7" : "#9ca3af",
                }}
              >
                Email
              </label>
            </div>

            {/* Password Input Group */}
            <div style={styles.inputGroup}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="password"
                style={{
                  ...styles.inputField,
                  borderColor: focusedField === "password" ? "#7c6ff7" : "#1e1e3a",
                  boxShadow: focusedField === "password" ? "0 0 10px rgba(124, 111, 247, 0.15)" : "none",
                  paddingRight: "46px", // Space for eye toggle
                }}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField("")}
                disabled={loading || loadingGoogle}
                autoComplete="new-password"
              />
              <label
                style={{
                  ...styles.inputLabel,
                  color: focusedField === "password" ? "#7c6ff7" : "#9ca3af",
                }}
              >
                Password
              </label>
              
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.eyeToggle}
                tabIndex="-1"
              >
                {showPassword ? (
                  <FiEyeOff size={18} color="#9ca3af" />
                ) : (
                  <FiEye size={18} color="#9ca3af" />
                )}
              </button>
            </div>

            {/* Sign Up Button (Primary Gradient Accent) */}
            <motion.button
              type="submit"
              disabled={loading || loadingGoogle}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={styles.submitBtn}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "linear-gradient(135deg, #8b7eff, #bba4ff)";
                e.currentTarget.style.boxShadow = "0 0 25px rgba(124, 111, 247, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "linear-gradient(135deg, #7c6ff7, #a78bfa)";
                e.currentTarget.style.boxShadow = "0 0 20px rgba(124, 111, 247, 0.2)";
              }}
            >
              {loading ? (
                <div style={styles.loaderContainer}>
                  <div style={styles.spinner}></div>
                  <span>Signing up...</span>
                </div>
              ) : (
                "Sign up"
              )}
            </motion.button>
          </form>

          {/* Social Sign-up Separator */}
          <div style={styles.separatorContainer}>
            <div style={styles.separatorLine}></div>
            <span style={styles.separatorText}>or</span>
            <div style={styles.separatorLine}></div>
          </div>

          {/* Google Sign Up Button */}
          <motion.button
            type="button"
            onClick={handleGoogleSignup}
            disabled={loading || loadingGoogle}
            whileHover={{ scale: 1.02, backgroundColor: "#1e1e36" }}
            whileTap={{ scale: 0.98 }}
            style={styles.googleBtn}
          >
            {loadingGoogle ? (
              <div style={styles.loaderContainer}>
                <div style={styles.spinner}></div>
                <span>Connecting...</span>
              </div>
            ) : (
              <>
                <FcGoogle size={20} />
                <span>Sign up with Google</span>
              </>
            )}
          </motion.button>

          {/* Login Redirection Link */}
          <div style={styles.footerLinkContainer}>
            <span style={styles.footerText}>Already have an account? </span>
            <span
              onClick={() => navigate("/login")}
              style={styles.loginLink}
              onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
              onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
            >
              Log in
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Styles conforming to e:\notes-app\frontend\design.md tokens
const styles = {
  pageContainer: {
    position: "relative",
    width: "100%",
    minHeight: "100vh",
    backgroundColor: "#0f0f1a", // design.md base
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    fontFamily: "'Outfit', sans-serif",
  },
  glowLeft: {
    position: "absolute",
    top: "-15%",
    left: "-15%",
    width: "700px",
    height: "700px",
    background: "radial-gradient(circle, rgba(124,111,247,0.12) 0%, transparent 70%)", // design.md glow
    borderRadius: "50%",
    filter: "blur(60px)",
    pointerEvents: "none",
    zIndex: 0,
  },
  glowRight: {
    position: "absolute",
    bottom: "-15%",
    right: "-15%",
    width: "700px",
    height: "700px",
    background: "radial-gradient(circle, rgba(167,139,250,0.08) 0%, transparent 70%)", // design.md glow
    borderRadius: "50%",
    filter: "blur(60px)",
    pointerEvents: "none",
    zIndex: 0,
  },
  container: {
    width: "100%",
    zIndex: 1,
    padding: "20px",
    display: "flex",
    justifyContent: "center",
  },
  card: {
    width: "100%",
    maxWidth: "420px",
    backgroundColor: "#131324", // design.md card surface
    border: "1px solid #1e1e3a", // design.md border accent
    borderRadius: "16px",
    padding: "40px 32px 36px 32px",
    boxShadow: "0 30px 100px rgba(0, 0, 0, 0.6), 0 0 50px rgba(124, 111, 247, 0.15)", // design.md shadow
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    cursor: 'pointer',
    marginBottom: '32px',
    userSelect: 'none'
  },
  logoBadge: {
    background: 'linear-gradient(135deg, #7c6ff7, #a78bfa)',
    borderRadius: '10px',
    padding: '6px 10px',
    fontSize: '16px',
    fontWeight: '900',
    color: 'white',
    boxShadow: '0 0 15px rgba(124,111,247,0.6), 0 0 30px rgba(124,111,247,0.3)',
    border: '1px solid rgba(167,139,250,0.5)'
  },
  logoText: {
    fontWeight: '800',
    fontSize: '18px',
    color: '#ffffff'
  },
  title: {
    fontSize: "24px",
    fontWeight: "600",
    color: "#ffffff", // design.md primary text
    marginBottom: "32px",
    textAlign: "center",
    letterSpacing: "-0.5px",
  },
  form: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  inputGroup: {
    position: "relative",
    width: "100%",
    marginBottom: "22px",
  },
  inputLabel: {
    position: "absolute",
    left: "12px",
    top: "0",
    transform: "translateY(-50%)",
    backgroundColor: "#131324", // matches card bg to mask border
    padding: "0 6px",
    fontSize: "12px",
    fontWeight: "500",
    pointerEvents: "none",
    transition: "color 0.2s ease",
  },
  inputField: {
    width: "100%",
    backgroundColor: "transparent",
    border: "1px solid #1e1e3a",
    borderRadius: "8px",
    padding: "16px 14px",
    fontSize: "15px",
    color: "#ffffff",
    outline: "none",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
  },
  eyeToggle: {
    position: "absolute",
    right: "14px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "4px",
  },
  submitBtn: {
    width: "100%",
    background: "linear-gradient(135deg, #7c6ff7, #a78bfa)", // design.md primary gradient
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    padding: "15px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 0 20px rgba(124, 111, 247, 0.2)",
    marginTop: "6px",
    transition: "background 0.2s ease, box-shadow 0.2s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  separatorContainer: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    margin: "24px 0",
  },
  separatorLine: {
    flex: 1,
    height: "1px",
    backgroundColor: "#1e1e3a",
  },
  separatorText: {
    fontSize: "13px",
    color: "#6b7280", // design.md low-emphasis text
    padding: "0 12px",
  },
  googleBtn: {
    width: "100%",
    backgroundColor: "#18182c", // darker secondary background
    border: "1px solid #1e1e3a",
    borderRadius: "8px",
    padding: "14px",
    fontSize: "15px",
    fontWeight: "500",
    color: "#ffffff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    transition: "background-color 0.2s ease",
  },
  footerLinkContainer: {
    marginTop: "30px",
    fontSize: "14px",
    textAlign: "center",
  },
  footerText: {
    color: "#6b7280", // design.md low-emphasis text
  },
  loginLink: {
    color: "#7c6ff7", // design.md primary accent
    fontWeight: "600",
    cursor: "pointer",
  },
  errorAlert: {
    width: "100%",
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    border: "1px solid #ef4444", // design.md utility alert
    borderRadius: "6px",
    padding: "10px 14px",
    color: "#ef4444",
    fontSize: "13px",
    fontWeight: "500",
    marginBottom: "20px",
    textAlign: "center",
  },
  successAlert: {
    width: "100%",
    backgroundColor: "rgba(34, 197, 94, 0.1)",
    border: "1px solid #22c55e",
    borderRadius: "6px",
    padding: "10px 14px",
    color: "#22c55e",
    fontSize: "13px",
    fontWeight: "500",
    marginBottom: "20px",
    textAlign: "center",
  },
  loaderContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  },
  spinner: {
    width: "16px",
    height: "16px",
    border: "2px solid rgba(255, 255, 255, 0.3)",
    borderTop: "2px solid #ffffff",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
};

// Insert inline keyframes for spinner animation
const styleSheet = document.styleSheets[0] || (() => {
  const style = document.createElement("style");
  document.head.appendChild(style);
  return style.sheet;
})();
try {
  styleSheet.insertRule(`
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `, styleSheet.cssRules.length);
} catch (e) {}

export default Signup;