import React from "react";
import styles from "./FoodItem.module.css";

export default function FoodItem(props) {
  const { name, desc, price, id } = props.foodData;

  const addFoodHandler = function (e) {
    const wrapper = e.target.closest("[data-name='addFood']");
    const id = +wrapper.dataset.foodId;
    const count = +wrapper.querySelector("[data-name='foodCount']").value;

    props.updateFoodCart({ type: "ADD", id: id, count: count });
  };

  return (
    <li className={styles.foodItem}>
      <div>
        <h2>{name}</h2>
        <p className="italic">{desc}</p>
        <span className={styles.price}>₹{price}</span>
      </div>
      <div data-name="addFood" data-food-id={id}>
        <span className={styles.countLabel}>Count</span>
        <input
          className={styles.input}
          type="number"
          defaultValue={1}
          data-name="foodCount"
        />
        <button className={styles.button} onClick={(e) => addFoodHandler(e)}>
          <i className="fa-solid fa-plus"></i>&nbsp; Add
        </button>
      </div>
    </li>
  );
}
