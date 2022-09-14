function getMinMax(str) {
  let arraySplit = str.split(" ");
  let correctArray = [];
  let result = {};
  arraySplit.forEach((element) => {
    if (isFinite(element)) {
      correctArray.push(element);
    }
  });
  correctArray.sort(function (a, b) {
    return a - b;
  });
  result.min = Number(correctArray[0]);
  result.max = Number(correctArray[correctArray.length - 1]);
  return result;
}
