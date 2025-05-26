'use strict'
// 1行目に記載している ‘use strict’ は削除しないでください

const setting = {
  easy:   { seconds: 6, count: 5, digits: 1 },
  normal: { seconds: 7, count: 5, digits: 2 },
  hard:   { seconds: 7, count: 10, digits: 3 },
  expert: { seconds: 5, count: 10, digits: 3 }
};

let numbers = [];
let correctAnswer = 0;
function getRandomDigit(digits) {
  const min = Math.pow(10, digits - 1);
  const max = Math.pow(10, digits) - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getSelectedLevel() {
  const selected = document.querySelector('input[name="level"]:checked');
  return selected ? selected.value : 'easy';
}

function generateNumbers(level) {
  const config = setting[level];
  const num = [];
  for (let i = 0; i < config.count; i++) {
    num.push(getRandomDigit(config.digits));
  }
  if (level === "expert") num.push("×0");
  return num;
}

function calculateAnswer(nums) {
  let sum = 0;
  for (let val of nums) {
    if (val === "×0") {
      sum *= 0;
    } else {
      sum += parseInt(val);
    }
  }
  return sum;
}

function startGame() {
  const level = getSelectedLevel();
  numbers = generateNumbers(level);
  correctAnswer = calculateAnswer(numbers);
  const timerElement = document.getElementById("timer");
  const answerElement = document.querySelector(".answer");
  answerElement.value = "";
  let count = 3;
  timerElement.textContent = count;
  const countdown = setInterval(() => {
    count--;
    timerElement.textContent = count;
    if (count === 0) {
      clearInterval(countdown);
      timerElement.textContent = "";
      showNumbers(level);
    }
  }, 1000);
}

function showNumbers(level) {
  const displayElement = document.querySelector(".square");
  let i = 0;
  const interval = setInterval(() => {
    displayElement.textContent = numbers[i];
    i++;
    if (i >= numbers.length) {
      clearInterval(interval);
      setTimeout(() => {
        displayElement.textContent = "";
      }, 500);
    }
  }, 800);
}

function checkAnswer() {
  const userInput = document.querySelector(".answer").value;
  const userAnswer = parseInt(userInput);
  if (userAnswer === correctAnswer) {
    alert("正解！");
  } else {
    alert(`不正解！正解は ${correctAnswer} でした。`);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("startBtn").addEventListener("click", startGame);
});
