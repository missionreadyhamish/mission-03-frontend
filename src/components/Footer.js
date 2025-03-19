import React from "react";
import styles from "../components/Footer.module.css";
import { MdDiversity3 } from "react-icons/md";
import { GiGiftOfKnowledge, GiHealthNormal } from "react-icons/gi";

const Header = () => {
  return (
    <footer className={styles.footer}>
            <div className={styles.griditem}>
                <div className={styles.left}>
                    <button className={styles.button}>
                        <MdDiversity3 className={styles.icon} />
                        Diversity &amp; Inclusion
                    </button>
                </div>
            </div>

            <div className={styles.griditem}>
                <div className={styles.middle}>
                    <button className={styles.button}>
                        <GiGiftOfKnowledge className={styles.icon} />
                        Learning &amp; Development
                    </button>
                </div>
            </div>
            <div className={styles.griditem}>
                <div className={styles.right}>
                    <button className={styles.button}>
                        <GiHealthNormal className={styles.icon} />
                        Health, Safety &amp; Wellbeing
                    </button>
                </div>
            </div>





    </footer>
  );
};

export default Header;
