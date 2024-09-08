import Image from "next/image";
import React, { type ComponentProps } from "react";
import { Cell } from "~/app/cell";
import { cn } from "~/lib/utils";
import type { PortfolioItem } from "~/libs/factories/portfolio";
import { getPortfolios } from "~/libs/fetchers";

export async function Portfolio() {
  const [first, second, third, fourth, fifth] = await getPortfolios();

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
          <PortfolioCard data={first} size={4} />
          <PortfolioCard data={second} size={2} />
        </div>

        <div className={"wg-row"}>
          <Cell size={2} />
          <PortfolioCard size={2} data={third} />
          <Cell size={2} />
        </div>

        <div className={"wg-row border-grid-border border-t -mt-px"}>
          <PortfolioCard size={2} data={fourth} />
          <PortfolioCard size={4} data={fifth} />
        </div>
      </section>
    </>
  );
}

function PortfolioCard({
  data,
  size,
}: { data: PortfolioItem; size: ComponentProps<typeof Cell>["size"] }) {
  if (!data) return null;

  return (
    <ProjectCard
      count={data.order}
      title={data.name}
      description={data.category}
      image={data.imageUrl}
      size={size}
    />
  );
}

const ProjectCard = React.forwardRef<
  HTMLDivElement,
  ComponentProps<typeof Cell> & {
    count: number;
    title: React.ReactNode;
    description: React.ReactNode;
    image?: string;
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
    <Cell {...PROPS} className={"p-0 scanline-root cursor-pointer items-start"}>
      <Cell
        ref={ref}
        {...PROPS}
        className={cn(
          "flex items-stretch flex-col p-0 border-b border-grid-border",
          size_aspect_map[props.size],
          className,
        )}
      >
        <figure className={"bg-black/[0.22] flex-1 relative"}>
          {props.image ? (
            <Image
              src={props.image}
              className={"object-cover object-top"}
              alt={`${props.title}cover`}
              fill
            />
          ) : null}
        </figure>

        <div
          className={
            "px-6 relative py-4 basis-[80px] shrink-0 items-center flex"
          }
        >
          <div className={"scanline-container"} />
          <div className={"flex flex-col uppercase flex-1 justify-center"}>
            <h4 className={"text-[14px] font-medium tracking-wide"}>
              {props.title}
            </h4>
            <p className={"text-neutral-500 font-[300] text-[14px] uppercase"}>
              {props.description}
            </p>
          </div>

          <div
            className={
              "font-display leading-[1] inline-flex items-center tracking-tighter font-thin"
            }
          >
            {`0${props.count}`}
          </div>
        </div>
      </Cell>
    </Cell>
  );
});
