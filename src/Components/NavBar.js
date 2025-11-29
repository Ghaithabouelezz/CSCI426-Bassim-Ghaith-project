import React from "react";
import { Link, useNavigate } from "react-router-dom";
import '../Styles/NavBar.css';
import Logo from '../assets/download.jpg';
import CartImage from '../assets/cart.png';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/home" className="logo-link">
          <img src={Logo} alt="Logo" className="logo" />
          <span className="logo-text">OnlineBookStore</span>
        </Link>
      </div>

      <div className="navbar-links">
        <Link to="/home">Home</Link>
        <Link to="/library">Library</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/cart" className="cart-link">
          <img src={CartImage} alt="Cart" className="cart-img" />
        </Link>
      </div>

      <button className="navbar-logout" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
}
