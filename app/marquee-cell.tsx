"use client";
import { motion } from "framer-motion";
import type React from "react";
import { MarqueeContainer } from "~/app/Marquee";
import { Asterisk } from "~/components/Icons";
import { cn } from "~/lib/utils";
import { displayAlt } from "~/styles/font";

export function MarqueeCell() {
  return (
    <motion.div
      initial={{ height: 0 }}
      whileInView={{ height: "auto" }}
      transition={{ duration: 1 }}
      className={"overflow-hidden group"}
    >
      <MarqueeContainer speed={40}>
        <div
          className={cn(
            displayAlt.className,
            "flex items-center text-[10vw] font-bold tracking-tighter",
          )}
        >
          <span className={"inline-block leading-[2ex]"}>WE ARE WIGXEL</span>
          <span className={"mx-[3vw]"}>
            <span
              className={"animate-spin block group-hover:paused"}
              style={{
                animationDuration: "22s",
                animationDirection: "reverse",
              }}
            >
              <Asterisk width={"4vw"} />
            </span>
          </span>
        </div>
      </MarqueeContainer>
    </motion.div>
  );
}
