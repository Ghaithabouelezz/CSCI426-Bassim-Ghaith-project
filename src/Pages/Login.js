import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../Styles/Login.css';
import image from '../assets/image.webp';

export default function LoginPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [hasAccount, setHasAccount] = useState(true);
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    if (name.trim() === "" || password.trim() === "") {
      alert("Please fill in both name and password!");
      return;
    }
    
    navigate('/home');
  };

  return (
    <div className="login-page" style={{ image: `url(${image})` }}>
      <div className="login-card">
        <h1 className="login-title">{hasAccount ? "Sign In" : "Create Account"}</h1>
        <form className="login-form" onSubmit={handleSignIn}>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="login-input"
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          />
          <button type="submit" className="login-button">
            {hasAccount ? "Sign In" : "Sign Up"}
          </button>
        </form>
        <p className="login-toggle">
          {hasAccount ? "Don't have an account?" : "Already have an account?"}
          <button onClick={() => setHasAccount(!hasAccount)} className="login-toggle-btn">
            {hasAccount ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </div>
    </div>
  );
}