import React, { Fragment, useRef, useState } from "react";
import styles from "./Checkout.module.css";

const Checkout = function (props) {
  const [formIsValid, setFormIsValid] = useState(false);

  let fName = useRef();
  let lName = useRef();
  let phone = useRef();
  let email = useRef();
  let address = useRef();
  let agreement = useRef();

  const validateForm = function () {
    if (
      fName.current.checkValidity() &&
      lName.current.checkValidity() &&
      phone.current.checkValidity() &&
      email.current.checkValidity() &&
      address.current.checkValidity() &&
      agreement.current.checked
    ) {
      setFormIsValid(true);
    } else {
      setFormIsValid(false);
    }
  };

  return (
    <Fragment>
      <form className={styles.checkout}>
        <div className={styles.fname}>
          <label htmlFor="checkoutFirstName">First Name</label>
          <input
            type="text"
            id="checkoutFirstName"
            className={styles.checkoutTextInput}
            pattern="^[A-Za-z ]+$"
            onChange={validateForm}
            ref={fName}
            required
          />
        </div>
        <div className={styles.lname}>
          <label htmlFor="checkoutLastName">Last Name</label>
          <input
            type="text"
            id="checkoutLastName"
            className={styles.checkoutTextInput}
            pattern="^[A-Za-z ]+$"
            onChange={validateForm}
            ref={lName}
            required
          />
        </div>
        <div className={styles.phone}>
          <label htmlFor="checkoutPhone">Phone</label>
          <input
            type="tel"
            id="checkoutPhone"
            className={styles.checkoutTextInput}
            pattern="[0-9]{10}"
            onChange={validateForm}
            ref={phone}
            required
          />
        </div>
        <div className={styles.mail}>
          <label htmlFor="checkoutEmail">Email</label>
          <input
            type="email"
            id="checkoutEmail"
            className={styles.checkoutTextInput}
            onChange={validateForm}
            ref={email}
            required
          />
        </div>
        <div className={styles.address}>
          <label htmlFor="checkoutAddress">Address</label>
          <textarea
            id="checkoutAddress"
            className={styles.checkoutTextInput}
            onChange={validateForm}
            ref={address}
            required
          />
        </div>
        <div className={styles.agreement}>
          <input
            type="checkbox"
            id="checkoutAgreement"
            onChange={validateForm}
            ref={agreement}
            required
          />
          <label htmlFor="checkoutAgreement">
            I agree to the <a href="http://example.com/">terms & conditions.</a>
          </label>
        </div>
        <button
          className={`${styles.cancel} ${styles.button}`}
          onClick={(e) => {
            e.preventDefault();
            props.goBack();
          }}
        >
          Cancel
        </button>
        <button
          className={`${styles.submit} ${styles.button} ${styles["button--dark"]}`}
          disabled={!formIsValid}
          onClick={(e) => {
            e.preventDefault();
            props.shipOrder({
              fName,
              lName,
              phone,
              email,
              address,
              agreement,
            });
          }}
        >
          Submit
        </button>
      </form>
    </Fragment>
  );
};

export default Checkout;
