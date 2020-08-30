/*
  Example with @emotion/styled

  Required packages for this component:
    "@emotion/react"
    "@emotion/styled"
    "@emotion/babel-plugin"
  
  These packages can be removed if you plan on only using @emotion/styled API:
    "@emotion/css"
    "@emotion/server"
*/

import styled from "@emotion/styled";
import tw from "@tailwindcssinjs/macro";

const Button = styled.button(tw`
  relative
  w-64 min-w-full
  flex justify-center
  py-3 px-4
  border border-transparent
  text-sm leading-5 font-medium
  rounded-md
  text-darkgray
  border-darkgray
  border
  hover[bg-primary text-white border-primary]
  focus[outline-none shadow-outline-indigo]
  transition duration-300 ease-in-out
`);

const IconWrapper = styled.span(tw`
  absolute left-0 inset-y-0
  flex items-center
  pl-3
`);

const Icon = styled.svg(tw`
  h-5 w-5
  text-indigo-500
  group-hover:text-indigo-400
  transition ease-in-out duration-150
`);

Button.Primary = ({ className, children, ...props }) => (
  <Button {...props} className={["group", className].join(" ")}>
    {children}
  </Button>
);

export default Button;
