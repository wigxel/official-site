import projects from './projects';

const projectHolder = document.querySelector(".details-slide-holder");
const slider = document.querySelector(".slide-holder");
const dotHolder = document.querySelector(".dot-holder");

// Carousel Animation
const animateCarousel = () => {
  projectHolder.firstElementChild.classList.add("active");
  slider.firstElementChild.classList.add("active");
  document.querySelector(".dots .dot").classList.add("active");
};

const buildProject = ({ name, description, technology }) => {
  const project = document.createElement("div");
  project.classList.add("project");
  project.innerHTML = `
        <h1 class="title">${name}</h1>
        <div class="description">
          <p class="header">
            DESCRIPTION
          </p>
          <div class="descript">
            ${description.reduce((le, des) => {
              return (le += `<p>${des}</p>`);
            }, "")}
          </div>
        </div>

        <div class="stack">
          <p class="header">
            frontend
          </p>
          <div class="technologies">
            ${technology.reduce((le, des) => {
              return (le += `<p>${des}</p>`);
            }, "")}
          </div>
        </div>
      `;
  return project;
};

const createProjects = projects => {
  projects.map((portfolio, index) => {
    console.log(portfolio);
    projectHolder.append(buildProject(portfolio));
    // create images
    slider.append(createImage(portfolio));
    // create dots
    dotHolder.appendChild(createDot(index));
  });
  slider.style.gridTemplateColumns = getSlideWidth() + "px";

  // Animate the carousel
  animateCarousel();
};

function createDot(id) {
  const dot = document.createElement("div");
  dot.classList.add("dot");
  dot.setAttribute("onclick", () => activateToggle(id));

  return dot;
}

function createImage({ picture }) {
  const figure = document.createElement("div");
  figure.classList.add("image");
  figure.style.width = getSlideWidth() - 40 + "px";
  figure.style.height = "350px";
  figure.innerHTML = `
      <img src="${picture}" alt="">
    `;
  return figure;
}

const fetchProjects = () => {
    createProjects(projects);
};

window.addEventListener("load", fetchProjects);

import { log } from "./utils";

// if i click on the next/prev button it moves the slide
// to a certain index
const toggle = document.querySelector(".dot-holder");

const getSlideWidth = () => {
  const elem = document.querySelector(".project-pos");
  return elem.clientWidth;
};

function setupWidth() {
  Array.from(document.querySelectorAll(".project-pos figure")).forEach(el => {
    el.style.width = getSlideWidth() + "px";
  });
}

function moveSlide(index) {
  // by translateX the parents
  const pos = index * log(getSlideWidth(), "The Slide Width");
  const declaration = `translateX(-${pos}px)`;

  slider.style.transform = declaration;
  [...slider.children].forEach(child => {
    child.classList.remove("active");
  });
  slider.children[index].classList.add("active");
}

const projectSlideHolder = document.querySelector(".details-slide-holder");
const slideInfo = index => {
  const infoPos = projectSlideHolder.children[index].offsetTop + 10;
  const infoTranslate = `translateY(-${infoPos}px)`;

  projectSlideHolder.style.transform = infoTranslate;
  [...projectSlideHolder.children].forEach(child => {
    child.classList.remove("active");
  });

  projectSlideHolder.children[index].classList.add("active");
};

const moveDots = index => {
  [...toggle.children].forEach(child => {
    child.classList.remove("active");
  });
  toggle.children[index].classList.add("active");
};

const slideTo = index => {
  moveSlide(num);
  moveDots(num);
  slideInfo(num);
};

let num = 0;

// const getSlideNum = () => (slider.children.length - 1);
const getSlideNum = () => projectSlideHolder.children.length;

function increment(i) {
  num += 1;
  if (num < getSlideNum()) {
    slideTo(num);
    // console.log(num)
  } else {
    num = getSlideNum() - 1;
  }
}

function decrement(i) {
  num -= 1;
  if (num >= 0) {
    slideTo(num);
    // console.log(num)
  } else {
    num = 0;
  }
}

const activateToggle = i => {
  if (i <= projectSlideHolder.children.length - 1) {
    moveSlide(i);
    num = i;
  }
};

// Automate slide
let k = 0;
setInterval(() => {
  if (k == projectSlideHolder.children.length - 1) {
    k = 0;
    // moveSlide(k)
  } else {
    k++;
    // moveSlide(k)
  }
}, 3000);
