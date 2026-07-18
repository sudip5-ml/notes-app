import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import "../css/Signup.css";

function Signup() {
  const navigate = useNavigate();

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
    setError("");
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

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Signup failed");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setSuccess(true);
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (err) {
  if (err instanceof TypeError) {
    setError("Can't reach the server — is the backend running?");
  } else {
    setError(err.message || "Something went wrong. Please try again.");
  }
} finally {
  setLoading(false);
}
  };

  const handleGoogleSignup = () => {
    setLoadingGoogle(true);
    setError("");

    setTimeout(() => {
      localStorage.setItem("token", "google_demo_mock_token_12345");
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: 9999,
          username: "Google User",
          email: "google@gmail.com",
        })
      );

      setLoadingGoogle(false);
      setSuccess(true);
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    }, 1200);
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.glowLeft}></div>
      <div style={styles.glowRight}></div>

      <div style={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={styles.card}
        >
          <div onClick={() => navigate("/")} style={styles.logoContainer}>
            <span style={styles.logoBadge}>NN</span>
            <span style={styles.logoText}>NoteNest</span>
          </div>

          <h2 style={styles.title}>Create new account</h2>

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

          <form onSubmit={handleSignup} style={styles.form} noValidate>
            <div style={styles.inputGroup}>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your Full Name"
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

            <div style={styles.inputGroup}>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@example.com"
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
                  paddingRight: "46px",
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
    display: "flex",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer",
    marginBottom: "32px",
    userSelect: "none",
  },
  logoBadge: {
    background: "linear-gradient(135deg, #7c6ff7, #a78bfa)",
    borderRadius: "10px",
    padding: "6px 10px",
    fontSize: "16px",
    fontWeight: "900",
    color: "white",
    boxShadow: "0 0 15px rgba(124,111,247,0.6), 0 0 30px rgba(124,111,247,0.3)",
    border: "1px solid rgba(167,139,250,0.5)",
  },
  logoText: {
    fontWeight: "800",
    fontSize: "18px",
    color: "#ffffff",
  },
  title: {
    fontSize: "24px",
    fontWeight: "600",
    color: "#ffffff",
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
    color: "#6b7280",
    padding: "0 12px",
  },
  googleBtn: {
    width: "100%",
    backgroundColor: "#18182c",
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
    color: "#6b7280",
  },
  loginLink: {
    color: "#7c6ff7",
    fontWeight: "600",
    cursor: "pointer",
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

// Inject keyframes once (safe against missing stylesheets)
if (typeof document !== "undefined" && !document.getElementById("signup-spin-kf")) {
  const style = document.createElement("style");
  style.id = "signup-spin-kf";
  style.innerHTML = `@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`;
  document.head.appendChild(style);
}

export default Signup;