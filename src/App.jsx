import React, { useState, useReducer, useEffect } from "react";
import "./assets/css/global.css";
import Header from "./components/UI/Header";
import Footer from "./components/UI/Footer";
import BodyWrapper from "./components/UI/BodyWrapper";
import FoodItems from "./components/Food/FoodItems";
import Modal from "./components/Cart/Modal";
import ModalContent from "./components/Cart/ModalContent";

const cartManager = function (prevState, action) {
  const {
    cartItems: prevCartItems,
    cartTotalCount: prevCartTotalCount,
    cartTotalPrice: prevCartTotalPrice,
  } = prevState;

  const { id, price } = action.foodData;

  switch (action.type) {
    case "REMOVE":
      // console.log("remove food", id, count);
      const { itemCount, removeCount } = action;

      // if it is the last count, remove food from cart
      if (itemCount === removeCount) {
        return {
          cartItems: prevCartItems.filter((item) => item.id !== id),
          cartTotalCount: prevCartTotalCount - removeCount,
          cartTotalPrice: prevCartTotalPrice - price * removeCount,
        };
      } else {
        // else, reduce food count
        return {
          cartItems: prevCartItems.map((item) =>
            item.id === id ? { ...item, count: item.count - removeCount } : item
          ),
          cartTotalCount: prevCartTotalCount - removeCount,
          cartTotalPrice: prevCartTotalPrice - price * removeCount,
        };
      }

    case "ADD":
      // console.log("add food", id, count);
      const { addCount, foodData } = action;

      // if food is in cart, increase count
      if (prevCartItems.some((item) => item.id === id)) {
        return {
          cartItems: prevCartItems.map((item) =>
            item.id === id ? { ...item, count: item.count + addCount } : item
          ),
          cartTotalCount: prevCartTotalCount + addCount,
          cartTotalPrice: prevCartTotalPrice + price * addCount,
        };
      } else {
        // else, add food
        return {
          cartItems: [...prevCartItems, { ...foodData, count: addCount }],
          cartTotalCount: prevCartTotalCount + addCount,
          cartTotalPrice: prevCartTotalPrice + price * addCount,
        };
      }

    default:
      return prevState;
  }
};

const App = function () {
  const [foodData, setFoodData] = useState([]);
  const [foodCart, updateFoodCart] = useReducer(cartManager, {
    cartItems: [],
    cartTotalCount: 0,
    cartTotalPrice: 0,
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [dataFetchFailed, setDataFetchFailed] = useState(false);

  useEffect(() => {
    fetch(
      "https://react-project-7ced2-default-rtdb.firebaseio.com/meal-data.json"
    )
      .then((res) => res.json())
      .then((data) => setFoodData(data["-N1mh71Dhy5vFrQyecZh"]))
      .catch(() => setDataFetchFailed(true));
  }, []);

  return (
    <React.Fragment>
      <Header
        openModal={() => setModalIsOpen(true)}
        cartCount={foodCart.cartTotalCount}
      />
      {modalIsOpen && (
        <Modal closeModal={() => setModalIsOpen(false)}>
          <ModalContent
            closeModal={() => setModalIsOpen(false)}
            foodCart={foodCart}
            updateFoodCart={(dispatchOption) => updateFoodCart(dispatchOption)}
          />
        </Modal>
      )}
      <BodyWrapper>
        <FoodItems
          foodData={foodData}
          updateFoodCart={(dispatchOption) => updateFoodCart(dispatchOption)}
          dataFetched={!dataFetchFailed}
        />
      </BodyWrapper>
      <Footer />
    </React.Fragment>
  );
};

export default App;
