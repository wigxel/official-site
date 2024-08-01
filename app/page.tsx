"use client";
import type React from "react";
import { ContactForm } from "~/app/contact-form";
import { Footer } from "~/app/footer";
import { Grain, type GrainOption } from "~/app/grain";
import { Hero } from "~/app/hero";
import { ClientsAndPartners } from "~/app/partners";
import { Portfolio } from "~/app/portfolio";
import { Services } from "~/app/services";
import { Banner } from "./banner";

export default function Home() {
  return (
    <div id="root" className={"wg-column"}>
      {/*<GrainBox />*/}
      <Banner />
      <main className={"wg-column"}>
        <Hero />
        <Services />
        <ClientsAndPartners />
        <Portfolio />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}

function GrainBox() {
  return (
    <div className={"fixed flex inset-0 pointer-events-none z-[-1]"}>
      <Grain option={grainOption}>
        <div id={"fix"} className={"h-full w-full"} />
      </Grain>
    </div>
  );
}

const grainOption: Partial<GrainOption> = {
  grainOpacity: 0.1,
  grainChaos: 0.4,
  patternHeight: 200,
  grainWidth: 0.8,
  grainHeight: 0.8,
};
