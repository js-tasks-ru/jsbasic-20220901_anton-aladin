function ucFirst(str) {
  if (str === '') return '';
  return str.replace(str[0], str[0].toUpperCase());
}