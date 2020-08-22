import { css } from "@emotion/css";
import tw from "@tailwindcssinjs/macro";
import Header from "../components/Header";
import { H1, H4 } from "../components/Typography";
import Aside from "../components/Layouts/PortfolioNav";
import PortfolioCard from "../components/Cards/PortfolioCard";

const Index = () => (
  <div className={css(tw` bg-beige min-h-screen`)}>
    <Header />
    <div className={css(tw`flex -mt-24 min-h-screen pt-24`)}>
      <div className={css(tw`w-24 select-none`)}>
        <Aside></Aside>
      </div>
      <section className={css(tw`-ml-24 flex-1 flex-shrink-0`)}>
        <div className={css(tw`flex flex-col items-center py-24 pl-24`)}>
          <H1 className={css(tw`font-bold text-center`)}>Portfolio</H1>
          <H4 className={css(tw`opacity-75 font-sans -mt-4`)}>
            Some Passionate Works
          </H4>
          <div className={css(tw`mt-12 w-full flex justify-center pr-12`)}>
            {["Salad Freak", "Kwivar", "Femality"].map((e, idx) => (
              <PortfolioCard key={idx} title={e} />
            ))}
          </div>
        </div>
        <section className={css(tw`w-full min-h-screen bg-primary`)}></section>
        <section className={css(tw`w-full min-h-screen bg-yellow`)}></section>
      </section>
    </div>
  </div>
);

export default Index;
