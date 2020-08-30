import React from "react";
import { css } from "@emotion/css";
import styled from "@emotion/styled";
import tw from "@tailwindcssinjs/macro";
import WigxelLogo from "./Icons/WigxelLogo";
import HideReveal from "./Typography/HideReveal";
import { motion } from "framer-motion";

const StyledHeader = styled(motion.div)`
  ${tw`
    flex justify-between w-full
    h-24 
    items-center
    sticky 
    top-0
    z-10
`}
`;

const Header = () => {
  return (
    <StyledHeader
      variants={{ fullscreen: { backgroundColor: "var(--beige)" } }}
    >
      <section className={css(tw`flex items-center`)}>
        <div
          className={css(
            tw`text-5xl flex justify-center items-center w-24 h-24`
          )}
        >
          <WigxelLogo />
        </div>
        <span className={css(tw`tracking-widest`)}>
          WIGXEL<b>CORP</b>
        </span>
      </section>
      <nav className={css(tw`inline-flex mr-12 uppercase`)}>
        {["Home", "Portfolio"].map((e, idx) => (
          <li key={idx} className={css(tw`inline-block px-4 cursor-pointer`)}>
            <HideReveal text={e} />
          </li>
        ))}
      </nav>
    </StyledHeader>
  );
};

export default Header;
