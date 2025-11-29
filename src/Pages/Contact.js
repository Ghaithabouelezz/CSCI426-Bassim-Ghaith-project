import React from "react";
import '../Styles/contact.css';
import Navbar from "../Components/NavBar";

export default function Contact() {
  return ( 
      <>
          <Navbar />
    <div className="contact-page">
      <h1>Contact Us</h1>
      <p className="contact-intro">
        We're here to help! Reach out to us through any of the following ways:
      </p>

      <div className="contact-info">
        <div className="contact-item">
          <h3>Email</h3>
          <p>support@onlinebookstore.com</p>
        </div>
        <div className="contact-item">
          <h3>Phone</h3>
          <p>+961 70 000 001</p>
        </div>
        <div className="contact-item">
          <h3>Address</h3>
          <p> 123Book Alhamra, Beirut, Lebanon</p>
        </div>
      </div>

      <div className="contact-form">
        <h2>Send us a message</h2>
        <form>
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
    </>
  );
}
