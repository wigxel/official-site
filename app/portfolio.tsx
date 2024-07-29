import React, { type ComponentProps } from "react";
import { Cell } from "~/app/cell";
import { cn } from "~/lib/utils";

export function Portfolio() {
  return (
    <>
      <section className="wg-row">
        <Cell size={2} className={"items-start"}>
          <h2 className={"text-neutral-500 text-[14px] font-[300] uppercase"}>
            PORTFOLIO
          </h2>
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
        <div className={"wg-row border-grid-border border-t -mt-px"}>
          <ProjectCard
            size={2}
            count={4}
            title={"FOODSHARE"}
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
    </>
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
        <div className={"bg-black/[0.22] flex-1"} />
        <div className={"px-6 py-4 basis-[80px] shrink-0 items-center flex"}>
          <div className={"flex flex-col flex-1"}>
            <h4 className={"text-[14px] font-medium tracking-wide"}>
              {props.title}
            </h4>
            <p className={"text-neutral-500 font-[300] text-[14px] uppercase"}>
              {props.description}
            </p>
          </div>
          <div
            className={"font-mono text-3xl tracking-tighter font-thin"}
          >{`0${props.count}`}</div>
        </div>
      </Cell>
    </Cell>
  );
});
