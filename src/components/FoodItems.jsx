import React from "react";
import styles from "./FoodItems.module.css";
import FoodItem from "./FoodItem";
import FoodData from "./food-data";

export default function FoodItems(props) {
  const foodMenu = React.useContext(FoodData);
  const foodItems = Object.values(foodMenu);

  return (
    <ul className={styles.foodItems}>
      {foodItems.map((food) => (
        <FoodItem
          key={food.id}
          foodData={food}
          updateFoodCart={(dispatchOption) =>
            props.updateFoodCart(dispatchOption)
          }
        />
      ))}
    </ul>
  );
}
