export function add(a, b) {
    const result = Number(a) + Number(b);
    return String(result % 1 === 0 ? result : result.toFixed(2));
}
export function subtract(a, b) {
    const result = Number(a) - Number(b);
    return String(result % 1 === 0 ? result : result.toFixed(2));
}
export function multiply(a, b) {
    const result = Number(a) * Number(b);
    return String(result % 1 === 0 ? result : result.toFixed(2));
}
export function divide(a, b) {
    if (Number(b) === 0) {
        return 'Error';
    }
    const result = Number(a) / Number(b);
    return String(result % 1 === 0 ? result : result.toFixed(2));
}
export function percent(a) {
    const result = Number(a) / 100;
    return String(result % 1 === 0 ? result : result.toFixed(2));
}
export function toggleSign(a) {
    if (a === '0' || a === '') return '0';
    return a.startsWith('-') ? a.slice(1) : `-${a}`;
}