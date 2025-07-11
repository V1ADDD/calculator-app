import '../css/style.css';
import {add, subtract, multiply, divide, percent, toggleSign} from './operations.js';

let currentInput = '0';
let previousInput = '';
let operator = null;
let shouldResetDisplay = false;

const display = document.querySelector('.calculator__display');
const buttons = document.querySelector('.calculator__buttons');

function updateDisplay() {
  display.textContent = currentInput || '0';
}

function normalizeInput(input) {
  if (input === '0' || input === '' || input === 'Error') return '0';
  if (input.startsWith('0') && !input.startsWith('0.') && input !== '0') {
    input = input.replace(/^0+/, '');
  }
  return input || '0';
}

function calculate() {
  if (!previousInput || !operator || !currentInput || currentInput === 'Error') {
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

  const value = target.dataset.value;
  const action = target.dataset.action;
  const op = target.dataset.operator;

  if (currentInput === 'Error' && value !== undefined && action !== 'clear') {
    return; 
  }

  if (value !== undefined) {
    if (value === '.' && currentInput.includes('.')) {
      return; 
    }
    if (shouldResetDisplay) {
      currentInput = value;
      shouldResetDisplay = false;
    } else {
      currentInput = currentInput === '0' ? value : currentInput + value;
    }
    updateDisplay();
  }

  if (op) {
    if (op === 'percent') {
        if (currentInput && currentInput !== 'Error') {
          currentInput = percent(currentInput);
          currentInput = normalizeInput(currentInput);
          updateDisplay();
        }
    } else if (currentInput && currentInput !== 'Error') {
        if (previousInput && operator && !shouldResetDisplay) {
          calculate();
          previousInput = currentInput;
          currentInput = '';
          operator = op;
        } else {
          previousInput = currentInput;
          currentInput = '';
          operator = op;
        }
        shouldResetDisplay = false;
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
        if (previousInput && operator && currentInput && currentInput !== 'Error') {
          calculate();
        }
        break;
    }
  }
});

updateDisplay();