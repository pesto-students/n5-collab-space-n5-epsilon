import * as React from "react"

function VerticalAlignIcon(props) {
  return (
    <svg
      width={15}
      height={15}
      viewBox="0 0 15 15"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M15 0v15h-3V0h3zM9 0v15H6V0h3zM3 0v15H0V0h3z" />
    </svg>
  )
}

export default VerticalAlignIcon
