"use client";
import { Slot } from "@radix-ui/react-slot";
import React from "react";

export function Grain(
  props: React.ComponentProps<"div"> & {
    option?: Partial<GrainOption>;
  },
) {
  const element = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (element.current) {
      grained(element.current, props.option ?? {});
    }
  }, [props.option]);

  return <Slot ref={element}>{props.children}</Slot>;
}

// default option values
const DEFAULT_OPTIONS = {
  animate: true,
  patternWidth: 100,
  patternHeight: 100,
  grainOpacity: 0.1,
  grainDensity: 1,
  grainWidth: 1,
  grainHeight: 1,
  grainChaos: 0.5,
  grainSpeed: 20,
};

export type GrainOption = typeof DEFAULT_OPTIONS;

function grained(elem: HTMLElement | string, opt: Partial<GrainOption> = {}) {
  let element = null;
  let elementId = null;
  let selectorElement = null;
  const doc = document;

  if (typeof elem === "string") {
    element = doc.getElementById(elem.split("#")[1]);
  } else if (typeof elem === "object") {
    element = elem;
  }

  if (!element) {
    console.error(`Grained: cannot find the element with id ${elem}`);
    return;
  }
  elementId = element.id;
  if (!elementId) {
    console.error("Grained: Element id is missing");
  }
  // set style for parent
  if (element.style.position !== "absolute") {
    element.style.position = "relative";
  }
  element.style.overflow = "hidden";

  const prefixes = ["", "-moz-", "-o-animation-", "-webkit-", "-ms-"];

  const options: typeof DEFAULT_OPTIONS = Object.assign(DEFAULT_OPTIONS, opt);

  const generateNoise = () => {
    const canvas = doc.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return console.warn("Error: Grain Canvas context missing");
    }

    canvas.width = options.patternWidth;
    canvas.height = options.patternHeight;
    for (let w = 0; w < options.patternWidth; w += options.grainDensity) {
      for (let h = 0; h < options.patternHeight; h += options.grainDensity) {
        const rgb = (Math.random() * 256) | 0;
        ctx.fillStyle = `rgba(${[rgb, rgb, rgb, options.grainOpacity].join()})`;
        ctx.fillRect(w, h, options.grainWidth, options.grainHeight);
      }
    }
    return canvas.toDataURL("image/png");
  };

  function addCSSRule(
    sheet: CSSStyleSheet,
    selector: string,
    rules: string,
    index?: number,
  ) {
    let ins = "";
    if (selector.length) {
      ins = `${selector}{${rules}}`;
    } else {
      ins = rules;
    }

    // console.log(sheet);
    if ("insertRule" in sheet) {
      console.log(ins, index);
      sheet.insertRule(ins, index);
    } else if ("addRule" in sheet) {
      // @ts-expect-error
      sheet.addRule(selector, rules, index);
    }
  }

  const noise = generateNoise();

  let animation = "";
  const keyFrames = [
    "0%:-10%,10%",
    "10%:-25%,0%",
    "20%:-30%,10%",
    "30%:-30%,30%",
    "40%::-20%,20%",
    "50%:-15%,10%",
    "60%:-20%,20%",
    "70%:-5%,20%",
    "80%:-25%,5%",
    "90%:-30%,25%",
    "100%:-10%,10%",
  ];

  let pre = prefixes.length;
  while (pre--) {
    animation += `@${prefixes[pre]}keyframes grained{`;
    for (let key = 0; key < keyFrames.length; key++) {
      const keyVal = keyFrames[key].split(":");
      animation += `${keyVal[0]}{`;
      animation += `${prefixes[pre]}transform:translate(${keyVal[1]});`;
      animation += "}";
    }
    animation += "}";
  }

  //add animation keyframe
  const animationAdded = doc.getElementById("grained-animation");
  if (animationAdded?.parentElement) {
    animationAdded.parentElement.removeChild(animationAdded);
  }
  let style = doc.createElement("style");
  style.id = "grained-animation";
  style.innerHTML = animation;
  doc.body.appendChild(style);

  //add customized style
  const styleAdded = doc.getElementById(`grained-animation-${elementId}`);

  if (styleAdded?.parentElement) {
    styleAdded.parentElement.removeChild(styleAdded);
  }

  style = doc.createElement("style");
  style.id = `grained-animation-${elementId}`;

  doc.body.appendChild(style);

  let rule = `
    background-image: url(${noise});
    position: absolute; 
    content: "";
    height: 300%;
    width: 300%;
    left: -100%;
    top: -100%;
    z-index: -1;
    pointer-events: none;
    animation-name:grained; 
    animation-iteration-count: infinite; 
    animation-duration: ${options.grainChaos}s; 
    animation-timing-function: steps(${options.grainSpeed}, end);
  `;

  pre = prefixes.length;
  if (options.animate) {
    while (pre--) {
      rule += `
    ${prefixes[pre]}animation-name:grained; 
    ${prefixes[pre]}animation-iteration-count: infinite; 
    ${prefixes[pre]}animation-duration: ${options.grainChaos}s; 
    ${prefixes[pre]}animation-timing-function: steps(${options.grainSpeed}, end);
      `;
    }
  }

  // selector element to add grains
  selectorElement = `#${elementId}::before`;

  if (style.sheet) addCSSRule(style.sheet, selectorElement, rule);
}
