import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import CrossIcon from "../../layouts/iconComponents/CrossIcon";

function Modal(props) {
  const ref = useRef();
  const { styles } = props;
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (props.showModal && ref.current && !ref.current.contains(e.target)) {
        props.closeCallback();
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [props.showModal]);
  return (
    <div className={styles.modal}>
      <div className={styles.modal_content} ref={ref}>
        <div className={styles.modal_header}>
          {props.showHeading ? (
            <span className={styles.heading}>{props.heading}</span>
          ) : null}
          {props.showCloseButton ? (
            <p className={styles.close_modal} onClick={props.closeCallback}>
              <CrossIcon width={15} />
            </p>
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
