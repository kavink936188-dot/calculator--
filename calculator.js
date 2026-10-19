const display = document.getElementById("display");
const buttons = document.querySelector(".buttons");

let firstNumber = "";
let operator = "";
let secondNumber = "";

let shouldResetDisplay = false;


function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return "ERROR";
    }

    return a / b;
}

function operate(a, operator, b) {

    a = Number(a);
    b = Number(b);

    switch (operator) {

        case "+":
            return add(a, b);

        case "-":
            return subtract(a, b);

        case "*":
            return multiply(a, b);

        case "/":
            return divide(a, b);

        default:
            return b;
    }
}

function inputNumber(number) {

    if (display.textContent === "ERROR" || shouldResetDisplay) {
        display.textContent = "";
        shouldResetDisplay = false;
    }
    if (number === "." && display.textContent.includes(".")) {
        return;
    }
    if (number === "." && display.textContent === "") {
        display.textContent = "0";
    }
    if (display.textContent === "0" && number !== ".") {
        display.textContent = number;
        return;
    }

    display.textContent += number;
}

function inputOperator(newOperator) {

    if (display.textContent === "ERROR") {
        return;
    }
    if (operator === "") {

        firstNumber = display.textContent;
        operator = newOperator;

        shouldResetDisplay = true;

        return;
    }
    if (shouldResetDisplay) {

        operator = newOperator;

        return;
    }
    secondNumber = display.textContent;

    const result = operate(
        firstNumber,
        operator,
        secondNumber
    );

    displayResult(result);

    if (result === "ERROR") {
        return;
    }

    firstNumber = result;
    operator = newOperator;

    shouldResetDisplay = true;
}

function calculate() {

    if (
        firstNumber === "" ||
        operator === "" ||
        shouldResetDisplay
    ) {
        return;
    }

    secondNumber = display.textContent;

    const result = operate(
        firstNumber,
        operator,
        secondNumber
    );

    displayResult(result);

    firstNumber = "";
    secondNumber = "";
    operator = "";

    shouldResetDisplay = true;
}

function displayResult(result) {

    if (result === "ERROR") {

        display.textContent = "ERROR";

        firstNumber = "";
        secondNumber = "";
        operator = "";

        shouldResetDisplay = true;

        return;
    }
    result = Math.round(result * 100000000) / 100000000;

    display.textContent = result;
}

function clearCalculator() {

    firstNumber = "";
    secondNumber = "";
    operator = "";

    shouldResetDisplay = false;

    display.textContent = "0";
}

function deleteNumber() {

    if (shouldResetDisplay || display.textContent === "ERROR") {
        return;
    }

    if (display.textContent.length === 1) {
        display.textContent = "0";
    } else {
        display.textContent =
            display.textContent.slice(0, -1);
    }
}

buttons.addEventListener("click", function (event) {

    const button = event.target;

    if (!button.matches("button")) {
        return;
    }
    if (button.dataset.number !== undefined) {

        inputNumber(button.dataset.number);

        return;
    }
    if (button.dataset.operator) {

        inputOperator(button.dataset.operator);

        return;
    }

if (button.dataset.action === "clear") {

        clearCalculator();

        return;
    }


    
    if (button.dataset.action === "delete") {

        deleteNumber();

        return;
    }


    
    if (button.dataset.action === "equals") {

        calculate();
    }

});