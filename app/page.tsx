"use client";
import { Slot } from "@radix-ui/react-slot";
import React, { type ComponentProps } from "react";
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
                "flex items-center text-primary px-4 border absolute inset-0 w-full justify-between"
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
      <section className="wg-row">
        {Array.from({ length: 6 }, (_, index) => {
          return <ClientCard key={String(index)} />;
        })}
      </section>
      <section className="wg-row">
        <Cell size={2} className={"items-start"}>
          <h2 className={"text-neutral-500 text-[14px]"}>PORTFOLIO</h2>
        </Cell>
        <Cell size={2} className={"min-h-[216px] items-end"}>
          <div className={"mt-24"}>
            <h3 className={"font-display text-5xl"}>Recent Works</h3>
          </div>
        </Cell>
        <Cell size={2} className={"items-end"} style={{ fontSize: "" }}>
          <p className={"text-[14px]"}>ALL PROJECTS</p>
        </Cell>
      </section>
      <section>
        <div className={"wg-row items-start"}>
          <ProjectCard
            count={1}
            size={4}
            title={"CMK CULINARY"}
            description={"Website Redesign"}
          />
          <ProjectCard
            count={2}
            title={"MAJEURS"}
            description={"Website + Ecommerce"}
            size={2}
          />
        </div>
        <div className={"wg-row"}>
          <Cell size={2} />
          <ProjectCard
            size={2}
            count={3}
            title={"CREVATAL"}
            description={"Website Redesign"}
          />
          <Cell size={2} />
        </div>
        <div className={"wg-row"}>
          <ProjectCard
            size={2}
            count={4}
            title={"FOOD SHARE"}
            description={"SaaS"}
          />
          <ProjectCard
            size={4}
            count={5}
            title={"GREEN THUMB"}
            description={"SaaS"}
          />
        </div>
      </section>
    </main>
  );
}

const ProjectCard = React.forwardRef<
  HTMLDivElement,
  ComponentProps<typeof Cell> & {
    count: number;
    title: React.ReactNode;
    description: React.ReactNode;
  }
>(function ProjectCard(props, ref) {
  const { children, className, ...PROPS } = props;
  const size_aspect_map = {
    1: "aspect-square",
    2: "aspect-square",
    3: "aspect-square",
    4: "aspect-[1276/791]",
    5: "aspect-[1276/791]",
    6: "aspect-[1276/791]",
  } as const;

  return (
    <Cell {...PROPS} className={"p-0 items-start"}>
      <Cell
        ref={ref}
        {...PROPS}
        className={cn(
          "flex items-stretch flex-col p-0 border-b border-grid-border",
          size_aspect_map[props.size],
          className,
        )}
      >
        <div className={"bg-black/[0.22] flex-1 h-[200px]"} />
        <div className={"px-6 py-4 basis-[99px] items-center flex"}>
          <div className={"flex flex-col flex-1"}>
            <h4 className={"text-[14px]"}>{props.title}</h4>
            <p className={"text-neutral-500 text-[14px] uppercase"}>
              {props.description}
            </p>
          </div>
          <div className={"font-mono"}>{`0${props.count}`}</div>
        </div>
      </Cell>
    </Cell>
  );
});

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

function ServiceCard(props: {
  children: React.ReactNode;
  heading: React.ReactNode;
  content: React.ReactNode;
}) {
  return (
    <Cell asChild size={2} className={"aspect-square justify-end flex-col"}>
      <li>
        <div className={"flex-1 flex items-center justify-center"}>
          {props.children}
        </div>
        <div className={"flex flex-col w-full"}>
          <dt className={"font-mono uppercase text-xl"}>{props.heading}</dt>
          <dd className={"text-muted-foreground font-[100] max-w-sm"}>
            {props.content}
          </dd>
        </div>
      </li>
    </Cell>
  );
}

function Cell(
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

const ImagePlaceholder = (
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
