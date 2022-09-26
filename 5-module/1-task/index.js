function hideSelf() {
  const button = document.querySelector(".hide-self-button");
  button.addEventListener("click", () => {
    button.toggleAttribute("hidden");
  });
}
