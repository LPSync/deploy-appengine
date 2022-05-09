export const isObjectsEqual = (obj1, obj2) => {
  var props1 = Object.getOwnPropertyNames(obj1);
  var props2 = Object.getOwnPropertyNames(obj2);

  if (props1.length != props2.length) {
    return false;
  }
  for (let i = 0; i < props1.length; i++) {
    let val1 = obj1[props1[i]];
    let val2 = obj2[props1[i]];
    let isObjects = isObject(val1) && isObject(val2);
    if (
      (isObjects && !isObjectsEqual(val1, val2)) ||
      (!isObjects && val1 !== val2)
    ) {
      return false;
    }
  }
  return true;
};

const isObject = (object) => object != null && typeof object === "object";

export const toSetArray = (array) => [...new Set(array)];

export const removeExtraSpaces = string => string?.replace(/\s\s+/g, " ")?.trim();