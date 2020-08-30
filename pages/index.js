import { debounce } from "lodash";
import * as R from "ramda";
import { css } from "@emotion/css";
import tw from "@tailwindcssinjs/macro";
import Header from "../components/Header";
import { H1, H4 } from "../components/Typography";
import Aside from "../components/Layouts/PortfolioNav";
import PortfolioCard from "../components/Cards/PortfolioCard";
import MotionExperiment from "../components/MotionExperiment";
import Button from "../components/ButtonStyled";
import ZigZag from "../components/Icons/ZigZag";
import SlideUpReveal from "../components/Typography/SlideUpReveal";
import { motion } from "framer-motion";
import { makeObserver } from "../components/IntersectionObserver";

const secBgColors = {
  Idea: "var(--beige",
  Web: "var(--yellow)",
  Intro: "var(--beige)",
  Mobile: "var(--primary)",
};

const Index = () => {
  const [reveal, setReveal] = React.useState({
    Intro: false,
    Idea: false,
    Web: false,
    Mobile: false,
  });
  const [selectedItem, setSelectedId] = React.useState(null);
  const [page, setPage] = React.useState("Intro");
  const container = React.useRef(null);

  const setIntersect = React.useCallback(
    (name, once) => (e) => {
      if (once && reveal[name]) return false;
      if (e.isIntersecting) {
        const newState = { ...reveal, [name]: e.isIntersecting };
        console.info("State > ", name, " > ", reveal, newState);
        setPage(e.sectionName);
        setReveal({ ...reveal, [name]: e.isIntersecting });
      }
    },
    [reveal, page]
  );

  React.useEffect(() => {
    setTimeout(() => {
      setIntersect("Intro", false, reveal)({ isIntersecting: true });
    }, 500);
  }, []);

  // console.log("Page", { page, color: secBgColors[page] });

  return (
    <motion.div
      ref={container}
      animate="fullscreen"
      initial={{ backgroundColor: "var(--beige)" }}
      animate={{ backgroundColor: secBgColors[page] }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <Header />
      <div className={css(tw`flex -mt-24 min-h-screen pt-24`)}>
        <div className={css(tw`w-24 select-none relative z-20`)}>
          <Aside></Aside>
        </div>
        <section className={css(tw`-ml-24 flex-1 flex-shrink-0`)}>
          <IntersectionObserver
            name="Intro"
            root={container.current}
            threshold={[0, 0.5, 0.8]}
            onIntersection={debounce(setIntersect("Intro", false), 150)}
          >
            <section
              className={css(
                tw`flex items-start py-24 w-full pl-24 min-h-screen`
              )}
            >
              <aside className={css(tw`mr-10`)}>
                <H1 className={css(tw`font-bold text-center`)}>
                  <SlideUpReveal
                    reveal={reveal.Intro}
                    transition={{ duration: 0.4 }}
                  >
                    <span
                      style={{
                        fontSize: "3ch",
                        lineHeight: 1,
                      }}
                    >
                      Portfolio
                    </span>
                  </SlideUpReveal>
                </H1>
                <H4 className={css(tw`opacity-75 font-sans -mt-4 text-3xl`)}>
                  <SlideUpReveal
                    reveal={reveal.Intro}
                    transition={{ delay: 0.5 }}
                  >
                    Some of our <i>passionate</i> works
                  </SlideUpReveal>
                </H4>
              </aside>
              <div className={css(tw`flex-1 mt-12 w-full flex justify-center`)}>
                {["Salad Freak", "Kwivar", "Femality"].map((e, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: 1 + idx * 0.2,
                    }}
                    layout
                  >
                    <PortfolioCard
                      title={e}
                      expand={selectedItem === idx}
                      onClick={() =>
                        setSelectedId(selectedItem === idx ? null : idx)
                      }
                    />
                  </motion.div>
                ))}
              </div>
            </section>
          </IntersectionObserver>

          <IntersectionObserver
            root={container.current}
            threshold={[0.5]}
            name="Mobile"
            onIntersection={debounce(setIntersect("Mobile", true), 150)}
          >
            <MotionExperiment />
          </IntersectionObserver>

          <IntersectionObserver
            root={container.current}
            threshold={[0.5]}
            name="Web"
            onIntersection={debounce(setIntersect("Web", true), 150)}
          >
            <section className={css(tw`w-full min-h-screen`)}>
              <div className={css(tw`mt-12 w-full flex justify-center`)}>
                {["Salad Freak", "Kwivar", "Femality"].map((e, idx) => (
                  <PortfolioCard key={idx} title={e} />
                ))}
              </div>
            </section>
          </IntersectionObserver>
          <IntersectionObserver
            name="Idea"
            threshold={[0.8]}
            root={container.current}
            onIntersection={debounce(setIntersect("Idea", true), 300)}
          >
            <section
              className={css(
                tw`w-full min-h-screen py-24 flex flex-col items-center justify-center`
              )}
            >
              <SlideUpReveal
                className={css(tw`flex justify-center w-full border`)}
                reveal={reveal.Idea}
              >
                <H1 className={css(tw`text-center mb-2`)}>Got a Project?</H1>
              </SlideUpReveal>
              <ZigZag width="80%" height="15px" />
              <p
                className={css(
                  tw`font-light text-center max-w-lg mx-auto mt-6 mb-10 text-xl opacity-75`
                )}
              >
                We listen to our client’s needs, understand what works and what
                doesn’t, and define guidelines that suit their individual brand.
              </p>

              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button.Primary className={css(tw`py-4 text-xl`)}>
                  Let's hear about it
                </Button.Primary>
              </motion.div>
            </section>
          </IntersectionObserver>
        </section>
      </div>
    </motion.div>
  );
};

export const IntersectionObserver = (props) => {
  const root = React.useRef();

  React.useEffect(() => {
    console.log("Add Intersection Observer to ", props.name);
    const observer = makeObserver(props.onIntersection, props.name, {
      root: props.root,
      threshold: props.threshold,
    });
    observer.observe(root.current);

    return () => observer.disconnect(root.current);
  }, []);

  return (
    <section ref={root} {...props}>
      {props.children}
    </section>
  );
};

export default Index;
