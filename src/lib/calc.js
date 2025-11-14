//
// PUBLIC_INTERFACE
// operate - perform arithmetic on two numbers using an operator.
//
/**
 * PUBLIC_INTERFACE
 * operate - Performs arithmetic operation on x and y.
 * @param {string|number} x
 * @param {string|number} y
 * @param {'+'|'-'|'×'|'÷'} operator
 * @returns {string} result string; returns "∞" for divide-by-zero; returns y if invalid
 */
export function operate(x, y, operator) {
  const a = parseFloat(x);
  const b = parseFloat(y);
  if (Number.isNaN(a) || Number.isNaN(b)) return String(y);

  switch (operator) {
    case "+":
      return String(a + b);
    case "-":
      return String(a - b);
    case "×":
      return String(a * b);
    case "÷":
      return b === 0 ? "∞" : String(a / b);
    default:
      return String(y);
  }
}

/**
 * PUBLIC_INTERFACE
 * calculate - Given current state and a button name, return next state.
 * The state shape:
 *  {
 *    display: string,
 *    acc: string|null,    // accumulator
 *    op: '+'|'-'|'×'|'÷'|null,
 *    clearNext: boolean
 *  }
 * Button names are digits '0'..'9', '.', '+', '-', '×', '÷', '=', 'AC', '±', '%'
 */
export function calculate(state, buttonName) {
  let { display, acc, op, clearNext } = state;

  const isDigit = /^[0-9]$/.test(buttonName);
  if (isDigit) {
    const n = buttonName;
    if (clearNext || display === "0") {
      display = n;
    } else {
      display = display + n;
    }
    clearNext = false;
    return { display, acc, op, clearNext };
  }

  if (buttonName === ".") {
    if (clearNext) {
      display = "0.";
      clearNext = false;
    } else if (!display.includes(".")) {
      display = display + ".";
    }
    return { display, acc, op, clearNext };
  }

  if (["+", "-", "×", "÷"].includes(buttonName)) {
    if (op && acc !== null) {
      const result = operate(acc, display, op);
      acc = result === "∞" ? null : result;
      display = result;
    } else {
      acc = display;
    }
    op = buttonName;
    clearNext = true;
    return { display, acc, op, clearNext };
  }

  if (buttonName === "=") {
    if (op && acc !== null) {
      const result = operate(acc, display, op);
      display = result;
      acc = null;
      op = null;
      clearNext = true;
    }
    return { display, acc, op, clearNext };
  }

  if (buttonName === "AC") {
    return { display: "0", acc: null, op: null, clearNext: false };
  }

  if (buttonName === "±") {
    if (display === "0") return { display, acc, op, clearNext };
    if (display.startsWith("-")) display = display.slice(1);
    else display = "-" + display;
    return { display, acc, op, clearNext };
  }

  if (buttonName === "%") {
    const v = parseFloat(display || "0");
    const pct = v / 100;
    return { display: String(pct), acc, op, clearNext };
  }

  // Unknown button: return same state
  return { display, acc, op, clearNext };
}
