"use client";
import { motion } from "framer-motion";
import type React from "react";
import Marquee from "~/app/Marquee";

export function MarqueeCell() {
  return (
    <motion.div
      initial={{ height: 0 }}
      whileInView={{ height: 200 }}
      transition={{ duration: 1 }}
      className={"overflow-hidden"}
    >
      <Marquee
        className={"font-display text-[10vw] font-black"}
        text={
          <div className={"flex items-center"}>
            <span className={"inline-block leading-[2ex]"}>WE ARE WIGXEL</span>
            <span
              className={
                "h-[2.2ex] inline-block font-display !font-[400] mx-[2vw]"
              }
            >
              *
            </span>
          </div>
        }
      />
    </motion.div>
  );
}
