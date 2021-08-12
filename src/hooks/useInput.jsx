import { useState, useCallback } from "react";
export default function useInput(props) {
  let initialValue = "";
  if (props.value) initialValue = props.value;
  const [value, setValue] = useState(initialValue);
  const input = (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      {...props}
    />
  );
  return [value, input, setValue];
}
