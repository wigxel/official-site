export const logServerError = (err) => {
  if (process.env.NODE_ENV === "development") {
    console.error("Request failed  =>", err);
    console.error("Stringify Error =>", JSON.stringify(err, undefined, 2));
  }
};
