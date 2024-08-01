import { motion, useScroll } from "framer-motion";
import { default as Image } from "next/image";
import React, { type ComponentProps, useRef } from "react";
import { Cell } from "~/app/cell";
import { ArrowRight } from "~/components/Icons";
import { Scanline, ScanlineContent } from "~/components/scanline";
import { cn } from "~/lib/utils";

export function Banner() {
  const { scrollY } = useScroll();
  const bannerRef = useRef<HTMLDivElement>(null);

  // useMotionValueEvent(scrollY, "", (latest) => {
  //   if (latest < 200) {
  //     return animate("#00000000", "rgba(0,0,0,0.25)", {
  //       onComplete: () => console.log("Clie"),
  //       onUpdate: (value) => {
  //         console.log("Page scroll: ", latest, value);
  //         // @ts-expect-error
  //         bannerRef.current.style.backgroundColor = value;
  //       },
  //     });
  //   }
  // });

  return (
    <motion.header
      ref={bannerRef}
      initial={{
        background: "#00000000",
      }}
      className={"wg-row sticky top-0 z-20"}
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
          <button
            type={"button"}
            className={
              "flex items-center text-primary px-4 border absolute inset-0 w-full justify-between"
            }
          >
            GET STARTED <ArrowRight fontSize={"2rem"} />
          </button>
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
          "cursor-pointer items-center text-neutral-500 text-xs tracking-widest",
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
