import type React from "react";
import { Cell } from "~/app/cell";

export function Hero() {
  return (
    <section className={"wg-row aspect-[16/9]"}>
      <Cell size={2} />
      <Cell size={2}>
        <h1
          className={"text-6xl font-display"}
          style={{
            fontVariantAlternates: "",
            fontVariantLigatures: "historical-ligatures",
          }}
        >
          Expertly designing and engineering your success, every step of the way
        </h1>
      </Cell>
      <Cell size={2} />
    </section>
  );
}
