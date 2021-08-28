import React, { useState } from "react";
import PropTypes from "prop-types";
import { useRef } from "react";
import useOutsideClick from "../../hooks/useOutSideClick";
function ResizableTextArea(props) {
  const textareaRef = useRef();
  const [rows, setRows] = useState(props.rows);
  const [minRows, setMinRows] = useState(props.minRows);
  const [maxRows, setMaxRows] = useState(props.maxRows);

  useOutsideClick(textareaRef, props.outsideClickCallback);

  const handleChange = (event) => {
    const textareaLineHeight = 24;

    const previousRows = event.target.rows;
    event.target.rows = minRows; // reset number of rows in textarea

    const currentRows = ~~(event.target.scrollHeight / textareaLineHeight);

    if (currentRows === previousRows) {
      event.target.rows = currentRows;
    }

    if (currentRows >= maxRows) {
      event.target.rows = maxRows;
      event.target.scrollTop = event.target.scrollHeight;
    }
    props.setValue(event.target.value);
    setRows(currentRows < maxRows ? currentRows : maxRows);
  };

  return (
    <textarea
      ref={textareaRef}
      value={props.value}
      rows={rows}
      placeholder={props.placeholder}
      className={props.className}
      onChange={handleChange}
    />
  );
}

ResizableTextArea.defaultProps = {
  value: "",
  rows: 3,
  maxRows: 7,
  minRows: 3,
  className: "textarea",
  placeholder: "this is a placeholder",
  outsideClickCallback: () => {},
};

ResizableTextArea.propTypes = {
  setValue: PropTypes.func.isRequired,
  rows: PropTypes.number,
  maxRows: PropTypes.number,
  minRows: PropTypes.number,
  className: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  outsideClickCallback: PropTypes.func,
};

export default ResizableTextArea;
