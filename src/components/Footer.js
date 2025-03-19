import React from "react";
import styles from "../components/Footer.module.css";
import { MdDiversity3 } from "react-icons/md";
import { GiGiftOfKnowledge, GiHealthNormal } from "react-icons/gi";

const Header = () => {
  return (
    <footer className={styles.footer}>
        <div className={styles.griditem}>
            <div className={styles.left}>
                <a href="https://turnerspeople.co.nz/turners-cars/turners-cars-diversity-and-inclusion/"><button href="https://turnerspeople.co.nz/turners-cars/turners-cars-diversity-and-inclusion/" className={styles.button}>
                    <MdDiversity3 className={styles.icon} />
                    Diversity &amp; Inclusion
                </button></a>
            </div>
        </div>
        <div className={styles.griditem}>
            <div className={styles.middle}>
                <a href="https://turnerspeople.co.nz/turners-cars/turners-cars-learning-development/"><button className={styles.button}>
                    <GiGiftOfKnowledge className={styles.icon} />
                    Learning &amp; Development
                </button></a>
            </div>
        </div>
        <div className={styles.griditem}>
            <div className={styles.right}>
                    <a href="https://turnerspeople.co.nz/turners-cars/turners-cars-health-safety-wellbeing/">
                    <button className={styles.button}>
                    <GiHealthNormal className={styles.icon} />
                    Health, Safety &amp; Wellbeing
                </button></a>
            </div>
        </div>
    </footer>
  );
};

export default Header;
