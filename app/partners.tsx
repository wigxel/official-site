import type React from "react";
import { Cell } from "~/app/cell";

export function ClientsAndPartners() {
  return (
    <section className="wg-row">
      {Array.from({ length: 6 }, (_, index) => {
        return <ClientCard key={String(index)} />;
      })}
    </section>
  );
}

function ClientCard() {
  return (
    <Cell
      size={1}
      className={
        "aspect-[320/212] flex flex-col items-center justify-center relative"
      }
    >
      <div
        className={
          "border w-[80%] flex items-center justify-center border-white self-center aspect-[16/6] overflow-hidden"
        }
      >
        {ImagePlaceholder}
      </div>
      <p
        className={
          "absolute bottom-0 start-0 flex px-6 font-[300] text-sm text-muted-foreground py-4"
        }
      >
        Client + Partner
      </p>
    </Cell>
  );
}

export const ImagePlaceholder = (
  <>
    <figure
      className={
        "flex-1 rotate-45 transform w-full flex items-center bg-white justify-center aspect-square"
      }
    >
      IMAGE
    </figure>
  </>
);
