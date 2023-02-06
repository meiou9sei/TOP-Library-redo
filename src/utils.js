export function displayWarning(text) {
  console.log("running");

  const errorDisplay = document.createElement("div");
  errorDisplay.classList.add("warning");
  const errorTitle = document.createElement("h2");
  errorTitle.textContent = "Error!";
  errorDisplay.appendChild(errorTitle);
  const errorDescription = document.createElement("p");
  errorDescription.textContent = text;
  errorDisplay.appendChild(errorDescription);

  const main = document.querySelector(".main");
  main.prepend(errorDisplay);
  setTimeout(() => main.removeChild(errorDisplay), 5000);
}
