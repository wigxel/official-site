import React from "react";
import tw from "@tailwindcssinjs/macro";
import styled from "@emotion/styled";
import { H3, H4 } from "../Typography";
import { css } from "@emotion/css";
import { motion, AnimatePresence } from "framer-motion";
import { X as XIcon } from "react-feather";

const StyledPCard = styled.div`
  width: 220px;
  height: 400px;
  box-sizing: border-box;

  ${tw`
    bg-darkgray p-8
    flex flex-col justify-end
    duration-300 ease-in-out
    hover[shadow-xl]
    shadow-xl
    rounded-xl
    mx-4
  `}

  ${(e) =>
    e.expand &&
    tw`
      mx-0
      rounded-none
    `}

  h3 {
    ${tw`font-sans text-white cursor-default font-light`}
  }
`;

const variants = {
  hover: { y: -10 },
};

const iconVariants = {
  initial: { x: 100, opacity: 0 },
  fullscreen: {
    x: 0,
    opacity: 1,
    transition: {
      delay: 0.8,
    },
  },
};

export const PortfolioCard = ({
  id,
  title,
  expand,
  onClick,
  full,
  style,
  ...props
}) => {
  return (
    <motion.div
      layout
      layoutId={id}
      whileHover="hover"
      variants={variants}
      onTap={onClick}
    >
      <StyledPCard expand={full} style={style}>
        <motion.button
          onClick={props.onClose}
          initial={{ y: -100, opacity: 0 }}
          variants={{
            fullscreen: { y: 0, opacity: 1, transition: { delay: 1 } },
          }}
          className={css(
            tw`w-12 h-12 border text-white rounded-full flex items-center justify-center top-0 right-0 m-20 absolute`
          )}
        >
          <span>CLOSE</span>
        </motion.button>
        <motion.hgroup layout className={css(tw`flex items-center`)}>
          <H4 className={css(tw`font-bold text-beige`)}>
            <motion.span
              layout
              initial={{ fontSize: "16px" }}
              variants={{
                fullscreen: {
                  fontSize: "34px",
                  transition: { delay: 0.6, easings: "easeOut" },
                },
              }}
              style={{ transformOrigin: "bottom left" }}
            >
              {title}
            </motion.span>
          </H4>
          <AnimatePresence>
            {full && (
              <motion.div
                layout
                initial="initial"
                exit="initial"
                variants={iconVariants}
                className={css(tw`w-10 h-10 rounded-full bg-white ml-5`)}
              />
            )}
          </AnimatePresence>
        </motion.hgroup>
        <AnimatePresence>
          {full && (
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              variants={{
                fullscreen: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: 1,
                  },
                },
              }}
              className={css(tw`max-w-lg text-beige opacity-75`)}
            >
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Necessitatibus unde fugit incidunt reiciendis exercitationem fuga,
              cum doloremque nostrum, repudiandae dignissimos expedita
              distinctio perferendis culpa sed repellendus laudantium assumenda
              deleniti voluptate?
            </motion.p>
          )}
        </AnimatePresence>
      </StyledPCard>
    </motion.div>
  );
};

export default PortfolioCard;
