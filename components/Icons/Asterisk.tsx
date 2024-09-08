import * as React from "react";
import { SVGProps, memo } from "react";
const SvgAsterisk = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 67 67"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m3.71 31.386 4.465-13.68 13.968 4.464 7.344 5.616-2.736-8.64V4.458h14.4v14.688l-2.88 8.784 7.2-5.328 13.968-4.464 4.464 13.68-13.968 4.608h-9.216l7.2 5.184 8.64 11.808-11.664 8.496-8.496-11.808-2.88-8.784-2.736 8.496-8.64 11.808-11.664-8.496 8.64-11.808 7.488-5.328-8.928-.144L3.71 31.386Z"
      fill="#fff"
    />
  </svg>
);
const Memo = memo(SvgAsterisk);
export default Memo;
