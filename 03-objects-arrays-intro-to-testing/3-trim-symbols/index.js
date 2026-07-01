/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */

export function trimSymbols(string, size) {
  if (!string || size === 0) {
    return "";
  }

  if (!size) {
    return string;
  }

  const arr = string.split("");

  return arr.reduce((acc, item, index, array) => {
    if (acc.endsWith(item.repeat(size))) {
      return acc;
    } else {
      return acc + item;
    }
  }, "");
}
