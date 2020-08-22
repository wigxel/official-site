import React from "react";
import tw from "@tailwindcssinjs/macro";
import styled from "@emotion/styled";
import { H3 } from "../Typography";
import { css } from "@emotion/css";

const StyledPCard = styled.div`
  ${tw`
    rounded-md
    w-full 
    mx-4
    max-w-xs
    bg-darkgray p-8 text-beige
    flex flex-col justify-end
    duration-300 ease-in-out
    hover[rounded-bl-large rounded-tr-large]
    shadow-xl
  `}

  max-width: 300px;
  height: 500px;

  h3 {
    ${tw`font-sans text-white cursor-default font-light`}
  }
`;

export const PortfolioCard = ({ title }) => {
  return (
    <StyledPCard>
      <div className={css(tw`w-12 h-12 rounded-full bg-white`)}></div>
      <H3>{title}</H3>
    </StyledPCard>
  );
};

export default PortfolioCard;
