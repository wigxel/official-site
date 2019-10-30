const carousel = () => {
  const projectHolder = document.querySelector(".details-slide-holder");
  const slider = document.querySelector(".slide-holder");
  const dotHolder = document.querySelector(".dot-holder");

  // Carousel Animation
  const animateCarousel = () => {
    projectHolder.firstElementChild.classList.add("active");
    slider.firstElementChild.classList.add("active");
    document.querySelector('.dots .dot').classList.add("active");
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
      console.log(portfolio)
      projectHolder.append(buildProject(portfolio));
      // create images
      slider.append(createImage(portfolio));
      // create dots
      dotHolder.appendChild(createDot(index));
    });
    slider.style.gridTemplateColumns = (getSlideWidth() + 'px')
    
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
    figure.style.width = (getSlideWidth() - 40) + 'px';
    figure.style.height = '350px';
    figure.innerHTML = `
      <img src="${picture}" alt="">
    `;
    return figure;
  }

  const fetchProjects = () => {
    const api = "./js/project.json";
    fetch(api)
      .then(res => res.json())
      .then(response => {
        console.log(response, "carousel is fetching")
        createProjects(response);
      });
  };

  window.addEventListener('load', fetchProjects);
}

export default carousel;