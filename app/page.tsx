"use client";
import type React from "react";
import { ContactForm } from "~/app/contact-form";
import { Footer } from "~/app/footer";
import { Hero } from "~/app/hero";
import { ClientsAndPartners } from "~/app/partners";
import { Portfolio } from "~/app/portfolio";
import { Services } from "~/app/services";
import { Banner } from "./banner";

export default function Home() {
  return (
    <>
      <title>Wigxel Corp</title>
      <div className={"wg-column"}>
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
    </>
  );
}
