import React from "react";
import styled from "@emotion/styled";
import tw from "@tailwindcssinjs/macro";
import HideReveal from "../Typography/HideReveal";
import { motion, AnimateSharedLayout } from "framer-motion";
import { usePages, usePageAction } from "../../stores/pageStore";

const StyledAside = styled.aside`
  ${tw`
    flex 
    flex-col 
    justify-end
    flex-grow-0 
    fixed
    bottom-0
    pr-8
    h-screen
    flex-shrink-0 
     left-0
    w-24
   `}

  li {
    ${tw`relative py-4 my-0 inline-block px-4 text-xs uppercase`}
    writing-mode: tb;
    letter-spacing: 3px;

    > span {
      ${tw`font-sans`}
      position: relative;
    }

    &.active {
      ${tw`text-white`}
    }
  }

  .indicator {
    ${tw`bg-darkgray`}
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    position: absolute;
  }
`;

const Aside = () => {
  const { pages, currentPage } = usePages();
  const { setCurrentPage } = usePageAction();
  const activeElse = (e, a, b) => (currentPage === e ? a : b);

  return (
    <AnimateSharedLayout>
      <StyledAside>
        {pages.map((pageTitle, idx) => (
          <li
            key={idx}
            className={activeElse(idx, "active", "")}
            // onClick={() => setCurrentPage(idx)}
          >
            {currentPage === idx && (
              <motion.div
                layoutId="indicator"
                className="indicator"
                initial={false}
                transition={spring}
              />
            )}
            <span>{pageTitle}</span>
          </li>
        ))}
      </StyledAside>
    </AnimateSharedLayout>
  );
};

const spring = {
  type: "spring",
  stiffness: 500,
  damping: 30,
};

export default Aside;
