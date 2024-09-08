import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import React, { forwardRef } from "react";

const variantConfig = {
  variants: {
    size: {
      h1: "font-display text-5xl tracking-tighter",
      h2: "text-[32px] font-display font-bold",
      h3: "text-[28px] font-display font-bold leading-[112.5%]",
      h4: "font-bold font-body text-mjc-dark-100 text-[24px] capitalize leading-[2ex] tracking-[0.03rem]",
      h5: "text-[20px] font-semibold",
      h6: "text-[14px] font-[300]",
    },
  },
  defaultVariants: {
    size: "h2",
  },
} as const;

export const headingVariant = cva("font-display font-light", variantConfig);

export const HeadingSlot = forwardRef<
  React.ElementRef<"h1">,
  {
    className?: string;
    size: keyof typeof variantConfig.variants.size;
    children: React.ReactNode;
  }
>(function Heading(props, ref) {
  return (
    <Slot
      ref={ref}
      className={headingVariant({
        size: props.size,
        className: props.className,
      })}
    >
      {props.children}
    </Slot>
  );
});

export function Hgroup(props: React.ComponentProps<"hgroup">) {
  const [heading, subHeading] = React.Children.toArray(props.children);

  return (
    <hgroup className={"flex flex-col gap-6"}>
      <Slot className={"leading-[1ex]"}>{heading}</Slot>
      <Slot className={"text-muted-foreground"}>{subHeading}</Slot>
    </hgroup>
  );
}
