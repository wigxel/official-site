"use client";
import type React from "react";
import { ArrowRight } from "~/components/Icons";
import { cn } from "~/lib/utils";

export default function Home() {
  return (
    <main className={"wg-column"}>
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
                "flex items-center px-4 border absolute inset-0 w-full justify-between"
              }
            >
              GET STARTED <ArrowRight fontSize={"2rem"} />
            </button>
          </Cell>
        </div>
      </header>
      <section className={"wg-row min-h-screen"}>
        <Cell size={2} />
        <Cell size={2}>
          <h1
            className={"text-6xl font-display"}
            style={{
              fontVariantAlternates: "",
              fontVariantLigatures: "historical-ligatures",
            }}
          >
            Expertly designing and engineering your success, every step of the
            way
          </h1>
        </Cell>
        <Cell size={2} />
      </section>
    </main>
  );
}

function Cell(props: React.ComponentProps<"div"> & { size: number }) {
  return (
    <div
      {...props}
      className={cn("wg-cell px-6 py-4", props.className)}
      style={{
        width: `calc(var(--wg-viewport-width) / 6 * ${props.size})`,
      }}
    >
      {props.children}
    </div>
  );
}
