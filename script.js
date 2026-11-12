const QUOTE = "sphinx of black quartz judge my vow";
const MAX_TIME = 60;

let hasStarted = false;

let currentCharIdx = 0;
let correct = 0;
let incorrect = 0;
let errs = 0;
let accuracy = 0;
let timeLeft = MAX_TIME;
let timeElapsed = 0;
let timer = null;

let inputArea = document.querySelector(".input_area");
let timerText = document.querySelector(".curr_time");
let accuracyText = document.querySelector(".curr_accuracy");
let errorText = document.querySelector(".curr_err");
let wpmText = document.querySelector(".curr_wpm");
let wpmGroup = document.querySelector(".wpm");
let accuracyGroup = document.querySelector(".accuracy");
let typer = document.querySelector(".typer");
let spanChars = document.querySelectorAll(".input_area > span:not(.typer)");

function startGame() {
  if (hasStarted) {
    return;
  }

  resetValues();

  for (const char of QUOTE) {
    let span = document.createElement("span");
    span.textContent = char;
    inputArea.appendChild(span);
  }

  clearInterval(timer);
  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      timeElapsed++;
      timerText.textContent = timeLeft + "s";
    } else {
      finishGame();
    }
  }, 1000);

  hasStarted = true;
  spanChars = document.querySelectorAll(".input_area > span:not(.typer)");
  typer.hidden = false;

  inputArea.addEventListener("keydown", updateText);
}

const updateText = (key) => {
  if (!hasStarted || currentCharIdx === QUOTE.length) {
    return;
  }

  const parentLeft = typer.offsetParent.getBoundingClientRect().left;

  if (key.key !== "Backspace") {
    if (key.key.length === 1 && currentCharIdx < spanChars.length) {
      const targetChar = spanChars[currentCharIdx];

      if (key.key === QUOTE[currentCharIdx]) {
        targetChar.classList.remove("incorrect");
        targetChar.classList.add("correct");
      } else {
        targetChar.classList.remove("correct");
        targetChar.classList.add("incorrect");
        errs++;
        errorText.textContent = errs;
      }

      typer.style.left =
        targetChar.getBoundingClientRect().right - parentLeft + 1 + "px";
      currentCharIdx++;
    }
  } else if (currentCharIdx > 0) {
    currentCharIdx--;
    const targetChar = spanChars[currentCharIdx];

    targetChar.classList.remove("correct", "incorrect");
    typer.style.left =
      targetChar.getBoundingClientRect().left - parentLeft - 1 + "px";
  }

  if (currentCharIdx === spanChars.length) {
    finishGame();
  }

  console.log(key.key);
};

function resetValues() {
  hasStarted = false;
  currentCharIdx = 0;
  errs = 0;
  accuracy = 0;
  timeLeft = MAX_TIME;
  timeElapsed = 0;

  if (inputArea.firstElementChild) {
    inputArea.replaceChildren(inputArea.firstElementChild);
  }

  accuracyText.textContent = 100;
  timerText.textContent = MAX_TIME + "s";

  wpmGroup.style.display = "none";
  accuracyGroup.style.display = "none";
}

function finishGame() {
  clearInterval(timer);
  inputArea.removeEventListener("keydown", updateText);
  wpm = Math.round((currentCharIdx / 5 / timeElapsed) * 60);
  accuracy = Math.round((1 - errs / spanChars.length) * 100);
  wpmText.textContent = wpm;
  accuracyText.textContent = accuracy;

  wpmGroup.style.display = "block";
  accuracyGroup.style.display = "block";
  typer.hidden = true;
}

inputArea.addEventListener("click", startGame);
