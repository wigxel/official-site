import { mix, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { default as Image } from "next/image";
import React, { type ComponentProps, useRef } from "react";
import { Cell } from "~/app/cell";
import { ArrowRight } from "~/components/Icons";
import { Scanline, ScanlineContent } from "~/components/scanline";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

const fillMixer = mix("#18183000", "#181830");

export function Banner() {
  const { scrollY } = useScroll();
  const bannerRef = useRef<HTMLDivElement>(null);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (!bannerRef.current) return;
    const progress = latest / 400;
    if (!(progress > 1.1)) {
      bannerRef.current.style.backgroundColor = fillMixer(progress);
    }
  });

  return (
    <motion.header
      ref={bannerRef}
      initial={{
        background: "#00000000",
      }}
      className={"wg-row sticky top-0 z-40"}
      animate={{
        background: scrollY.get() > 200 ? "rgba(0,0,0,0.25)" : undefined,
      }}
    >
      <Cell size={2}>
        <Image
          src={"/assets/images/wigxel-logo.svg"}
          alt={"Wigxel Brand Logo"}
          width={32.59}
          height={22}
          className={"aspect-[32.59/22] w-8"}
        />
      </Cell>

      <ul className={"wg-row"}>
        <NavItem size={1}>PORTFOLIO</NavItem>
        <NavItem size={1}>SERVICES</NavItem>
        <NavItem size={1}>ABOUT</NavItem>
        <Cell
          size={1}
          className={"items-center text-xs tracking-widest p-0 relative"}
        >
          <Button
            type={"button"}
            size={"cell"}
            className={
              "flex w-full h-full items-center text-primary justify-between"
            }
          >
            GET STARTED{" "}
            <ArrowRight color={"currentColor"} fontSize={"1.5rem"} />
          </Button>
        </Cell>
      </ul>
    </motion.header>
  );
}

const NavItem = React.forwardRef<HTMLLIElement, ComponentProps<typeof Cell>>(
  function NavItem(props, ref) {
    const { children, className, ...PROPS } = props;

    return (
      <Cell
        // @ts-expect-error
        ref={ref}
        asChild
        {...PROPS}
        className={cn(
          "cursor-pointer items-center hover:text-white text-neutral-500 text-xs tracking-widest",
          className,
        )}
      >
        <Scanline>
          <li>
            {children}
            <ScanlineContent />
          </li>
        </Scanline>
      </Cell>
    );
  },
);
