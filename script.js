const QUOTE = "sphinx of black quartz judge my vow";
const MAX_TIME = 60;

let hasStarted = false;

let currentCharIdx = 0;
let errs = 0;
let accuracy = 0;
let timeLimit = MAX_TIME;
let timer = null;

let inputArea = document.querySelector(".input_area");
let timer_text = document.querySelector(".curr_time");
let accuracy_text = document.querySelector(".curr_accuracy");
let error_text = document.querySelector(".curr_errors");
let cpm_text = document.querySelector(".curr_cpm");
let wpm_text = document.querySelector(".curr_wpm");
let typer = document.querySelector(".typer");
let spanChars = document.querySelectorAll(".input_area > span:not(.typer)");

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
  spanChars = document.querySelectorAll(".input_area > span:not(.typer)");
  typer.hidden = false;
};

const updateText = (key) => {
  if (!hasStarted) {
    return;
  }

  let targetChar = spanChars[currentCharIdx];

  if (key.key !== "Backspace") {
    if (key.key.length === 1) {
      if (key.key === QUOTE[currentCharIdx]) {
        targetChar.classList.remove("incorrect");
        targetChar.classList.add("correct");
      } else {
        targetChar.classList.remove("correct");
        targetChar.classList.add("incorrect");
        errs++;
      }
      typer.style.left =
        targetChar.getBoundingClientRect().right -
        typer.offsetParent.getBoundingClientRect().left +
        1 +
        "px";
      currentCharIdx++;
    }
  } else {
    currentCharIdx--;
    targetChar.classList.remove("correct");
    targetChar.classList.remove("incorrect");
    typer.style.left = typer.offsetLeft - 16 + "px";
  }
  console.log(key.key);
};

inputArea.addEventListener("click", startGame);
inputArea.addEventListener("keydown", updateText);
