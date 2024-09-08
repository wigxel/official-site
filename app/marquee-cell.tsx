"use client";
import type React from "react";
import { MarqueeContainer } from "~/app/Marquee";
import { Asterisk } from "~/components/Icons";
import { cn } from "~/lib/utils";
import { displayAltFont } from "~/styles/font";

export function MarqueeCell() {
  return (
    <div className={"group relative cursor-default"}>
      <div
        className={"absolute inset-0 z-30 pointer-events-none bg-pixelate"}
      />
      <MarqueeContainer speed={30}>
        <div
          className={cn(
            displayAltFont.className,
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
    </div>
  );
}
