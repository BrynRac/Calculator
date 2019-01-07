// globals
const digits = Array.from(document.querySelectorAll('.digit'));
const operators = Array.from(document.querySelectorAll('.operator'));
const equals = document.querySelector('#equals');
const mainDisplay = document.querySelector('#main');
const subDisplay = document.querySelector('#sub');
let img = document.getElementById("picture");
let text = document.getElementById('leoText');
let calc = { a: "", b: "", operator: "", solution: "" };
let reset = 0;

// basic operators
function add(a, b) { return a + b; }
function minus(a, b) { return a - b; }
function divide(a, b) { return (b === 0 ? "Infinity!" : a / b); }
function multiply(a, b) { return a * b; }

// master operate function using calc object
function operate() {
    switch (calc.operator) {
        case '*': return multiply(calc.a, calc.b);
        case '/': return divide(calc.a, calc.b);
        case '-': return minus(calc.a, calc.b);
        case '+': return add(calc.a, calc.b);
    }
}

// add digit number to the display
function updateDisplay(num) {
    if (reset) { mainDisplay.innerHTML = "" };
    if (num == "." && /\./.test(mainDisplay.innerHTML)) {
        return;
    }
    mainDisplay.innerHTML += num;
    reset = 0; // turn off display reset
}

// update displays when operator is selected
function operationSelect(op) {
    if (calc.a && mainDisplay.innerHTML) {
        calc.b = Number(mainDisplay.innerHTML);
        calc.a = operate();
        calc.operator = op;
        subDisplay.innerHTML = calc.a + " " + op;
        mainDisplay.innerHTML = ""
    } else if (calc.a) {
        calc.operator = op;
        subDisplay.innerHTML = calc.a + " " + calc.operator;
    } else {
        calc.a = Number(mainDisplay.innerHTML);
        calc.operator = op;
        mainDisplay.innerHTML = "";
        subDisplay.innerHTML = calc.a + " " + calc.operator;
    }
};

function completeCalc() {
    if (calc.a && mainDisplay.innerHTML && calc.operator) {
        calc.b = Number(mainDisplay.innerHTML)
        subDisplay.innerHTML += " " + calc.b
        mainDisplay.innerHTML = operate();
        calc = {};
        reset = 1; // toggle display reset
    }
    
}

// update leo picture and text based on MainDisplay output
function changePicture() {
    if (mainDisplay === 0) {
        img.src = "assets/leo_angry.jpg";
        text.innerHTML = "Leonardo doesn't like the number 0. Try a different equation."
    } else if (mainDisplay.innerHTML.length >= 8) {
        img.src  = "assets/leo_angry.jpg";
        text.innerHTML = "Leonardo doesn't like seeing that many digits. Try a different equation."
    } else if (mainDisplay.innerHTML.length === 1) {
        img.src = "assets/leo_default.jpg";
        text.innerHTML = "Leonardo didn't dislike that equation but prefers numbers with more digits. Try again."
    } else {
        img.src = "assets/leo_smile.jpg";
        text.innerHTML = "Leonardo enjoyed that equation. Try another."
    }
}

// add event listeners for digit buttons
for (i = 0; i < digits.length; i++) {
    digits[i].addEventListener('click', e => {
        updateDisplay(e.target.value);
    });
};

// add event listeners for operator buttons
for (i = 0; i < operators.length; i++) {
    operators[i].addEventListener('click', e => {
        operationSelect(e.target.value);
    });
};

// event listener for equals button
equals.addEventListener('click', e => {
    completeCalc();
    changePicture();
});

// Clear
function clearAll() {
    subDisplay.innerHTML = "";
    mainDisplay.innerHTML = "";
    calc = {};
    operation = "";
}

//clear all button press
document.querySelector("[value='clr-all']").addEventListener('click', e => {
    clearAll();
});

function clearCurrent() {
    mainDisplay.innerHTML = "";
}

//clear button press
document.querySelector("[value='clr']").addEventListener('click', e => {
    clearCurrent();
});

function backspace() {
    mainDisplay.innerHTML = mainDisplay.innerHTML.slice(0, -1);
}
//clear button press
document.querySelector("[value='bksp']").addEventListener('click', e => {
    backspace();
});


// keyboard support
document.addEventListener('keyup', e => {
    switch (e.key) {
        case "Backspace":
            backspace();
            break;
        case "Delete":
            clearAll();
            break;
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case "0":
        case ".":
            updateDisplay(e.key);
            break;
        case "+":
        case "-":
        case "*":
        case "/":
            operationSelect(e.key);
            break;
        case "Enter":
            completeCalc();
            changePicture();
            break;
    }
})