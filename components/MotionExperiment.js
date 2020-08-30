import React from "react";
import * as R from "ramda";
import { css } from "@emotion/css";
import tw from "@tailwindcssinjs/macro";
import PortfolioCard from "./Cards/PortfolioCard";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";

export default function MotionExperiment() {
  const [items] = React.useState([
    { title: "Kwivar", id: "KWI" },
    { title: "Femality", id: "FEM" },
    { title: "Salad Freak", id: "SAL" },
  ]);
  const [selected, setSelected] = React.useState(null);
  const container = React.useRef();
  const getDimen = () =>
    R.pick(["width", "height"], container.current.getBoundingClientRect());

  return (
    <AnimateSharedLayout type="crossfade">
      <motion.section className={css(tw`flex`)}>
        <section className={css(tw`w-full min-h-screen flex flex-1`)}>
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
          className={css(
            tw`left-0 right-0 h-screen absolute flex items-center justify-center`
          )}
          style={{
            pointerEvents: selected ? "all" : "none",
          }}
        >
          <AnimatePresence>
            {selected && (
              <motion.div
                layoutId={selected.id}
                animate="fullscreen"
                className={css(tw`border-red-500 box-border`)}
              >
                <PortfolioCard
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
