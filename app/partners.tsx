"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import React, { useRef } from "react";
import { Cell } from "~/app/cell";

const images = [
  {
    alt: "Foodshare",
    url: "/assets/images/logos/foodshare.png",
    category: "Client + Partner",
  },
  { alt: "Vercel", url: "/assets/images/logos/vercel.png", category: "Client" },
  // {
  //   alt: "Contentful",
  //   url: "/assets/images/logos/contentful.png",
  //   category: "Content management",
  // },
  // {
  //   alt: "CMK Culinary",
  //   url: "/assets/images/logos/cmk.png",
  //   category: "Client",
  // },
  // {
  //   alt: "Majeurs Holdings",
  //   url: "/assets/images/logos/majeurs.png",
  //   category: "Client",
  // },
  // {
  //   alt: "Contentful",
  //   url: "/assets/images/logos/contentful.png",
  //   category: "Content management",
  // },
].map((e) => ({ ...e, id: crypto.randomUUID() }));

export function ClientsAndPartners() {
  return (
    <section className="wg-row">
      {Array.from({ length: images.length }).map((_, index) => {
        return <ClientCard key={String(index)} items={images} index={index} />;
      })}
    </section>
  );
}

const clientCardVariants = {
  hide: { x: "100%", opacity: 0 },
  fadeInRight: { x: "0%", opacity: 1 },
  fadeOutLeft: { x: "-100%", opacity: 0 },
};

function A({ data, delay }) {
  const [state, setState] = React.useState("fadeInRight");
  const DURATION = 2;

  return (
    <div
      // variants={clientCardVariants}
      // initial={""}
      // animate={state}
      // transition={{ duration: DURATION, delay: delay * DURATION }}
      // onAnimationStart={() => {
      //   console.log("animation started");
      // }}
      // onAnimationComplete={() => {
      //   console.log("animation end");
      //   setState("fadeOutLeft");
      // }}
      className={
        "w-[40%] flex items-center relative justify-center border-white self-center aspect-[16/6] overflow-hidden"
      }
      // viewport={{ once: true }}
    >
      <Image src={data.url} alt={data.alt} fill className="object-contain" />
    </div>
  );
}

function moveToStart<T>(items: T[], index: number) {
  // Check if the index is within the bounds of the array
  if (index < 0 || index >= items.length) {
    throw new Error("Index out of bounds");
  }

  // Use array slicing to move the elements before the index to the end
  return [...items.slice(index), ...items.slice(0, index)];
}

function ClientCard(props: {
  items: Array<{ id: string; url: string; category: string; alt: string }>;
  index: number;
  duration: number;
}) {
  const { items: _items, index, duration = 3 } = props;

  const SLIDE_DURATION = React.useRef(duration);
  const [width, setWidth] = React.useState(240);
  const items = React.useMemo(() => {
    const arr = moveToStart(_items, index);
    return [...arr, arr[0]];
  }, [_items, index]);
  const [offset, setOffset] = React.useState(0);
  const ref = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const interval = SLIDE_DURATION.current * 1000;
    setOffset(1);

    const id = setInterval(() => {
      setOffset((e) => {
        if (e >= items.length - 1) {
          SLIDE_DURATION.current = 0;
          return 0;
        }
        SLIDE_DURATION.current = 3;
        return e + 1;
      });
    }, interval);

    return () => clearInterval(id);
  }, [items]);

  React.useLayoutEffect(() => {
    const clientWidth = ref.current?.clientWidth;
    clientWidth ? setWidth(clientWidth) : null;
  }, []);

  return (
    <Cell
      ref={ref}
      size={1}
      className={"aspect-[320/212] flex flex-col items-center justify-center"}
    >
      <section
        className={"flex left-0 flex-1 relative items-center overflow-hidden"}
        style={{
          width: "calc(var(--wg-viewport-width) / 6 * 1)",
        }}
      >
        <motion.div
          animate={{ x: -(offset * width) }}
          transition={{
            duration: SLIDE_DURATION.current / 2,
            delay: SLIDE_DURATION.current / 2,
          }}
          className={"flex left-0 flex-1 absolute"}
        >
          {items.map((item, innerIndex) => {
            return (
              <div
                key={item.id}
                className={"flex items-center justify-center"}
                style={{
                  width: "calc(var(--wg-viewport-width) / 6 * 1)",
                }}
              >
                <A data={item} delay={0.01} />
              </div>
            );
          })}
        </motion.div>
      </section>

      <p
        className={
          "absolute bottom-0 start-0 flex px-6 font-[300] text-sm text-muted-foreground py-4"
        }
      >
        Non
        {/*{items.category}*/}
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
