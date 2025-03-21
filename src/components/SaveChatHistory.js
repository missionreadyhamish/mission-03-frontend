import React from "react";
import styles from "../components/SaveChatHistory.module.css";
import logo from "../assets/logo.png";
import { FaPhone, FaMapMarkerAlt, FaUser } from "react-icons/fa";

const Header = () => {
  return (
    <header className={styles.header}>
      <img src={logo} alt="logo" className={styles.logo} />
      <h1 className={styles.title}>Tuners Car Chatbox</h1>
      <div className={styles.contactInfo}>
        <div className={styles.contactItem}>
          <FaPhone className={styles.icon} />
          <span>0800 887 637</span>
        </div>
        <button className={styles.button}>
          <FaMapMarkerAlt className={styles.icon} />
          Find Us
        </button>
        <button className={styles.button}>
          <FaUser className={styles.icon} />
          LOGIN or REGISTER
        </button>
      </div>
    </header>
  );
};

export default Header;