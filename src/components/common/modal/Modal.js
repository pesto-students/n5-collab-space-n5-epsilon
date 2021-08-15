import React from "react";
import PropTypes from "prop-types";
import styles from "../../../../styles/modal.module.scss";
function Modal(props) {
  return (
    <div className={styles.modal}>
      <div className={styles.modal_content}>
        <div className={styles.modal_header}>
          {props.showHeading ? (
            <span className={styles.heading}>{props.heading}</span>
          ) : null}
          {props.showCloseButton ? (
            <span className={styles.close_modal} onClick={props.closeCallback}>
              x
            </span>
          ) : null}
        </div>
        <div className={styles.modal_body}>{props.children}</div>
        {props.showSubmitButton ? (
          <div className={styles.modal_footer}>
            <button className={styles.submit}>submit</button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
Modal.defaultProps = {
  showModal: false,
  showCloseButton: true,
  showHeading: false,
  heading: "",
  showSubmitButton: false,
  customClass: "",
  closeCallback: () => {},
  onSubmit: () => {},
};
Modal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  showCloseButton: PropTypes.bool.isRequired,
  showHeading: PropTypes.bool.isRequired,
  showSubmitButton: PropTypes.bool.isRequired,
  customClass: PropTypes.string,
  closeCallback: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Modal;
