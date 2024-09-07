export const logServerError = (err: any) => {
  if (process.env.NODE_ENV === "development") {
    console.error("Request failed  =>", err);
    console.error("Stringify Error =>", JSON.stringify(err, undefined, 2));
  }
};
