import React, { Fragment } from "react";
import styles from "./FoodCart.module.css";
import CartItem from "./CartItem";

const Total = function (props) {
  return (
    <div className={styles.total}>
      <div>
        <h1>Total Amount</h1>
      </div>
      <div>
        <h1 className={styles.totalPrice}>₹{props.totalPrice}</h1>
        <button className={styles.button} onClick={() => props.closeModal()}>
          Close
        </button>
        <button
          className={`${styles.button} ${styles["button--dark"]}`}
          onClick={props.order}
          disabled={props.totalPrice === 0}
        >
          Order
        </button>
      </div>
    </div>
  );
};

const FoodCart = function (props) {
  return (
    <Fragment>
      {props.foodCart.cartItems.length === 0 ? (
        <h3 className="alertMsg">Nothing in cart!</h3>
      ) : (
        <ul className={styles.foodCart}>
          {props.foodCart.cartItems.map((item) => {
            return (
              <CartItem
                key={item.id}
                itemInfo={item}
                updateFoodCart={(dispatchOption) =>
                  props.updateFoodCart(dispatchOption)
                }
              />
            );
          })}
        </ul>
      )}

      <Total
        totalPrice={props.foodCart.cartTotalPrice}
        closeModal={props.closeModal}
        order={props.order}
      />
    </Fragment>
  );
};

export default FoodCart;
