/**
 * Compares two arrays and returns if they are equal
 * @param a
 * @param b
 * @returns true if arrays are equal else false
 */
export const equals = (a: Array<any>, b: Array<any>): boolean => {
  return a.length === b.length && a.every((v, i) => v === b[i]);
};

export * from "./DefaultSeo";
export * from "./useIsMount";
