import React from "react";
import * as R from "ramda";
import { css } from "@emotion/css";
import tw from "@tailwindcssinjs/macro";
import PortfolioCard from "./Cards/PortfolioCard";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import { H1, P } from "./Typography";

export default function MotionExperiment() {
  const [items] = React.useState([
    { title: "Kwivar", id: "KWI" },
    { title: "Femality", id: "FEM" },
    { title: "Salad Freak", id: "SAL" },
    { title: "E-Hub Forum", id: "EHUB" },
  ]);
  const [selected, setSelected] = React.useState(null);
  const container = React.useRef();
  const getDimen = () =>
    R.pick(["width", "height"], container.current.getBoundingClientRect());

  return (
    <AnimateSharedLayout type="crossfade">
      <motion.section className={css(tw`flex`)}>
        <section
          className={css(tw`relative w-full h-screen flex flex-col flex-1`)}
        >
          <div className={css(tw`self-center mb-8 text-white`)}>
            <H1 bold className={css(tw`font-bold`)}>
              Mobile Friendly
            </H1>
            <P className={css(tw`text-2xl`)}>Some Cool Mobile Apps</P>
          </div>
          <div className={css(tw`w-full flex items-center justify-center`)}>
            {items.map((item, idx) => (
              <PortfolioCard
                key={item.id}
                id={item.id}
                title={item.title}
                expand={selected?.id === item.id}
                onClick={() => {
                  setSelected(item);
                }}
              />
            ))}
          </div>
        </section>
        <div
          ref={container}
          className={css(tw`left-0 right-0 absolute h-screen`)}
          style={{
            pointerEvents: selected ? "all" : "none",
          }}
        >
          <AnimatePresence>
            {selected && (
              <motion.div animate="fullscreen">
                <PortfolioCard
                  id={selected.id}
                  title={selected.title}
                  full
                  onClose={() => setSelected(null)}
                  style={getDimen()}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.section>
    </AnimateSharedLayout>
  );
}
