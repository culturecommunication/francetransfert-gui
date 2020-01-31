export function getUnique(array) {
  let uniqueArray = [];
  for (let value of array) {
    if (uniqueArray.indexOf(value) === -1) {
      uniqueArray.push(value);
    }
  }
  return uniqueArray;
}
