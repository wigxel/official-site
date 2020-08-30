import React from "react";
import styled from "@emotion/styled";
import tw from "@tailwindcssinjs/macro";
import HideReveal from "../Typography/HideReveal";

const StyledAside = styled.aside`
  ${tw`
    flex 
    flex-col 
    justify-end
    flex-grow-0 
    fixed
    bottom-0
    pr-6
    h-screen
    flex-shrink-0 
     left-0
    w-24
   `}

  li {
    writing-mode: tb;
    ${tw`py-4 tracking-widest my-2 inline-block px-4 text-xs uppercase`}

    &.active {
      ${tw`bg-darkgray text-white font-sans`}
    }
  }
`;

const Aside = () => {
  return (
    <StyledAside>
      {["UI/UX", "Mobile", "Web", "Contact"].map((e, idx) => (
        <li key={idx} className={e === "Mobile" ? "active" : ""}>
          <HideReveal text={e} />
        </li>
      ))}
    </StyledAside>
  );
};

export default Aside;
