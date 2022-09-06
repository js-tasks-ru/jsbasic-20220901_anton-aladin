function ucFirst(str) {
  if (str == '') {
    return '';
  }
  else{
    return str.replace(str[0], str[0].toUpperCase());
  }
}