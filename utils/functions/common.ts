export const humanJoin = (iter: Array<any>): string => {
  if (iter.length < 2) {
    return iter.join(" and ");
  }

  return iter.slice(0, -1).join(", ") + " and " + iter.slice(-1);
};
