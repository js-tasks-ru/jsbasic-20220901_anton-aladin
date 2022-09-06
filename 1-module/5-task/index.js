function truncate(str, maxlength) {
  let text = str;
  if (text.length >= maxlength) {
    return text.slice(0, maxlength).replace(text[maxlength-1], '…');
  }
  else{
    return str;
  }
}