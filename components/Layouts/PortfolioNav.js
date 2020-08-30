import React from "react";
import styled from "@emotion/styled";
import tw from "@tailwindcssinjs/macro";
import HideReveal from "../Typography/HideReveal";
import { motion, AnimateSharedLayout } from "framer-motion";

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
    ${tw`relative py-4 tracking-widest my-2 inline-block px-4 text-xs uppercase`}

    &.active {
      ${tw`text-white font-sans`}
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
  const [page, setPage] = React.useState(null);
  const activeElse = (e, a, b) => (page === e ? a : b);

  return (
    <AnimateSharedLayout>
      <StyledAside>
        {["UI/UX", "Mobile", "Web", "Contact"].map((e, idx) => (
          <li
            key={idx}
            className={activeElse(e, "active", "")}
            onClick={() => {
              setPage(e);
            }}
          >
            {page === e && (
              <motion.div
                layoutId="indicator"
                className="indicator"
                initial={false}
                transition={spring}
              />
            )}
            <HideReveal text={e} />
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
