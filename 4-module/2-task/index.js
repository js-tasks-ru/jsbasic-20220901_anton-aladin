function makeDiagonalRed(table) {
  let rows = table.querySelectorAll("tr");
  rows.forEach((element, i) => {
    element.cells[i].style.backgroundColor = 'red';
  });
}
