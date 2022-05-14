import React from "react";
import styles from "./CartItem.module.css";
import btnStyles from "../../assets/css/button.module.css";

const CartItem = function (props) {
  return (
    <li className={styles.cartItem}>
      <div>
        <h2>{props.itemInfo.name}</h2>
        <span className={styles.price}>₹{props.itemInfo.price}</span>
        <span className={styles.count}>x{props.itemInfo.count}</span>
      </div>
      <div>
        <button
          className={`${btnStyles.btnSecondary} u-mg-r-small`}
          onClick={() => {
            props.updateFoodCart({
              type: "REMOVE",
              id: props.itemInfo.id,
              count: 1,
            });
          }}
        >
          <i className="fa-solid fa-minus"></i>
        </button>
        <button
          className={btnStyles.btnSecondary}
          onClick={() => {
            props.updateFoodCart({
              type: "ADD",
              id: props.itemInfo.id,
              count: 1,
            });
          }}
        >
          <i className="fa-solid fa-plus"></i>
        </button>
      </div>
    </li>
  );
};

export default CartItem;
