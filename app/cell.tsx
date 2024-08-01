import { Slot } from "@radix-ui/react-slot";
import type React from "react";
import { cn } from "~/lib/utils";

export function Cell(
  props: React.ComponentProps<"div"> & {
    asChild?: boolean;
    size: 1 | 2 | 3 | 4 | 5 | 6;
  },
) {
  const { style, asChild, className, size, children, ...PROPS } = props;
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      {...PROPS}
      className={cn("wg-cell px-6 py-4", className)}
      style={{
        width: `calc(var(--wg-viewport-width) / 6 * ${size})`,
        ...(style ?? {}),
      }}
    >
      {children}
    </Comp>
  );
}
