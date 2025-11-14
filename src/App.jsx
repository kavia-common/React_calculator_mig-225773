import React, { useState } from "react";

/**
 * PUBLIC_INTERFACE
 * App - Root component rendering a minimal calculator placeholder.
 * Displays a simple calculator layout (display + buttons) and performs
 * basic arithmetic in-memory to verify boot and interactivity.
 */
export default function App() {
  const [display, setDisplay] = useState("0");
  const [acc, setAcc] = useState(null);
  const [op, setOp] = useState(null);
  const [clearNext, setClearNext] = useState(false);

  const handleNumber = (n) => {
    setDisplay((prev) => {
      const next = clearNext || prev === "0" ? String(n) : prev + String(n);
      return next;
    });
    setClearNext(false);
  };

  const handleDot = () => {
    setDisplay((prev) => {
      if (clearNext) {
        setClearNext(false);
        return "0.";
      }
      if (prev.includes(".")) return prev;
      return prev + ".";
    });
  };

  const applyOp = (a, b, operator) => {
    const x = parseFloat(a);
    const y = parseFloat(b);
    if (Number.isNaN(x) || Number.isNaN(y)) return b;
    switch (operator) {
      case "+":
        return String(x + y);
      case "-":
        return String(x - y);
      case "×":
        return String(x * y);
      case "÷":
        return y === 0 ? "∞" : String(x / y);
      default:
        return b;
    }
  };

  const handleOperator = (operator) => {
    if (op && acc !== null) {
      const result = applyOp(acc, display, op);
      setAcc(result === "∞" ? null : result);
      setDisplay(result);
    } else {
      setAcc(display);
    }
    setOp(operator);
    setClearNext(true);
  };

  const handleEquals = () => {
    if (op && acc !== null) {
      const result = applyOp(acc, display, op);
      setDisplay(result);
      setAcc(null);
      setOp(null);
      setClearNext(true);
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setAcc(null);
    setOp(null);
    setClearNext(false);
  };

  const Button = ({ children, onClick, className }) => (
    <button
      onClick={onClick}
      className={className}
      style={{
        padding: "14px",
        fontSize: "18px",
        border: "1px solid #ddd",
        background: "#fff",
        cursor: "pointer",
      }}
      aria-label={typeof children === "string" ? children : undefined}
    >
      {children}
    </button>
  );

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
      }}
    >
      <div
        style={{
          width: "320px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          borderRadius: "12px",
          overflow: "hidden",
          background: "#ffffff",
          border: "1px solid #eee",
        }}
      >
        <div
          role="textbox"
          aria-label="Calculator display"
          style={{
            padding: "20px",
            fontSize: "32px",
            textAlign: "right",
            background: "#1f2937",
            color: "#e5e7eb",
          }}
        >
          {display}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
          }}
        >
          <Button onClick={handleClear} className="btn-ac">
            AC
          </Button>
          <Button onClick={() => handleOperator("÷")} className="btn-op">
            ÷
          </Button>
          <Button onClick={() => handleOperator("×")} className="btn-op">
            ×
          </Button>
          <Button onClick={() => handleOperator("-")} className="btn-op">
            -
          </Button>

          {[7, 8, 9].map((n) => (
            <Button key={n} onClick={() => handleNumber(n)}>
              {n}
            </Button>
          ))}
          <Button onClick={() => handleOperator("+")} className="btn-op">
            +
          </Button>

          {[4, 5, 6].map((n) => (
            <Button key={n} onClick={() => handleNumber(n)}>
              {n}
            </Button>
          ))}
          <Button onClick={handleEquals} className="btn-eq">
            =
          </Button>

          {[1, 2, 3].map((n) => (
            <Button key={n} onClick={() => handleNumber(n)}>
              {n}
            </Button>
          ))}
          <Button onClick={handleDot}>.</Button>

          <Button onClick={() => handleNumber(0)} style={{ gridColumn: "span 2" }}>
            0
          </Button>
          <Button onClick={() => setDisplay((d) => (d.startsWith("-") ? d.slice(1) : "-" + d))}>
            ±
          </Button>
          <Button onClick={() => setDisplay((d) => String(parseFloat(d || "0") / 100))}>
            %
          </Button>
        </div>

        <div style={{ padding: "10px", textAlign: "center", fontSize: "12px", color: "#6b7280" }}>
          React Calculator • Placeholder UI
        </div>
      </div>
    </div>
  );
}
