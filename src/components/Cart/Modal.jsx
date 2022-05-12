import React from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";

export default function Modal(props) {
  // console.log("Modal Wrapper Rerendered");

  const modalFrame = document.querySelector("#modalFrame");

  const modal = (
    <React.Fragment>
      {/* Back Drop / Overlay*/}
      <div
        className={styles.overlay}
        onClick={() => {
          props.closeModal();
        }}
      ></div>
      {/* Modal Content */}
      <div className={styles.modal}>{props.children}</div>
    </React.Fragment>
  );

  return ReactDOM.createPortal(modal, modalFrame);
}
