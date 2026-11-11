const QUOTE = "sphinx of black quartz judge my vow";

const startGame = () => {
  for (const char of QUOTE) {
    let span = document.createElement("span");
    span.textContent = char;
    inputArea.appendChild(span);
  }
  console.log("test");
};

let hasStarted = false;

let inputArea = document.querySelector(".input_area");
inputArea.addEventListener("click", startGame);
