/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  elem = null;

  constructor(rows) {
    this.rows = rows;
    this.elem = this.#render();
  }

  #render() {
    const table = document.createElement("table");
    const tBody = document.createElement("tbody");
    let tr = null;

    table.innerHTML = `
    <thead>
    <tr>
      <th>Имя</th>
      <th>Возраст</th>
      <th>Зарплата</th>
      <th>Город</th>
      <th></th>
    </tr>
    </thead>
    `;

    this.rows.forEach((element) => {
      tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${element.name}</td>
        <td>${element.age}</td>
        <td>${element.salary}</td>
        <td>${element.city}</td>
        <td></td>
      `;
      tr.lastElementChild.innerHTML = `
        <button>X</button>
      `;
      tr.lastElementChild
        .querySelector("button")
        .addEventListener("click", function () {
          this.closest("tr").remove();
        });
      tBody.append(tr);
    });

    table.append(tBody);
    return table;
  }
}
