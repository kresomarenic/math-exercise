"use strict";

const results = document.getElementById("results");
const question = document.getElementById("question");
const finish = document.getElementById("finish");
const btnAnswer = document.getElementById("btnAnswer");

const nbr1El = document.createElement("span");
const operationEl = document.createElement("span");
const nbr2El = document.createElement("span");
const resultEl = document.createElement("span");
const givenAnswerEl = document.createElement("input");

let expectedAnswer;

const equalsEl = document.createElement("span");
equalsEl.innerText = "=";

const handleEnter = (e) => {
  if (e.key === "Enter") {
    resolveAswer();
  }
};

function resolveAswer() {
  const resultIcon = document.createElement("span");

  if (givenAnswerEl.value.trim() == expectedAnswer) {
    resultIcon.innerHTML = "&#128515;";
    console.log("Točno");
  } else {
    resultIcon.innerHTML = "&#128557;";
    console.log("Netočno");
  }

  results.append(resultIcon);

  generateQuestion();
}

btnAnswer.addEventListener("click", resolveAswer);

givenAnswerEl.addEventListener("keyup", handleEnter);

function generateQuestion() {
  let nbr1 = "";
  let nbr2 = "";
  let result = "";
  let operation = "";

  nbr1 = Math.floor(Math.random() * 21);
  nbr2 = Math.floor(Math.random() * 21);

  if (nbr1 + nbr2 < 20) {
    operation = "+";
    result = nbr1 + nbr2;
    console.log(`${nbr1} ${operation} ${nbr2} = ${result}`);
    populateQuestionElements(nbr1, operation, nbr2, result);
  } else if (nbr1 - nbr2 >= 0) {
    operation = "-";
    result = nbr1 - nbr2;
    console.log(`${nbr1} ${operation} ${nbr2} = ${result}`);
    populateQuestionElements(nbr1, operation, nbr2, result);
  } else if (nbr2 - nbr1 >= 0) {
    operation = "-";
    result = nbr2 - nbr1;
    console.log(`${nbr2} ${operation} ${nbr1} = ${result}`);
    populateQuestionElements(nbr2, operation, nbr1, result);
  } else {
    generateQuestion();
  }
}

function populateQuestionElements(nbr1, operation, nbr2, result) {
  const partToRemove = Math.floor(Math.random() * (4 - 1) + 1);
  console.log("Part to remove: " + partToRemove);

  question.innerHTML = "";

  nbr1El.innerText = nbr1;
  operationEl.innerText = operation;
  nbr2El.innerText = nbr2;
  resultEl.innerText = result;
  givenAnswerEl.value = "";

  switch (partToRemove) {
    case 1:
      question.append(givenAnswerEl);
      question.append(operationEl);
      question.append(nbr2El);
      question.append(equalsEl);
      question.append(resultEl);
      expectedAnswer = nbr1;
      break;
    case 2:
      question.append(nbr1El);
      question.append(operationEl);
      question.append(givenAnswerEl);
      question.append(equalsEl);
      question.append(resultEl);
      expectedAnswer = nbr2;
      break;
    case 3:
      question.append(nbr1El);
      question.append(operationEl);
      question.append(nbr2El);
      question.append(equalsEl);
      question.append(givenAnswerEl);
      expectedAnswer = result;
      break;
    default:
  }

  givenAnswerEl.focus();
}

generateQuestion();
