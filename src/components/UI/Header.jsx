import React, { useEffect, useState } from "react";
import styles from "./Header.module.css";

export default function Header(props) {
  // console.log(props);
  const [bubbleAdded, setBubbleAdded] = useState(false);

  useEffect(() => {
    // adds animation class after component is rendered (to see it in every rerender)
    setBubbleAdded(true);

    // removes the animation class from cart once animation is completed
    const bubbleTimer = setTimeout(() => {
      setBubbleAdded(false);
    }, 200);

    // clean up function
    return () => {
      clearInterval(bubbleTimer);
    };
  }, [props.cartCount]);

  const cartClass = `${styles.cart} ${bubbleAdded ? styles.bubbleUp : ""}`;
  // console.log(cartClass);

  return (
    <header className={styles.header}>
      <span className="logo">ReactShoppingCart</span>
      <div className={cartClass} onClick={props.openModal}>
        <span>
          <i className="fa-solid fa-cart-shopping"></i>
        </span>
        <span>Your Cart</span>
        <span className={styles.cart__total}>{props.cartCount}</span>
      </div>
    </header>
  );
}
