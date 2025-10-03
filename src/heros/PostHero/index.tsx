import type React from "react";
import { Container } from "@/components/container";
import { DateParse } from "@/libs/date.helpers";
import { O } from "@/libs/fp.helpers";
import type { Post } from "@/payload-types";
import { formatAuthors } from "@/utilities/formatAuthors";

export const PostHero: React.FC<{
  post: Post;
}> = ({ post }) => {
  const {
    categories,
    postType,
    heroImage,
    description,
    populatedAuthors,
    publishedAt,
    title,
  } = post;

  const hasAuthors =
    populatedAuthors &&
    populatedAuthors.length > 0 &&
    formatAuthors(populatedAuthors) !== "";

  return (
    <div className="relative flex items-end">
      {/**  <div className="container z-10 relative lg:grid lg:grid-cols-[1fr_48rem_1fr] text-white pb-8">
        <div className="col-start-1 col-span-1 md:col-start-2 md:col-span-2">
          <div className="uppercase text-sm mb-6">
            {categories?.map((category, index) => {
              if (typeof category === "object" && category !== null) {
                const { title: categoryTitle } = category;

                const titleToUse = categoryTitle || "Untitled category";

                const isLast = index === categories.length - 1;

                return (
                  <React.Fragment key={index}>
                    {titleToUse}
                    {!isLast && <React.Fragment>, &nbsp;</React.Fragment>}
                  </React.Fragment>
                );
              }
              return null;DateParse
            })}
          </div>
      </div> */}

      <Container>
        <div className="flex bg-gray-500 w-full aspect-[1340/500] text-black p-[calc(115rem/16)]">
          <div className="max-w-[calc(526rem/16)] font-medium flex flex-col">
            <div className="flex gap-2 text-xs mb-2">
              {postType ? <span className="capitalize text-brand-yellow-500">{postType ?? "No Post Type"}</span> : null}

              <span className="w-px h-4 bg-white/[0.5]" />

              {O.fromNullable(publishedAt).pipe(
                O.flatMap((date) => DateParse.format(date, "MMM do, yyyy")),
                O.map((e) => <span key={"date-content"}>{e}</span>),
                O.getOrNull,
              )}
            </div>

            <hgroup className="flex flex-col gap-3 mb-6">
              <h1 className="text-4xl tracking-tight">{title}</h1>
              <p className="text-base">{description}</p>
            </hgroup>

            {/*Authors*/}
            <div className="flex flex-col md:flex-row gap-4 md:gap-16">
              {hasAuthors && (
                <div className="flex border gap-4 items-center">
                  <div className="flex *:-mx-2 pl-2">
                    <div className="aspect-square w-8 bg-gray-200 border rounded-full border-white" />
                    <div className="aspect-square w-8 bg-gray-200 border rounded-full border-white" />
                  </div>

                  <div className="flex flex-col gap-1 text-xs">
                    <p>{formatAuthors(populatedAuthors)}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>

      {/*<div className="min-h-[80vh] select-none">
        {heroImage && typeof heroImage !== "string" && (
          <Media
            fill
            priority
            imgClassName="-z-10 object-cover"
            resource={heroImage}
          />
        )}
        <div className="absolute pointer-events-none left-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent" />
      </div>*/}
    </div>
  );
};
