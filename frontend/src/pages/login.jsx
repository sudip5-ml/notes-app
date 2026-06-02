import "./Login.css";

function Login() {
  return (
    <div className="login-page">
      <div className="login-container">

        <div className="logo">
          <span>NN</span>
        </div>

        <h1>Welcome Back</h1>

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

export default Login;