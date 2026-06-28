/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */

export function createGetter(path) {
  const objNodes = path.split(".");

  return (obj) => {
    if (!obj) {
      return undefined;
    }

    let result = obj;

    for (const key of objNodes) {
      if (!result?.hasOwnProperty(key)) {
        return;
      }

      result = result[key];
    }

    return result;
  };
}
