"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import React, { useRef } from "react";
import { Cell } from "~/app/cell";

const images: SliderItem[] = [
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
].map((e) => ({ ...e, id: crypto.randomUUID() }));

export function ClientsAndPartners() {
  return (
    <SliderProvider duration={4} items={images}>
      <section className="wg-row">
        {images.map((_, index) => {
          return <ClientCard key={String(index)} index={index} />;
        })}
      </section>{" "}
    </SliderProvider>
  );
}

function FadeBox(props: {
  isActive: boolean;
  data: { url: string; alt: string };
  duration: number;
}) {
  const clientCardVariants = React.useMemo(
    () => ({
      hide: { opacity: 0, scale: 0.5 },
      show: { opacity: 1, scale: 1 },
    }),
    [],
  );
  const { data, duration, isActive = false } = props;

  return (
    <motion.div
      variants={clientCardVariants}
      initial={"hide"}
      animate={isActive ? "show" : "hide"}
      transition={{ duration: duration / 2, delay: duration / 2 }}
      className={"flex items-center justify-center"}
      style={{
        width: "calc(var(--wg-viewport-width) / 6 * 1)",
      }}
    >
      <div
        className={
          "w-[40%] flex items-center relative justify-center border-white self-center aspect-[16/6] overflow-hidden"
        }
      >
        <Image src={data.url} alt={data.alt} fill className="object-contain" />
      </div>
    </motion.div>
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

type SliderItem = {
  id: string;
  alt: string;
  url: string;
  category: string;
};

type SliderValue = {
  items: SliderItem[];
  offset: number;
  duration: number;
};

const SliderContext = React.createContext<SliderValue>({
  items: [],
  offset: 0,
  duration: 1000,
});

function SliderProvider(props: {
  duration: number;
  items: SliderItem[];
  children: React.ReactNode;
}) {
  const { items, duration, children } = props;

  const slide_duration = React.useRef(duration);
  const [offset, setOffset] = React.useState(0);
  const total_items = items.length + 1;

  React.useEffect(() => {
    const interval = slide_duration.current * 1000;
    setOffset(1);
    const id = setInterval(() => {
      setOffset((e) => {
        if (e >= total_items - 1) {
          slide_duration.current = 0;
          return 0;
        }
        slide_duration.current = 3;
        return e + 1;
      });
    }, interval);

    return () => clearInterval(id);
  }, [total_items]);

  return (
    <SliderContext.Provider
      value={{
        items,
        offset,
        duration: slide_duration.current,
      }}
    >
      {children}
    </SliderContext.Provider>
  );
}

function ClientCard(props: {
  index: number;
}) {
  const { index } = props;
  const {
    items: _items,
    offset,
    duration: slide_duration,
  } = React.useContext(SliderContext);
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = React.useState(240);

  const items = React.useMemo(() => {
    const arr = moveToStart(_items, index);
    return [...arr, { ...arr[0], id: crypto.randomUUID() }];
  }, [_items, index]);

  React.useLayoutEffect(() => {
    const clientWidth = ref.current?.clientWidth;
    clientWidth ? setWidth(clientWidth) : null;
  }, []);

  return (
    <Cell
      ref={ref}
      size={1}
      className={
        "aspect-[320/212] flex flex-col items-center relative justify-center"
      }
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
            duration: slide_duration / 2,
            delay: slide_duration / 2,
          }}
          className={"flex left-0 flex-1 absolute"}
        >
          {items.map((item, innerIndex) => {
            return (
              <FadeBox
                key={item.id + index}
                data={item}
                isActive={innerIndex === offset}
                duration={slide_duration}
              />
            );
          })}
        </motion.div>
      </section>

      <p
        className={
          "absolute flex-shrink-0 bottom-0 start-0 flex px-6 font-[300] text-sm text-muted-foreground py-4"
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
