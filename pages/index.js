import { debounce } from "lodash";
import { css } from "@emotion/css";
import tw from "@tailwindcssinjs/macro";
import Header from "../components/Header";
import { H1, H4 } from "../components/Typography";
import Aside from "../components/Layouts/PortfolioNav";
import PortfolioCard from "../components/Cards/PortfolioCard";
import Button from "../components/ButtonStyled";
import ZigZag from "../components/Icons/ZigZag";
import SlideUpReveal from "../components/Typography/SlideUpReveal";

const makeObserver = (callback, name, options) =>
  new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      console.log(`Calling ${name}`);
      if (callback) callback(entry);
    });
  }, options);

const IntersectionObserve = (props) => {
  const root = React.useRef();

  React.useEffect(() => {
    const observer = makeObserver(props.onIntersection, props.name, {
      root: props.root,
      threshold: props.threshold,
    });
    observer.observe(root.current);
  }, []);

  return (
    <section ref={root} {...props}>
      {props.children}
    </section>
  );
};

const Index = () => {
  const [reveal, setReveal] = React.useState({
    intro: false,
    Idea: false,
  });
  const container = React.useRef(null);
  const setIntersect = (name, once) => (e) => {
    if (once && !e.isIntersecting) return false;
    setReveal({ ...reveal, [name]: e.isIntersecting });
  };

  React.useEffect(() => {
    // const observer = makeObserver("main");
    // observer.observe(container.current);
    setTimeout(() => {
      setIntersect("intro", false)({ isIntersecting: true });
    }, 500);
  }, []);

  return (
    <div ref={container} className={css(tw` bg-beige min-h-screen`)}>
      <Header />
      <div className={css(tw`flex -mt-24 min-h-screen pt-24`)}>
        <div className={css(tw`w-24 select-none`)}>
          <Aside></Aside>
        </div>
        <section className={css(tw`-ml-24 flex-1 flex-shrink-0`)}>
          <div className={css(tw`flex flex-col items-center py-24 pl-24`)}>
            <SlideUpReveal reveal={reveal.intro}>
              <H1 className={css(tw`font-bold text-center`)}>Portfolio</H1>
            </SlideUpReveal>
            <H4 className={css(tw`opacity-75 font-sans -mt-4`)}>
              Some Passionate Works
            </H4>
            <div className={css(tw`mt-12 w-full flex justify-center pr-12`)}>
              {["Salad Freak", "Kwivar", "Femality"].map((e, idx) => (
                <PortfolioCard key={idx} title={e} />
              ))}
            </div>
          </div>
          <IntersectionObserve
            root={container.current}
            threshold={[0.5]}
            name="Blue"
            className={css(tw`w-full min-h-screen bg-primary`)}
          />
          <IntersectionObserve
            root={container.current}
            threshold={[0.5]}
            name="Yellow"
            className={css(tw`w-full min-h-screen bg-yellow`)}
          />
          <IntersectionObserve
            name="Idea"
            threshold={[0.85]}
            root={container.current}
            onIntersection={debounce(setIntersect("Idea", true), 200)}
            className={css(
              tw`w-full min-h-screen bg-beige py-24 flex flex-col items-center justify-center`
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

            <div>
              <Button.Primary className={css(tw`py-4 text-xl`)}>
                Let's hear about it
              </Button.Primary>
            </div>
          </IntersectionObserve>
        </section>
      </div>
    </div>
  );
};

export default Index;
