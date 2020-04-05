import anime from "./anime.min.js";
import { throttle } from "lodash";
import { once, $, delay, trace, pipe, makeScrollListener } from "./utils.js";

const clickEvent = (elms, activeClass = "is-active") => fn => {
  const navLinks = elms;
  const unSelectAllLinks = navLinks =>
    navLinks.map(e => e.classList.remove(activeClass));
  for (let el in navLinks) {
    el.addEventListener("click", evt => {
      unSelectAllLinks();
      el.classList.add(activeClass);
      fn(el);
    });
  }
};

const animateToggle = ({ toggle }) => {
  const blinder = Blinder();
  const { animInstance } = blinder;

  // toggles the menu
  const [toggleOnce, resetOnce] = once(toggle);
  animInstance.update = a => {
    if (a.currentTime > animInstance.duration / 1.5) {
      toggleOnce();
    }
  };
  const open = () => {
    blinder.open();
    return animInstance.finished.then(delay(300)).then(resetOnce);
  };
  const close = () => {
    blinder.close();
    return animInstance.finished.then(animInstance.reset).then(resetOnce);
  };

  return [open, close];
};

export const menuArea = menu => {
  let active = false;
  const { body } = document;
  const links = [...menu.querySelectorAll(".wg-main-nav .wg-nav-link")];
  const hide = () => {
    menu.style.visibility = "hidden";
    body.style = "";
    active = false;
  };
  const show = () => {
    menu.style.visibility = "visible";
    body.style.overflow = "hidden";
    active = true;
  };
  const toggle = () => (active ? hide() : show());
  const navList = animateList(links);
  const [open, close] = animateToggle({ toggle });
  const toggleScrollLock = active => () => {
    const body = $("html, body");
    body.style.height = active ? "" : "100vh";
    body.style.overflow = active ? "" : "hidden";
  };
  const toggleAnim = () => {
    const proimse = active
      ? close().then(navList.reset)
      : open().then(navList.play);
    proimse.then(toggleScrollLock(active));
  };
  document.addEventListener("click", evt => {
    if (evt.target.getAttribute("data-toggle") == "menu") {
      console.log("isActive", active);
      toggleAnim();
    }
  });

  return {
    isOpen: _ => active,
    Links: links,
    onLinkChange: clickEvent(links, "is-active"),
    toggleAnim,
    show,
    toggle,
    hide
  };
};

const animateList = elms => {
  const targets = elms;

  const navLinks = anime({
    targets,
    opacity: 1,
    duration: 500,
    autoplay: false,
    translateX: "20%",
    easing: "easeOutElastic",
    delay: function(el, i, l) {
      return i * 100;
    },
    endDelay: function(el, i, l) {
      return (l - i) * 100;
    }
  });

  return {
    play() {
      navLinks.play();
    },
    reset() {
      anime({
        targets,
        duration: 0,
        opacity: 0,
        translateX: "0"
      });
    }
  };
};

let isScrolling = false;
export const yScroll = (() => {
  let cords = {
    x: 0,
    y: 0
  };

  const doAn = (offset, duration = 700) => {
    const { pageYOffset: y, pageXOffset: x } = window;
    cords = {
      x,
      y
    };
    if (!isScrolling) {
      isScrolling = true;
      anime({
        targets: cords,
        y: Math.abs(offset.y + window.pageYOffset),
        x: offset.x + window.pageXOffset,
        easing: "easeOutQuad",
        duration,
        update: () => window.scroll(cords.x, cords.y)
      }).finished.then(() => {
        isScrolling = false;
      });
    }
  };

  return a => doAn(a);
})();

const activate = (elems, el, className = "active") => {
  elems.forEach(element => {
    element === el
      ? el.classList.add(className)
      : element.classList.remove(className);
  });
};

const getOffset = () => {
  const { pageXOffset, pageYOffset } = window;

  return {
    pageXOffset,
    pageYOffset
  };
};

const ScrollRemote = el => {
  console.count("ScrollRemote");
  let index = 0;
  const menuButton = el.querySelector(".menu-bar");
  const matchAttrib = "data-wg-autoscroll";
  const navs = [...el.querySelectorAll("li")];
  let onNavClick = () => {};

  const setIndex = _index => {
    if (parseInt(el.getAttribute("data-index")) != _index) {
      index = _index;
      const currentEl = navs[_index];
      scrollTo(getReference(currentEl));
      activate(navs, currentEl);
      el.setAttribute("data-index", _index);
    }
  };

  const scrollTo = element => {
    const { x, y } = element.getBoundingClientRect();
    yScroll({ x, y });
  };

  const getReference = el => {
    const refElement = $(el.getAttribute(matchAttrib));
    if (refElement) return refElement;
    throw Error("reference element doesn't exist");
  };

  document.addEventListener("keydown", ({ keyCode }) => {
    let newIndex = index;
    const direction = keyCode == 40 ? "DOWN" : keyCode == 38 ? "UP" : "";

    if (direction === "UP" && index > 0) newIndex--;
    if (direction === "DOWN" && index < navs.length - 1) newIndex++;
    setIndex(newIndex);
  });

  navs.forEach(el => {
    el.addEventListener("click", () => {
      scrollTo(getReference(el));
    });
  });
  setIndex(0);
  return {
    onMenuClick(fn) {
      menuButton.addEventListener("click", fn);
    },
    onIndexClick: fn => (onNavClick = fn),
    autoSwitch: () => {}
  };
};

const Blinder = () => {
  const blindElem = document.createElement("div");

  blindElem.classList.add("blinder");
  document.body.appendChild(blindElem);
  const instance = anime({
    targets: blindElem,
    easing: "easeOutQuad",
    right: [
      {
        value: 0
      },
      {
        value: 0,
        delay: 300
      },
      {
        value: "100%"
      }
    ],
    left: [
      {
        value: "100%"
      },
      {
        value: 0,
        delay: 300
      },
      {
        value: 0
      }
    ],
    duration: 800,
    autoplay: false
  });
  instance.finished.then(() => {
    instance.reset();
  });

  return {
    animInstance: instance,
    open: () => instance.play(),
    close: () => instance.restart()
  };
};

export function activateScrollRemote(Menu) {
  const remote = ScrollRemote($(".scroll-remote"));
  remote.onMenuClick(Menu.toggleAnim);
  remote.onIndexClick(evt => {
    trace("first click index on remote", evt);
  });
  remote.autoSwitch();
}
