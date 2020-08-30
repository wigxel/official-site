import React from "react";

const keyDirMap = Object.freeze({
  38: "up",
  40: "down",
  39: "right",
  37: "left",
});

export function useArrowKeys(keyFnPair, config) {
  const getKeyDir = React.useMemo(() => {
    return (key) => keyDirMap[key];
  }, []);

  React.useEffect(() => {
    const prevent = (evt) => {
      const keyDir = getKeyDir(evt.keyCode);
      if (!keyFnPair[keyDir]) return false;
      if (config.preventDefault) evt.preventDefault();
    };

    const handler = (evt) => {
      if (config.altKey && !evt.altKey) return false;
      const keyDir = getKeyDir(evt.keyCode);
      keyFnPair[keyDir] && keyFnPair[keyDir]();
    };

    window.addEventListener("keyup", handler);
    window.addEventListener("keydown", prevent);

    return () => {
      window.removeEventListener("keyup", handler);
      window.removeEventListener("keydown", prevent);
    };
  }, [keyFnPair, getKeyDir]);

  return keyFnPair;
}

export default useArrowKeys;
