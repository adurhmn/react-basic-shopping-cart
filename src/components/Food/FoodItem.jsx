import React, { useRef } from "react";
import styles from "./FoodItem.module.css";

export default function FoodItem(props) {
  const { name, desc, price, id } = props.foodData;
  const countInput = useRef();

  return (
    <li className={styles.foodItem}>
      <div>
        <h2>{name}</h2>
        <p className="italic">{desc}</p>
        <span className={styles.price}>₹{price}</span>
      </div>
      <div>
        <span className={styles.countLabel}>Count</span>
        <input
          className={styles.input}
          type="number"
          defaultValue={1}
          max="10"
          min="1"
          ref={countInput}
        />
        <button
          className={styles.button}
          onClick={() => {
            props.updateFoodCart({
              type: "ADD",
              id: id,
              count: +countInput.current.value,
            });
          }}
        >
          <i className="fa-solid fa-plus"></i>&nbsp; Add
        </button>
      </div>
    </li>
  );
}
