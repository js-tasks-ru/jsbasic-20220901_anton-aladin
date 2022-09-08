function showSalary(users, age) {
  let array = [...users];
  let str = "";
  array.forEach((user) => {
    if (user.age <= age) str += `${user.name}, ${user.balance}\n`;
  });
  if (str.endsWith("\n")) str = str.slice(0, str.length - 1);
  return str;
}
