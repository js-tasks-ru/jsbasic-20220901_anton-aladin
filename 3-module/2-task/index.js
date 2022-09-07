function filterRange(arr, a, b) {
  let sortedArray = [];
  arr.forEach((element) => {
    if (element >= a && element <= b) {
      sortedArray.push(element);
    }
  });
  return sortedArray;
}
