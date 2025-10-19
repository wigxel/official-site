import type { Metadata } from 'next';
import { Container } from "@/components/container";

export const metadata: Metadata = {
  title: "Studio | Wigxel"
};

export default function StudioPage() {
  return (
    <section>
      <Container className='absolute'>
        <h1 className="text-7xl font-heading">Studio</h1>
      </Container>

      <div className='aspect-[16/6] w-full bg-[#111] -mt-24'>
      </div>

      <StudioPurpose />

      <Skils />

      <section className="flex">
        <div className="w-5/12"></div>

        <div className="w-5/12">
          <p className="flex text-[calc(32rem/16)] leading-[2.2ex]">
            We develop UX focused software solutions on the Internet &amp; Mobile space for medium and large scale business looking to scale their business.
          </p>
        </div>

        <div className="flex-1"></div>
      </section>

      <TeamSection />
    </section>
  );
}

function StudioPurpose() {
  return <Container className="flex flex-col gap-[calc(111rem/16)] pt-24 pb-[calc(140rem/16)]">
    <div className="flex text-[calc(18rem/16)]">
      <h1 className="pr-12 text-left w-5/12 text-accent-foreground">
        WHO ARE WE?
      </h1>

      <div className="flex-1 max-w-2xl flex flex-col gap-6 text-[1.1em]">
        <p className="">
          We develop UX focused software solutions on the Internet & Mobile space for medium and large scale business looking to scale their business.
        </p>
      </div>
    </div>

    <div className="flex text-[calc(18rem/16)]">
      <h1 className="pr-12 text-left w-5/12 text-accent-foreground">PROBLEM + OUR PURPOSE</h1>

      <div className="flex-1 max-w-2xl flex flex-col gap-6 text-[1.1em]">
        <p className="">
          We see business struggling create an impact on the internet everyday. Most think they are doing it right and we can blame them since they don’t know better.
        </p>

        <p className="opacity-70">
          We exist to show them the possibilities, to be their hands and guide as we unlock their desires to impress, convert and scale their ideas.
        </p>
      </div>
    </div>

    <div className="flex text-[calc(18rem/16)]">
      <h1 className="pr-12 text-left w-5/12 text-accent-foreground">OUR SERVICES</h1>
      <div className="flex-1 max-w-2xl flex flex-col gap-6 text-[1.1em]">
        <p className="">
          We offer a wide range of creative & technical services that covers every steps of a production & post-production pipeline
        </p>
      </div>
    </div>
  </Container>
}

function Skils() {
  return <Container className="flex flex-col py-24">
    <section className="flex flex-col divide-y-[0.5px] border-y-[0.5px] border-white/[0.5] divide-white/[0.5]">
      <SkillItem />
      <SkillItem />
      <SkillItem />
      <SkillItem />
    </section>
  </Container>
}

function SkillItem() {
  return <section className="flex py-11">
    <h4 className="w-5/12 text-[calc(42rem/16)] font-semibold">BRANDING</h4>
    <p className="flex-1 opacity-70 text-foreground">
      Lorem ipsum dolor sit amet consectetur adipisicing elit.<br />
      Sequi asperiores ipsam omnis? Perspiciatis sunt eligendi nam enim <br />
      dolores praesentium, et tenetur cupiditate magnam nesciunt earum minus ratione, saepe labore neque.
    </p>
  </section>
}

function TeamSection() {
  return <Container className="py-24 flex flex-col gap-10">
    <h2 className="text-4xl font-medium font-heading">Meet The Team</h2>
    <div className="grid grid-cols-3 gap-2">
      <TeamMemberCard />
      <TeamMemberCard />
      <TeamMemberCard />
    </div>
  </Container>
}

function TeamMemberCard() {
  return <div className="flex flex-col gap-4">

    <figure className="aspect-[435/514] flex-1 w-full bg-gray-200">
    </figure>

    <div className="flex flex-col gap-3">
      <h3 className="text-[calc(32rem/16)] border leading-[1ex]">John Doe</h3>
      <p className="leading-[1] uppercase opacity-75 text-base">Creative Lead</p>
    </div>

  </div>
}
