import { Cell } from "~/app/cell";
import { ArrowRight } from "~/components/Icons";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export function ContactForm() {
  return (
    <section className={"wg-row -mt-[1px]"}>
      <Cell size={2} className={"items-start"}>
        <div
          className={
            "text-neutral-500 text-[14px] font-[300] uppercase tracking-[-1px]"
          }
        >
          Contact
        </div>
      </Cell>

      <Cell size={2}>
        <div className={"flex flex-col gap-y-12 py-64"}>
          <hgroup className={"flex flex-col gap-y-2"}>
            <h2 className={"text-5xl font-display tracking-tighter"}>
              {`Let's build something awesome together`}
            </h2>
            <p
              className={
                "font-body text-neutral-500 max-w-[32ch] font-[300] leading-[2ex]"
              }
            >
              Provide your contact details and claim a time to meet. We’ll help
              you do the rest
            </p>
          </hgroup>

          <form className={"-mx-6 tracking-wide"}>
            <Input type={"text"} placeholder={"FULL NAME"} />
            <Input type={"email"} placeholder={"EMAIL"} />
            <Input type={"phone"} placeholder={"COMPANY"} />
            <Input type={"text"} placeholder={"BUDGET"} />
            <Input type={"text"} placeholder={"PROJECT"} />
            <Button
              size={"lg"}
              variant={"secondary"}
              className={
                "w-full text-primary font-[300] font-display tracking-widest justify-between rounded-none"
              }
            >
              <span>SUBMIT</span>
              <ArrowRight fontSize={"4ex"} />
            </Button>
          </form>
        </div>
      </Cell>
      <Cell size={2} />
    </section>
  );
}
