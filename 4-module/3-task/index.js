function highlight(table) {
  let rows = table.querySelectorAll("tr");
  rows.forEach(function (element, i) {
    if (i && element.cells[3].dataset.available === "false") {
      element.classList.add("unavailable");
    }
    if (i && element.cells[3].dataset.available === "true") {
      element.classList.add("available");
    }
    if (i && element.cells[3].dataset.available === undefined) {
      element.setAttribute("hidden", "");
    }
    if (i && element.cells[2].textContent === "m") {
      element.classList.add("male");
    }
    if (i && element.cells[2].textContent === "f") {
      element.classList.add("female");
    }
    if (i && element.cells[1].textContent < "18") {
      element.style.textDecoration = "line-through";
    }
  });
}
