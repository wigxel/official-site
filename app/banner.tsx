import type React from "react";
import { Cell } from "~/app/cell";
import { ArrowRight } from "~/components/Icons";

export function Banner() {
  return (
    <header className={"wg-row"}>
      <Cell size={2}>
        <span>LOGO</span>
      </Cell>
      <div className={"wg-row"}>
        <Cell size={1} className={"items-center"}>
          PORTFOLIO
        </Cell>
        <Cell size={1} className={"items-center"}>
          SERVICES
        </Cell>
        <Cell size={1} className={"items-center"}>
          ABOUT
        </Cell>
        <Cell size={1} className={"items-center p-0 relative"}>
          <button
            type={"button"}
            className={
              "flex items-center text-primary px-4 border absolute inset-0 w-full justify-between"
            }
          >
            GET STARTED <ArrowRight fontSize={"2rem"} />
          </button>
        </Cell>
      </div>
    </header>
  );
}
