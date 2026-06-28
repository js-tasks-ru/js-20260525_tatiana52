/**
 * invertObj - should swap object keys and values
 * @param {object} obj - the initial object
 * @returns {object | undefined} - returns the new object or undefined if nothing did't pass
 */
export function invertObj(obj) {
  if (!obj) {
    return undefined;
  }
  const pairs = Object.entries(obj);

  return pairs.reduce((acc, [key, value]) => {
    acc[value] = key;
    return acc;
  }, {});
}
