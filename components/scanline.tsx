import { Slot } from "@radix-ui/react-slot";
import type React from "react";
import { cn } from "~/lib/utils";

export function Scanline(props: React.ComponentProps<"div">) {
  const { className, style, children } = props;

  return (
    <Slot
      {...props}
      className={cn("scanline-root relative", className)}
      style={{
        ...(style ?? {}),
        // @ts-expect-error
        "--scanline-image":
          "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAGklEQVR4Aa3IIQEAAADCsPcvDddoJgcjuocKFosT7bLfmPAAAAAASUVORK5CYII=)",
      }}
    >
      {children}
    </Slot>
  );
}

export function ScanlineContent() {
  return <div className={"scanline-container inset-0 absolute"} />;
}
