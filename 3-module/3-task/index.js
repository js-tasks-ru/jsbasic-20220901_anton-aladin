function camelize(str) {
  let format = str.split("-");
  return format.map(function (item) {
    if (item === format[0]) {
      return item;
    } else {
      return item.replace(item[0], item[0].toUpperCase());
    }
  }).join('');
}