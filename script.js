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
let spanChars = document.querySelectorAll(".input_area > span");

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
  spanChars = document.querySelectorAll(".input_area > span");
  typer.hidden = false;
};

const updateText = (key) => {
  if (!hasStarted) {
    return;
  }

  if (key.key !== "Backspace") {
    if (key.key === QUOTE[currentCharIdx] && key.key.length === 1) {
      spanChars[currentCharIdx].classList.remove("incorrect");
      spanChars[currentCharIdx].classList.add("correct");
    } else {
      spanChars[currentCharIdx].classList.remove("correct");
      spanChars[currentCharIdx].classList.add("incorrect");
      errs++;
    }
    currentCharIdx++;
  } else {
    currentCharIdx--;
    spanChars[currentCharIdx].classList.remove("correct");
    spanChars[currentCharIdx].classList.remove("incorrect");
  }
  console.log(key.key);
};

inputArea.addEventListener("click", startGame);
inputArea.addEventListener("keydown", updateText);
