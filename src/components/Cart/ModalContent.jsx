import React, { useState } from "react";
import Checkout from "./Checkout";
import FoodCart from "./FoodCart";

const Receipt = function (props) {
  return (
    <div className="alertMsg">
      <h1>
        Hello, {props.formData.fName} {props.formData.lName}
      </h1>
      <br />
      <h4 className="successMsg">
        Your order has been sent, it will be delivered within 45 mins...
      </h4>
    </div>
  );
};

const ModalContent = function (props) {
  const [isOrdered, setIsOrdered] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState();

  let content;

  if (!isOrdered && !isSubmitted)
    content = (
      <FoodCart
        order={() => setIsOrdered(true)}
        closeModal={props.closeModal}
        foodCart={props.foodCart}
        updateFoodCart={(dispatchOption) =>
          props.updateFoodCart(dispatchOption)
        }
      />
    );
  else if (isOrdered)
    content = (
      <Checkout
        goBack={() => setIsOrdered(false)}
        shipOrder={(data) => {
          setFormData(data);
          setIsOrdered(false);
          setIsSubmitted(true);
        }}
      />
    );
  else if (isSubmitted) content = <Receipt formData={formData} />;

  return content;
};

export default ModalContent;
