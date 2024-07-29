import type React from "react";
import { Cell } from "~/app/cell";
import { ImagePlaceholder } from "~/app/partners";

function ServiceCard(props: {
  children: React.ReactNode;
  heading: React.ReactNode;
  content: React.ReactNode;
}) {
  return (
    <Cell asChild size={2} className={"aspect-square justify-end flex-col"}>
      <div>
        <div className={"flex-1 flex items-center justify-center"}>
          {props.children}
        </div>
        <div className={"flex flex-col w-full gap-2"}>
          <h3 className={"font-mono uppercase text-xl"}>{props.heading}</h3>
          <div
            className={
              "text-muted-foreground leading-[2ex] text-[14px] font-[100] max-w-xs"
            }
          >
            {props.content}
          </div>
        </div>
      </div>
    </Cell>
  );
}

export function Services() {
  return (
    <section className={"wg-row"}>
      <ServiceCard
        heading={"Design"}
        content={
          <>
            Elevate your digital experience and delight every user. It all
            starts here
          </>
        }
      >
        {ImagePlaceholder}
      </ServiceCard>

      <ServiceCard
        heading={"ENGINEERING"}
        content={
          <>
            Make zero compromises with implementing your vision using our
            powerful tech stack
          </>
        }
      >
        {ImagePlaceholder}
      </ServiceCard>

      <ServiceCard
        heading={"TESTING"}
        content={
          <>
            Your deadline is our deadline. <br /> Your success is our success
          </>
        }
      >
        {ImagePlaceholder}
      </ServiceCard>
    </section>
  );
}
