import * as React from "react"

function HorizontalAlignIcon(props) {
  return (
    <svg
      width={15}
      height={15}
      viewBox="0 0 15 15"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M0 0h15v3H0V0zm0 6h15v3H0V6zm0 6h15v3H0v-3z" />
    </svg>
  )
}

export default HorizontalAlignIcon
