import React, { useState, useEffect, useRef } from "react";

export default function CustomSelect({
  prompt = "Select one",
  value,
  onChange,
  options,
  label,
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ddRef = useRef(null);
  console.log("value insider", value);
  useEffect(() => {
    addClickHandlers();
    return () => removeClickHandlers();
  }, []);

  function filter(options) {
    return options.filter(
      (option) => option[label].toLowerCase().indexOf(query.toLowerCase()) > -1
    );
  }

  function addClickHandlers() {
    ["click", "touchend"].map((e) =>
      document.addEventListener(e, toggle, false)
    );
  }

  function removeClickHandlers() {
    ["click", "touchend"].map((e) =>
      document.addEventListener(e, toggle, false)
    );
  }

  function toggle(e) {
    setOpen(e && e.target === ddRef.current);
  }

  function displayValue() {
    if (query.length > 0) return query;
    if (value) return value[label];
  }

  return (
    <div style={{ width: "200px" }}>
      <div className="dropdown">
        <div className="control">
          <div className="selected-value">
            <input
              type="text"
              placeholder={value ? value[label] : prompt}
              ref={ddRef}
              onClick={toggle}
              value={displayValue()}
              onChange={(e) => {
                onChange(null);
                setQuery(e.target.value);
              }}
            />
          </div>
          <div className={`arrow ${open ? "open" : ""}`} />
        </div>
        <div className={`options ${open ? "open" : ""}`}>
          {filter(options).map((option) => (
            <div
              className={`option ${value === option ? "selected" : ""}`}
              onClick={() => {
                setQuery("");
                onChange(option);
                toggle();
              }}
              key={option[label]}
            >
              <div className="user-profile">
                <span className="icon">
                  <span>{option[label]}</span>
                </span>
              </div>
              <span className="label">{option[label]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
