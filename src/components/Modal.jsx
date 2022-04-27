import React from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";
import FoodData from "./food-data";

export const ModalFoodItem = function (props) {
  // console.log(props);
  return (
    <li className={styles.modalFoodItem}>
      <div>
        <h2>{props.itemInfo.name}</h2>
        <span className={styles.price}>₹{props.itemInfo.price}</span>
        <span className={styles.count}>x{props.count}</span>
      </div>
      <div
        data-name="modalCartButtonWrapper"
        data-food-id={props.itemInfo["id"]}
      >
        <button
          className={styles.button}
          onClick={(e) => {
            props.updateFoodCart({
              type: "REMOVE",
              id: e.target.closest("[data-name='modalCartButtonWrapper']")
                .dataset.foodId,
              count: 1,
            });
          }}
        >
          <i className="fa-solid fa-minus"></i>
        </button>
        <button
          className={styles.button}
          data-food-id={props.itemInfo["id"]}
          onClick={(e) => {
            props.updateFoodCart({
              type: "ADD",
              id: e.target.closest("[data-name='modalCartButtonWrapper']")
                .dataset.foodId,
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

const Total = function (props) {
  return (
    <div className={styles.modalFoodItem}>
      <div>
        <h1>Total Amount</h1>
      </div>
      <div>
        <h1 className={styles.totalPrice}>₹{props.totalPrice}</h1>
        <button
          className={`${styles.button} ${styles.buttonTotal}`}
          onClick={() => props.closeModal()}
        >
          Close
        </button>
        <button
          className={`${styles.button} ${styles.buttonTotal} ${styles.buttonDark}`}
          onClick={() => console.log(`Ordering for ₹${props.totalPrice}...`)}
          disabled={props.totalPrice === 0}
        >
          Order
        </button>
      </div>
    </div>
  );
};

export default function Modal(props) {
  // console.log("Modal Wrapper Rerendered");
  let totalPrice = 0;
  const modalFrame = document.querySelector("#modalFrame");
  const foodMenu = React.useContext(FoodData);

  const overlayClickHandler = function (e) {
    if (e.target.getAttribute("id") === "modalOverlay") props.closeModal();
  };

  const modal = (
    <div
      className={styles.overlay}
      id="modalOverlay"
      onClick={overlayClickHandler}
    >
      <div className={styles.modal} id="modalContent">
        <ul className={styles.modalFoodItems}>
          {Object.entries(props.foodCart).map(([id, count]) => {
            totalPrice += foodMenu[id].price * count;
            return (
              <ModalFoodItem
                key={id}
                itemInfo={foodMenu[id]}
                count={count}
                updateFoodCart={(dispatchOption) =>
                  props.updateFoodCart(dispatchOption)
                }
              />
            );
          })}
        </ul>
        <Total totalPrice={totalPrice} closeModal={props.closeModal} />
      </div>
    </div>
  );

  return ReactDOM.createPortal(modal, modalFrame);
}
