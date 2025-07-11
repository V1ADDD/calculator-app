import '../css/style.css';
import {
  add,
  subtract,
  multiply,
  divide,
  percent,
  toggleSign,
} from './operations.js';

let currentInput = '0';
let previousInput = '';
let operator = null;
let shouldResetDisplay = false;
const MAX_INPUT_LENGTH = 15;

const display = document.querySelector('.calculator__result');
const operationDisplay = document.querySelector('.calculator__operation');
const buttons = document.querySelector('.calculator__buttons');

function updateDisplay() {
  display.textContent = currentInput || '0';
  operationDisplay.innerHTML =
    previousInput +
    '<br><a style="font-size: 20px">' +
    (operator ? getOperatorSymbol(operator) : '') +
    '</a>';
}

function getOperatorSymbol(op) {
  const operatorMap = {
    add: '+',
    subtract: '−',
    multiply: '×',
    divide: '÷',
    percent: '%',
  };
  return operatorMap[op] || '';
}

function normalizeInput(input) {
  if (input === '0' || input === '' || input === 'Error') return '0';
  if (input.startsWith('0') && !input.startsWith('0.') && input !== '0') {
    input = input.replace(/^0+/, '');
  }
  return input || '0';
}

function isValidInputLength(input) {
  return input.length <= MAX_INPUT_LENGTH;
}

function calculate() {
  if (
    !previousInput ||
    !operator ||
    !currentInput ||
    currentInput === 'Error'
  ) {
    return;
  }
  let result;
  switch (operator) {
    case 'add':
      result = add(previousInput, currentInput);
      break;
    case 'subtract':
      result = subtract(previousInput, currentInput);
      break;
    case 'multiply':
      result = multiply(previousInput, currentInput);
      break;
    case 'divide':
      result = divide(previousInput, currentInput);
      break;
    case 'percent':
      result = percent(currentInput);
      break;
    default:
      return;
  }

  currentInput = result;
  previousInput = '';
  operator = null;
  shouldResetDisplay = true;
  updateDisplay();
}

buttons.addEventListener('click', (event) => {
  const { target } = event;
  if (!target.matches('button')) return;

  handleInput(
    target.dataset.value,
    target.dataset.action,
    target.dataset.operator
  );
});

document.addEventListener('keydown', (event) => {
  event.preventDefault();

  const keyMap = {
    0: { value: '0' },
    1: { value: '1' },
    2: { value: '2' },
    3: { value: '3' },
    4: { value: '4' },
    5: { value: '5' },
    6: { value: '6' },
    7: { value: '7' },
    8: { value: '8' },
    9: { value: '9' },
    '.': { value: '.' },
    '+': { operator: 'add' },
    '-': { operator: 'subtract' },
    '*': { operator: 'multiply' },
    '/': { operator: 'divide' },
    '%': { operator: 'percent' },
    s: { action: 'sign' },
    Enter: { action: 'equals' },
    Escape: { action: 'clear' },
    Backspace: { action: 'backspace' },
  };

  const input = keyMap[event.key];
  if (input) {
    handleInput(input.value, input.action, input.operator);
  }
});

function handleInput(value, action, op) {
  if (currentInput === 'Error' && value !== undefined && action !== 'clear') {
    return;
  }

  if (value !== undefined) {
    if (value === '.' && currentInput.includes('.')) {
      return;
    }
    if (!isValidInputLength(currentInput + value)) {
      return;
    }
    if (shouldResetDisplay) {
      currentInput = value;
      shouldResetDisplay = false;
    } else {
      currentInput = currentInput === '0' ? value : currentInput + value;
    }
    currentInput = normalizeInput(currentInput);
    updateDisplay();
  }

  if (op) {
    if (op === 'percent') {
      if (currentInput && currentInput !== 'Error') {
        currentInput = percent(currentInput);
        if (!isValidInputLength(currentInput)) {
          currentInput = 'Error';
        }
        currentInput = normalizeInput(currentInput);
        updateDisplay();
      }
    } else if (currentInput && currentInput !== 'Error') {
      if (previousInput && operator && !shouldResetDisplay) {
        calculate();
        if (currentInput !== 'Error') {
          previousInput = currentInput;
          currentInput = '';
          operator = op;
        }
      } else {
        previousInput = currentInput;
        currentInput = '';
        operator = op;
      }
      shouldResetDisplay = false;
      updateDisplay();
    }
  }

  if (action) {
    switch (action) {
      case 'clear':
        currentInput = '0';
        previousInput = '';
        operator = null;
        shouldResetDisplay = false;
        updateDisplay();
        break;
      case 'sign':
        if (currentInput !== 'Error') {
          currentInput = toggleSign(currentInput);
          updateDisplay();
        }
        break;
      case 'equals':
        if (
          previousInput &&
          operator &&
          currentInput &&
          currentInput !== 'Error'
        ) {
          calculate();
        }
        break;
      case 'backspace':
        if (currentInput !== 'Error') {
          currentInput =
            currentInput.length > 1 ? currentInput.slice(0, -1) : '0';
          currentInput = normalizeInput(currentInput);
          updateDisplay();
        }
        break;
    }
  }
}

updateDisplay();
