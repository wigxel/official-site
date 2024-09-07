import Image from "next/image";
import type React from "react";
import { Cell } from "~/app/cell";

const images = [
  {
    alt: "Foodshare",
    url: "/assets/images/logos/foodshare.png",
    category: "Client + Partner",
  },
  { alt: "Vercel", url: "/assets/images/logos/vercel.png", category: "Client" },
  {
    alt: "Contentful",
    url: "/assets/images/logos/contentful.png",
    category: "Content management",
  },
  {
    alt: "CMK Culinary",
    url: "/assets/images/logos/cmk.png",
    category: "Client",
  },
  {
    alt: "Majeurs Holdings",
    url: "/assets/images/logos/majeurs.png",
    category: "Client",
  },
  {
    alt: "Contentful",
    url: "/assets/images/logos/contentful.png",
    category: "Content management",
  },
];

export function ClientsAndPartners() {
  return (
    <section className="wg-row">
      {images.map((entry, index) => {
        return <ClientCard key={String(index)} data={entry} />;
      })}
    </section>
  );
}

function ClientCard({
  data,
}: { data: { url: string; category: string; alt: string } }) {
  return (
    <Cell
      size={1}
      className={
        "aspect-[320/212] flex flex-col items-center justify-center relative"
      }
    >
      <div
        className={
          "w-[40%] flex items-center relative justify-center border-white self-center aspect-[16/6] overflow-hidden"
        }
      >
        <Image src={data.url} alt={data.alt} fill className="object-contain" />
      </div>
      <p
        className={
          "absolute bottom-0 start-0 flex px-6 font-[300] text-sm text-muted-foreground py-4"
        }
      >
        {data.category}
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
