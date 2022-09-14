function showSalary(users, age) {
  return users
    .filter((user) => user.age <= age)
    .map(({ name, balance }, index, arr) => {
      if (index === arr.length - 1) {
        return `${name}, ${balance}`;
      }
      return `${name}, ${balance}\n`;
    })
    .join('');
}
