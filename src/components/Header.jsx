import React, { useEffect } from "react";
import styles from "./Header.module.css";

export default function Header(props) {
  // console.log(props);

  return (
    <header className={styles.header}>
      <span className="logo">AbdurMeals</span>
      <div className={styles.cart} onClick={props.openModal}>
        <span>
          <i className="fa-solid fa-cart-shopping"></i>
        </span>
        <span>Your Cart</span>
        <span className={styles.cart__total}>{props.cartCount}</span>
      </div>
    </header>
  );
}
