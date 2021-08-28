import * as React from "react";

function DeleteStackIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      width="1em"
      height="1em"
      viewBox="0 0 48 48"
      {...props}
    >
      <g fill="#D1C4E9">
        <path d="M38 7H10c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h28c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM38 19H10c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h28c1.1 0 2-.9 2-2v-6c0-1.1-.9-2-2-2zM38 31H10c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h28c1.1 0 2-.9 2-2v-6c0-1.1-.9-2-2-2z" />
      </g>
      <circle fill="#F44336" cx={38} cy={38} r={10} />
      <g fill="#fff">
        <path d="M43.31 41.181l-2.12 2.122-8.485-8.484 2.121-2.122z" />
        <path d="M34.819 43.31l-2.122-2.12 8.484-8.485 2.122 2.121z" />
      </g>
    </svg>
  );
}

export default DeleteStackIcon;
