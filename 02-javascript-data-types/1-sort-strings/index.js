/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = "asc") {
  const paramVariants = ["asc", "desc"];

  if (!!param && !paramVariants.includes(param)) {
    throw new Error("Param is invalid, use 'asc' or 'desc' instead");
  }

  const sortingFn = (a, b) => {
    const arg1 = param === "asc" ? a : b;
    const arg2 = param === "asc" ? b : a;

    return arg1.localeCompare(arg2, "ru", {
      sensitivity: "case",
      caseFirst: "upper",
    });
  };

  return [...arr].sort(sortingFn);
}
