import React from "react";
import styles from "../../../../styles/conformationModal.module.scss";
export default function ConformationPopUp({
  title,
  onAcceptHandler,
  onCancelHandler,
}) {
  return (
    <div className={styles.custom_pop_up}>
      <div className={styles.pop_heading}>
        <h1>{title}</h1>
      </div>
      <div className={styles.pop_up_actions}>
        <div className={styles.accept_action}>
          <button className="transparent-btn" onClick={onAcceptHandler}>
            accept
          </button>
        </div>
        <div className={styles.close_pop_up_actions}>
          <button className="transparent-btn" onClick={onCancelHandler}>
            close
          </button>
        </div>
      </div>
    </div>
  );
}
