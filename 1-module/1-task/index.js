function factorial(n) {
  let factorial = n;
  if (factorial === 0 || factorial === 1) {
    return factorial = 1;
  }
  while (n > 1) {
    factorial = factorial * --n;
  }
  return factorial;
}