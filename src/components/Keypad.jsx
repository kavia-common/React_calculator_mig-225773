import React from "react";
import Button from "./Button";

/**
 * PUBLIC_INTERFACE
 * Keypad - Layout of calculator buttons.
 * Props:
 * - onDigit(d: string)
 * - onDot()
 * - onOperator(op: string) // '+', '-', '×', '÷'
 * - onEquals()
 * - onClear() // AC
 * - onToggleSign()
 * - onPercent()
 * - canEquals: boolean (controls equals enabled state)
 */
export default function Keypad({
  onDigit,
  onDot,
  onOperator,
  onEquals,
  onClear,
  onToggleSign,
  onPercent,
  canEquals = true,
}) {
  const rowStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
  };

  return (
    <div style={rowStyle}>
      <Button label="AC" onClick={onClear} variant="ac" />
      <Button label="÷" onClick={() => onOperator("÷")} variant="op" />
      <Button label="×" onClick={() => onOperator("×")} variant="op" />
      <Button label="-" onClick={() => onOperator("-")} variant="op" />

      {[7, 8, 9].map((n) => (
        <Button key={n} label={String(n)} onClick={() => onDigit(String(n))} />
      ))}
      <Button label="+" onClick={() => onOperator("+")} variant="op" />

      {[4, 5, 6].map((n) => (
        <Button key={n} label={String(n)} onClick={() => onDigit(String(n))} />
      ))}
      <Button label="=" onClick={onEquals} variant="eq" disabled={!canEquals} />

      {[1, 2, 3].map((n) => (
        <Button key={n} label={String(n)} onClick={() => onDigit(String(n))} />
      ))}
      <Button label="." onClick={onDot} />

      <Button label="0" onClick={() => onDigit("0")} span={2} />
      <Button label="±" onClick={onToggleSign} />
      <Button label="%" onClick={onPercent} />
    </div>
  );
}
