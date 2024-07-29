import { Slot } from "@radix-ui/react-slot";
import type React from "react";
import { cn } from "~/lib/utils";

export function Cell(
  props: React.ComponentProps<"div"> & {
    asChild?: boolean;
    size: 1 | 2 | 3 | 4 | 5 | 6;
  },
) {
  const Comp = props.asChild ? Slot : "div";

  return (
    <Comp
      {...props}
      className={cn("wg-cell px-6 py-4", props.className)}
      style={{
        width: `calc(var(--wg-viewport-width) / 6 * ${props.size})`,
      }}
    >
      {props.children}
    </Comp>
  );
}
