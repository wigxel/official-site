import React from "react";
import { css } from "@emotion/css";
import styled from "@emotion/styled";

const Style = styled.div`
  overflow: hidden;
  position: relative;

  span {
    transition: transform 0.75s cubic-bezier(0.19, 1, 0.22, 1);
  }

  > span {
    display: inline-block;
    transform: translateY(${(a) => (a.reveal ? "100%" : "0%")});
  }

  ${console.log}
`;

const SlideComponent = (props) => {
  console.log("Slide Component > ", props);
  return (
    <Style data-text={props.text} reveal={!props.reveal}>
      <span>{props.children}</span>
    </Style>
  );
};

export default SlideComponent;
