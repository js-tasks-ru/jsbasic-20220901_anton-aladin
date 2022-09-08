function truncate(str, maxlength) {
  if (str.length >= maxlength) {
    return str.slice(0, maxlength).replace(str[maxlength - 1], "…");
  }
  return str;
}
