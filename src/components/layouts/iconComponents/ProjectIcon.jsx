import * as React from "react"

function ProjectIcon(props) {
  return (
      <svg
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          role="img" width="1em"
          height="1em"
          preserveAspectRatio="xMidYMid meet"
          {...props}
          viewBox="0 0 24 24">
        <path
            fill="none"
            stroke="#6d6d73"
            stroke-width="1.3"
            d="M9 15v8H1v-8h8zm14 0v8h-8v-8h8zM9 1v8H1V1h8zm14 0v8h-8V1h8z"/>
      </svg>
  )
}

export default ProjectIcon
