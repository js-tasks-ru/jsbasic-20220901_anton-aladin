function camelize(str) {
  return str
    .split("-")
    .map((item, index) => {
      if (index) {
        return item.replace(item[0], item[0].toUpperCase());
      }
      return item;
    })
    .join("");
}
