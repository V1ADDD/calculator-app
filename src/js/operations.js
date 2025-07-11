function formatResult(number) {
  const str = String(number);
  if (str.length > 24) return str.slice(0, 24) + '...';
  return str;
}

export function add(a, b) {
  const result = parseFloat(a) + parseFloat(b);
  return formatResult(result);
}
export function subtract(a, b) {
  const result = parseFloat(a) - parseFloat(b);
  return formatResult(result);
}
export function multiply(a, b) {
  const result = parseFloat(a) * parseFloat(b);
  console.log(result);
  return formatResult(result);
}
export function divide(a, b) {
  if (parseFloat(b) === 0) {
    return 'Error';
  }
  const result = parseFloat(a) / parseFloat(b);
  return formatResult(result);
}
export function percent(a) {
  const result = parseFloat(a) / 100;
  return formatResult(result);
}
export function toggleSign(a) {
  if (a === '0' || a === '') return '0';
  return a.startsWith('-') ? a.slice(1) : `-${a}`;
}
