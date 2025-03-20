import React from "react";
import styles from "../components/HomePage.module.css";


const HomePage = () => {
  return (
    <div className={styles.homeContainer}>
      {/* Hero Section */}
      <div className={styles.heroSection}>
        {/* Banner image is background */}
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.primaryBtn}>Get a Quote</button>
      </div>

      {/* Insurance Products Section */}
      <div className={styles.productsSection}>
        <h2>Our Insurance Products</h2>
        <div className={styles.productsContainer}>
          <div className={styles.productCard}>
            <div className={styles.placeholderImg}></div>
            <h3>Car Insurance</h3>
            <p>Comprehensive coverage for your vehicle</p>
            <span className={styles.linkBtn}>Learn More</span>
          </div>
          <div className={styles.productCard}>
            <div className={styles.placeholderImg}></div>
            <h3>Third Party Insurance</h3>
            <p>Protection against damages to other vehicles</p>
            <span className={styles.linkBtn}>Learn More</span>
          </div>
          <div className={styles.productCard}>
            <div className={styles.placeholderImg}></div>
            <h3>Mechanical Breakdown</h3>
            <p>Coverage for unexpected mechanical failures</p>
            <span className={styles.linkBtn}>Learn More</span>
          </div>
        </div>
      </div>

      {/* Policy Documents Section */}
      <div className={styles.documentsSection}>
        <h2>Policy Documents</h2>
        <p>We've got the policy documents for these insurance products below, just click the links.</p>
        
        <div className={styles.documentLinks}>
          <h3>Car Insurance</h3>
          <ul>
            <li>
              <span>Policy wording for policies purchased or renewed after 28 February 2023</span>
              <ul>
                <li><span className={styles.fakeLink}>Comprehensive Everyday Plus</span></li>
                <li><span className={styles.fakeLink}>Third Party Property Damage</span></li>
                <li><span className={styles.fakeLink}>Third Party Fire & Theft</span></li>
              </ul>
            </li>
          </ul>
          
          <h3>Mechanical Breakdown Insurance</h3>
          <ul>
            <li><span className={styles.fakeLink}>View policy wording</span></li>
          </ul>
          
          <p className={styles.helpText}>
            If you can't find the information you are looking for, call 0800 TURNERS (0800 887 637) or email us at <span className={styles.fakeLink}>contact@turners.co.nz</span> and we'll be happy to help.
          </p>
          
          <p className={styles.financialInfo}>
            <span className={styles.fakeLink}>To view financial information, click here.</span>
          </p>
        </div>
      </div>

      {/* Help Section */}
      <div className={styles.helpSection}>
        <div className={styles.helpContent}>
          <h2>Need Assistance?</h2>
          <p>Our expert team is ready to help with any questions about your insurance needs</p>
          <div className={styles.contactOptions}>
            <div className={styles.contactCard}>
              <div className={`${styles.icon} ${styles.phoneIcon}`}></div>
              <h3>Call Us</h3>
              <p>0800 TURNERS (0800 887 637)</p>
            </div>
            <div className={styles.contactCard}>
              <div className={`${styles.icon} ${styles.emailIcon}`}></div>
              <h3>Email Us</h3>
              <p>contact@turners.co.nz</p>
            </div>
            <div className={styles.contactCard}>
              <div className={`${styles.icon} ${styles.locationIcon}`}></div>
              <h3>Visit Us</h3>
              <p>Find your nearest branch</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;