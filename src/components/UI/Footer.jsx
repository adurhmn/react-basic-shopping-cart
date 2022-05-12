import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footerBox}>
      <p>
        Developed by{" "}
        <a className={styles.footerLink} href="https://github.com/adurhmn">
          @adurhmn
        </a>
      </p>
    </footer>
  );
};

export default Footer;
