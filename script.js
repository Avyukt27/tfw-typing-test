const QUOTE = "sphinx of black quartz judge my vow";

let currentCharIdx = 0;
let hasStarted = false;

let inputArea = document.querySelector(".input_area");
let spanChars = inputArea.children;

const startGame = () => {
  if (hasStarted) {
    return;
  }

  for (const char of QUOTE) {
    let span = document.createElement("span");
    span.textContent = char;
    inputArea.appendChild(span);
  }
  hasStarted = true;
  spanChars = inputArea.children;
};

const updateText = (key) => {
  if (!hasStarted) {
    return;
  }

  if (key.key === QUOTE[currentCharIdx]) {
    spanChars[currentCharIdx + 1].classList.add("correct");
    currentCharIdx++;
  } else {
    spanChars[currentCharIdx + 1].classList.add("incorrect");
  }
};

inputArea.addEventListener("click", startGame);
inputArea.addEventListener("keydown", updateText);
