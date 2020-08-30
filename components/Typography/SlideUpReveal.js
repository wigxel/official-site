import React from "react";
import { css } from "@emotion/css";
import { motion } from "framer-motion";
import styled from "@emotion/styled";

const Style = styled.div`
  overflow: hidden;
  position: relative;

  span {
    display: inline-block;
  }
`;

const SlideComponent = (props) => {
  return (
    <Style data-text={props.text} reveal={!props.reveal}>
      <motion.span
        initial={{ y: "100%" }}
        animate={{ y: props.reveal ? "0%" : "100%" }}
        transition={{ easings: "easeOut", ...props.transition }}
      >
        {props.children}
      </motion.span>
    </Style>
  );
};

// const SlideComponent = (props) => {
//   // console.log("Slide Component > ", props);
//   return (
//     <Style data-text={props.text} reveal={!props.reveal}>
//       <span>{props.children}</span>
//     </Style>
//   );
// };

export default SlideComponent;
