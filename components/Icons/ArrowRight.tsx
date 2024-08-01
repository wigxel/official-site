import * as React from "react";
import { type SVGProps, memo } from "react";
const SvgArrowRight = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 39 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <title>Arrow Right</title>
    <path
      d="M24.2 31.923h-1.645c0-6.211 3.054-9.339 5.638-10.868l.303-.174H5.404V19.12h23.071a20.032 20.032 0 0 1-.303-.174c-2.556-1.53-5.617-4.656-5.617-10.868h1.644c0 4.367 1.624 7.548 4.826 9.454a11.942 11.942 0 0 0 4.854 1.588l-.026.879.026.88c-.395.024-9.68.703-9.68 11.045Z"
      fill={"currentColor"}
    />
  </svg>
);
const Memo = memo(SvgArrowRight);
export default Memo;
