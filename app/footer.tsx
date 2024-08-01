import type React from "react";
import { Cell } from "~/app/cell";

export function Footer() {
  return (
    <footer className={"wg-row"}>
      <Cell size={2}>
        <p className={"text-[14px]"}>
          4.844938 PORT-HARCOURT
          <br />
          6.974811 NIGERIA
        </p>
      </Cell>

      <Cell size={4} className={"items-end"}>
        <nav aria-labelledby={"Footer"} className={"flex w-full flex-1"}>
          <ul
            className={
              "flex gap-x-4 *:basis-2/12 w-full text-[14px] tracking-widest text-neutral-500"
            }
          >
            <li className={"hover:underline"}>ABOUT</li>
            <li className={"hover:underline"}>LINKEDIN</li>
            <li className={"hover:underline"}>CAREERS</li>
            <li>(C) {new Date().getFullYear()}</li>
          </ul>
        </nav>
      </Cell>
    </footer>
  );
}
