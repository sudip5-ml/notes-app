import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState("");

  const handleReset = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Email address is required");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    setError("");

    // Simulate sending email
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  return (
    <div style={styles.pageContainer}>
      {/* Background Glows */}
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
  
          <h2 style={styles.title}>Reset your password</h2>
          <p style={styles.subtitle}>Enter your email address and we'll send you a link to reset your password.</p>
  
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
                Reset link sent! Please check your inbox.
              </motion.div>
            )}
          </AnimatePresence>
  
          {!success && (
            <form onSubmit={handleReset} style={styles.form}>
              {/* Email Input Group */}
              <div style={styles.inputGroup}>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(""); }}
                  placeholder="designer@example.com"
                  style={{
                    ...styles.inputField,
                    borderColor: focusedField === "email" ? "#7c6ff7" : "#1e1e3a",
                    boxShadow: focusedField === "email" ? "0 0 10px rgba(124, 111, 247, 0.15)" : "none",
                  }}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField("")}
                  disabled={loading}
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
    
              {/* Reset Button */}
              <motion.button
                type="submit"
                disabled={loading}
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
                    <span>Sending link...</span>
                  </div>
                ) : (
                  "Send Reset Link"
                )}
              </motion.button>
            </form>
          )}
  
          {/* Back to Login Redirect Link */}
          <div style={styles.footerLinkContainer}>
            <span
              onClick={() => navigate("/login")}
              style={styles.loginLink}
              onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
              onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
            >
              ← Back to login
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

const styles = {
  pageContainer: {
    position: "relative",
    width: "100%",
    minHeight: "100vh",
    backgroundColor: "#0f0f1a",
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
    background: "radial-gradient(circle, rgba(124,111,247,0.12) 0%, transparent 70%)",
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
    background: "radial-gradient(circle, rgba(167,139,250,0.08) 0%, transparent 70%)",
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
    backgroundColor: "#131324",
    border: "1px solid #1e1e3a",
    borderRadius: "16px",
    padding: "40px 32px 36px 32px",
    boxShadow: "0 30px 100px rgba(0, 0, 0, 0.6), 0 0 50px rgba(124, 111, 247, 0.15)",
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
    color: "#ffffff",
    marginBottom: "12px",
    textAlign: "center",
    letterSpacing: "-0.5px",
  },
  subtitle: {
    fontSize: "14px",
    color: "#9ca3af",
    textAlign: "center",
    marginBottom: "24px",
    lineHeight: "1.5",
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
    backgroundColor: "#131324",
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
  submitBtn: {
    width: "100%",
    background: "linear-gradient(135deg, #7c6ff7, #a78bfa)",
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
    gap: "8px",
  },
  footerLinkContainer: {
    marginTop: "30px",
    fontSize: "14px",
    textAlign: "center",
  },
  loginLink: {
    color: "#7c6ff7",
    fontWeight: "600",
    cursor: "pointer",
    textDecoration: "none",
  },
  errorAlert: {
    width: "100%",
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    border: "1px solid #ef4444",
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
} catch {
  void 0;
}

export default ForgotPassword;
