import React from "react";

export const makeObserver = (callback, name, options) =>
  new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      entry.sectionName = name;
      if (callback) callback(entry);
    });
  }, options);
