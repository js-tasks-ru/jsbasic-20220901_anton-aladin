function camelize(str) {
  return str
    .split("-")
    .map(function(item, index) {
      if (index) {
        return item.replace(item[0], item[0].toUpperCase());
      }
      return item;
    })
    .join("");
}
