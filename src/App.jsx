import React, { useEffect, useMemo, useState, useCallback } from "react";
import Display from "./components/Display";
import Keypad from "./components/Keypad";
import { calculate } from "./lib/calc";

/**
 * PUBLIC_INTERFACE
 * App - Root component rendering the calculator with modern component architecture.
 * - Composes Display and Keypad
 * - Centralizes logic via lib/calc (operate/calculate)
 * - Provides keyboard support and accessible/responsive layout
 */
export default function App() {
  const [state, setState] = useState({
    display: "0",
    acc: null,
    op: null,
    clearNext: false,
  });

  const canEquals = useMemo(() => Boolean(state.op && state.acc !== null), [state.op, state.acc]);

  // Handlers delegate to calculate()
  const onButton = useCallback((name) => {
    setState((s) => calculate(s, name));
  }, []);

  const onDigit = useCallback((d) => onButton(d), [onButton]);
  const onDot = useCallback(() => onButton("."), [onButton]);
  const onOperator = useCallback((op) => onButton(op), [onButton]);
  const onEquals = useCallback(() => onButton("="), [onButton]);
  const onClear = useCallback(() => onButton("AC"), [onButton]);
  const onToggleSign = useCallback(() => onButton("±"), [onButton]);
  const onPercent = useCallback(() => onButton("%"), [onButton]);

  // Keyboard support
  useEffect(() => {
    const handler = (e) => {
      const key = e.key;

      // Map keyboard keys to calculator buttons
      if (/^[0-9]$/.test(key)) {
        e.preventDefault();
        onDigit(key);
        return;
      }
      if (key === "." || key === ",") {
        e.preventDefault();
        onDot();
        return;
      }
      if (key === "+" || key === "-") {
        e.preventDefault();
        onOperator(key);
        return;
      }
      if (key === "*" || key === "x" || key === "X") {
        e.preventDefault();
        onOperator("×");
        return;
      }
      if (key === "/" || key === "÷") {
        e.preventDefault();
        onOperator("÷");
        return;
      }
      if (key === "Enter" || key === "=") {
        e.preventDefault();
        onEquals();
        return;
      }
      if (key === "Backspace") {
        e.preventDefault();
        // Implement backspace: remove last char or reset to 0
        setState((s) => {
          if (s.clearNext) return s; // ignore when waiting for next number
          const next =
            s.display.length > 1 ? s.display.slice(0, -1) : "0";
          return { ...s, display: next };
        });
        return;
      }
      if (key === "Escape") {
        e.preventDefault();
        onClear();
        return;
      }
      if (key === "%") {
        e.preventDefault();
        onPercent();
        return;
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onDigit, onDot, onOperator, onEquals, onClear, onPercent]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f6f7fb",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        padding: "16px",
      }}
    >
      <div
        role="application"
        aria-label="Calculator"
        style={{
          width: "100%",
          maxWidth: "360px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          borderRadius: "12px",
          overflow: "hidden",
          background: "#ffffff",
          border: "1px solid #eee",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Display value={state.display} />
        <Keypad
          onDigit={onDigit}
          onDot={onDot}
          onOperator={onOperator}
          onEquals={onEquals}
          onClear={onClear}
          onToggleSign={onToggleSign}
          onPercent={onPercent}
          canEquals={canEquals}
        />
        <div
          style={{
            padding: "10px",
            textAlign: "center",
            fontSize: "12px",
            color: "#6b7280",
          }}
        >
          React Calculator
        </div>
      </div>
    </div>
  );
}
