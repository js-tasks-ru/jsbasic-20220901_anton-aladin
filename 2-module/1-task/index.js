function sumSalary(salaries) {
  let numbers = 0;
  for (const key in salaries) {
    if (Object.hasOwnProperty.call(salaries, key)) {
      if (typeof salaries[key] === 'number' && isFinite(salaries[key])) {
        numbers += salaries[key];
      }
    }
  }
  return numbers;
}