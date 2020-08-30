// import React from "react";

export const useScroll = () => {
  const scrollTo = (x = 0, y = 0, element) => {
    // Scroll to a certain element
    if (element)
      return element.scrollIntoView({
        behavior: "smooth",
      });

    // Scroll to specific values
    // scrollTo is the same
    window.scroll({
      top: y,
      left: x,
      behavior: "smooth",
    });

    // Scroll certain amounts from element position
    //   window.scrollBy({
    //     top: 100, // could be negative value
    //     left: 0,
    //     behavior: "smooth",
    //   });
  };

  return scrollTo;
};

export default useScroll;
