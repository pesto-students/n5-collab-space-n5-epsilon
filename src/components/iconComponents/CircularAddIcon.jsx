import * as React from "react"

function CircularAddIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <g fill="none" stroke="#6d6d73">
        <circle cx={12} cy={12} r={10} />
        <path d="M12 8v8M8 12h8" />
      </g>
    </svg>
  )
}

export default CircularAddIcon
