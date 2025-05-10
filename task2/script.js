let display = document.querySelector('.display');
let buttons = document.querySelectorAll('button');
let currentInput = '';
let previousInput = '';
let operation = null;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (value >= '0' && value <= '9') {
            handleNumber(value);
        } else if (value === '.') {
            handleDecimal();
        } else if (['+', '-', '*', '/', '%'].includes(value)) {
            handleOperator(value);
        } else if (value === '=') {
            handleEquals();
        } else if (value === 'C') {
            handleClear();
        }

        updateDisplay();
    });
});

function handleNumber(num) {
    if (currentInput === '0') {
        currentInput = num;
    } else {
        currentInput += num;
    }
}

function handleDecimal() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
    }
}

function handleOperator(op) {
  // If no current input but previous input exists, just update the operator
  if (currentInput === '' && previousInput !== '') {
    operation = op;
    updateDisplay();
    return;
  }

  // If both inputs exist, calculate first
  if (currentInput !== '' && previousInput !== '') {
    calculate();
  }

  // Set new operator
  operation = op;
  previousInput = currentInput || previousInput;
  currentInput = '';
  updateDisplay();
}

function handleEquals() {
    if (previousInput === '' || currentInput === '') return;
    calculate();
    operation = null;
}

function handleClear() {
    currentInput = '';
    previousInput = '';
    operation = null;
}

function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        case '%':
            result = prev % current;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    previousInput = '';
}

function updateDisplay() {
  // Only show one operator at a time
  display.value = previousInput + (operation ? ` ${operation} ` : '') + currentInput;
}