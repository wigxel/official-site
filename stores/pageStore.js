import React from "react";

const ctx = React.createContext({
  pages: [],
  currentPage: null,
});

const dispatchCtx = React.createContext(null);

export const Provider = ({ children }) => {
  const [pages] = React.useState(["Intro", "Mobile", "Web", "Contact"]);
  const [currentPage, setCurrentPage] = React.useState(null);

  return (
    <dispatchCtx.Provider
      value={{
        next: () => {
          setCurrentPage(
            currentPage < pages.length - 1 ? currentPage + 1 : pages.length - 1
          );
        },
        prev: () => {
          setCurrentPage(currentPage > 1 ? currentPage - 1 : 0);
        },
        setCurrentPage,
      }}
    >
      <ctx.Provider value={{ currentPage, pages }}>{children}</ctx.Provider>
    </dispatchCtx.Provider>
  );
};

export const usePageAction = () => React.useContext(dispatchCtx);
export const usePages = () => React.useContext(ctx);
