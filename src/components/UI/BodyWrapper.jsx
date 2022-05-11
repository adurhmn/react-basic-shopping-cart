import React from "react";
import styles from "./BodyWrapper.module.css";

export default function BodyWrapper(props) {
  return <div className={styles.bodyWrapper}>{props.children}</div>;
}
