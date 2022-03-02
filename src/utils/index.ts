export const arrayEquals = (a: Array<any>, b: Array<any>): boolean => {
  return (
    a.length === b.length &&
    a.every(function (element) {
      return b.includes(element);
    }) &&
    b.every(function (element) {
      return a.includes(element);
    })
  );
};

export * from "./DefaultSeo";
export * from "./useIsMount";
