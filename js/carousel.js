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
        <h1 class="title font-serif">${name}</h1>
        <div class="description">
          <p class="header opacity-50">
            DESCRIPTION
          </p>
          <div class="descript">
            ${description.reduce((le, des) => {
              return (le += `<p>${des}</p>`);
            }, "")}
          </div>
        </div>

        <div class="stack">
          <p class="header opacity-50">
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
};

function createDot(id) {
  const dot = document.createElement("div");
  dot.classList.add("dot");
  dot.addEventListener('click', () => {
    actions.pauseAutoplay()
    slideTo(id)
  });

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

const activeArrowButtons = () => {
  const arrows = document.querySelectorAll("[data-direction]");
  log(arrows, "arrows");

  arrows.forEach(arrow =>
    arrow.addEventListener("click", () => {
      log(arrow.getAttribute("data-direction"), "Action taken");
      actions.pauseAutoplay()
      actions[arrow.getAttribute("data-direction")]();
    })
  );
}

const fetchProjects = () => {
    createProjects(projects);
    animateCarousel();
    activeArrowButtons()
    actions.autoplay()
};

window.addEventListener("load", fetchProjects);

import { log } from "./utils";

const getSlideWidth = () => {
  const elem = document.querySelector(".project-pos");
  return elem.clientWidth;
};

/**
 * Slides the images by the index
 * @param {int} index the current index
 */
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

/**
 * Slides the information vertically
 * @param {int} index The current index
 */
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
  [...dotHolder.children].forEach(child => {
    child.classList.remove("active");
  });
  dotHolder.children[index].classList.add("active");
};

const slideTo = num => {
  moveSlide(num);
  moveDots(num);
  slideInfo(num);
  actions.setCurrentIndex(num);
};

// const getSlideNum = () => (slider.children.length - 1);
const getSlideNum = () => projectSlideHolder.children.length;

const actions = {
  index: 0,
  intervalId: 0,
  // increments the index/count
  increment() {
    const index = this.index + 1
    if (index < getSlideNum()) slideTo(index);
  },
  // decrements the index/count
  decrement() {
    const { index } = this;
    if (index > 0) slideTo(index - 1);
  },
  // updates the index/count
  setCurrentIndex(index) {
     this.index = index;
  },
  pauseAutoplay() {
    clearInterval(this.intervalId);
    this.intervalId = null

    setTimeout(() => {
        if (this.intervalId === null)
        this.autoplay()
      }, 5000);
  },
  // Automate slide
  autoplay() {
    this.intervalId = setInterval(() => {
      if (this.index === (getSlideNum() - 1)) {
        this.setCurrentIndex(-1)
      }
      this.increment();
    }, 5000);
  }
};