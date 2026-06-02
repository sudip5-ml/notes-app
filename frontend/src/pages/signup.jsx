import "./Signup.css";

function Signup() {
  return (
    <div className="signup-page">
      <div className="signup-container">

        <div className="logo">
          <span>NN</span>
        </div>

        <h1>Create Account</h1>

        <p className="description">
          Join NotesNest and start organizing your thoughts,
          ideas, and tasks in one place.
        </p>

        <form className="signup-form">

          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Create a password"
          />

          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm your password"
          />

          <button type="submit">
            Create Account
          </button>

        </form>

        <p className="footer-text">
          Already have an account?
          <a href="/login"> Sign In</a>
        </p>

      </div>
    </div>
  );
}

export default Signup;