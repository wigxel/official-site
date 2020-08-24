import * as React from "react";

function SvgComponent(props) {
  return (
    <svg
      width={props.width || "100%"}
      height={props.height || "30"}
      viewBox="0 0 294.857 15.317"
    >
      <g data-name="Group 97">
        <path
          data-name="Path 65"
          d="M.321.658l16.343 14 16.343-14 16.345 14 16.343-14 16.343 14 16.341-14 16.341 14 16.343-14 16.345 14 16.343-14 16.344 14 16.345-14 16.347 14 16.342-14 16.348 14 16.349-14 16.351 14 16.351-14"
          fill="none"
          stroke="#000"
          strokeMiterlimit={10}
        />
      </g>
    </svg>
  );
}

export default SvgComponent;
