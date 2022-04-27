import React from "react";
import styles from "./App.module.css";
import Header from "./components/Header";
import BodyWrapper from "./components/BodyWrapper";
import FoodItems from "./components/FoodItems";
import Modal from "./components/Modal";

const cartManager = function (prevState, { type, id, count }) {
  if (type === "REMOVE") {
    // console.log("remove food", id, count);
    if (prevState[id] === 1) {
      // if it is the last count, remove food from cart
      const { [id]: _, ...updatedCart } = prevState;
      return updatedCart;
    } else {
      // else, reduce food count
      return { ...prevState, [id]: prevState[id] - count };
    }
  } else if (type === "ADD") {
    // console.log("add food", id, count);
    // if food is not in cart, add food
    if (prevState[id] === undefined) {
      return { ...prevState, [id]: count };
    } else {
      // else, increase count
      return { ...prevState, [id]: prevState[id] + count };
    }
  }
};

export default function App() {
  const [foodCart, updateFoodCart] = React.useReducer(
    cartManager,
    new Object()
  );
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const getCartCount = (cart) =>
    Object.values(cart).reduce((acc, cur) => acc + cur, 0);

  return (
    <React.Fragment>
      <Header
        openModal={() => setModalIsOpen(true)}
        cartCount={getCartCount(foodCart)}
      />
      <BodyWrapper>
        <FoodItems
          updateFoodCart={(dispatchOption) => updateFoodCart(dispatchOption)}
        />
        {modalIsOpen && (
          <Modal
            closeModal={() => setModalIsOpen(false)}
            foodCart={foodCart}
            updateFoodCart={(dispatchOption) => updateFoodCart(dispatchOption)}
          />
        )}
      </BodyWrapper>
      <footer className={styles.footerBox}>
        <p>
          Developed by{" "}
          <a className={styles.footerLink} href="https://github.com/adurhmn">
            @adurhmn
          </a>
        </p>
      </footer>
    </React.Fragment>
  );
}
