import "../css/Login.css"
function Login() {
  const navigate = useNavigate();
  
  // Form State
  const [formData, setFormData] = useState({
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
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      // Save token and user details to localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setSuccess(true);
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    setLoadingGoogle(true);
    setError("");
    
    // Simulate Google Sign-In with a temporary mock token
    setTimeout(() => {
      localStorage.setItem("token", "google_demo_mock_token_12345");
      localStorage.setItem("user", JSON.stringify({
        id: 9999,
        username: "Google User",
        email: "google@gmail.com"
      }));

      setLoadingGoogle(false);
      setSuccess(true);
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    }, 1200);
  };

  return (
    <div className="login-page">
      <div className="login-container">

        <div className="logo">
          <span>NN</span>
        </div>

        <h1>Welcome Back </h1>

        <p className="description">
          Sign in to access your notes, organize your thoughts,
          and continue where you left off.
        </p>

        <form className="login-form">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
          />

          <button type="submit">
            Sign In
          </button>
        </form>

        <p className="footer-text">
          Don't have an account?
          <a href="/signup"> Sign up</a>
        </p>

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
  forgotLabel: {
    position: "absolute",
    right: "12px",
    top: "0",
    transform: "translateY(-50%)",
    backgroundColor: "#131324", // matches card bg to mask border
    padding: "0 6px",
    fontSize: "12px",
    fontWeight: "500",
    cursor: "pointer",
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
  signupLink: {
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

export default Login;