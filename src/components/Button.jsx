import React from "react";

/**
 * PUBLIC_INTERFACE
 * Button - Calculator button with accessible labeling and visual feedback.
 * Props:
 * - label: text content (string) for the button and aria-label fallback
 * - onClick: function
 * - variant: "op" | "eq" | "ac" | "num" (styling hint)
 * - span: number of columns to span in the grid
 * - disabled: boolean
 */
export default function Button({
  label,
  onClick,
  variant = "num",
  span = 1,
  disabled = false,
}) {
  const baseStyle = {
    padding: "16px",
    fontSize: "18px",
    border: "1px solid #e5e7eb",
    background: "#ffffff",
    color: "#111827",
    cursor: disabled ? "not-allowed" : "pointer",
    outline: "none",
    transition: "background 120ms, color 120ms, transform 80ms",
    userSelect: "none",
  };

  const variantStyle =
    variant === "op"
      ? { background: "#f9fafb" }
      : variant === "eq"
      ? { background: "#2563eb", color: "#ffffff", borderColor: "#1d4ed8" }
      : variant === "ac"
      ? { background: "#fee2e2", color: "#991b1b", borderColor: "#fecaca" }
      : {};

  const disabledStyle = disabled ? { opacity: 0.5 } : {};

  return (
    <button
      type="button"
      onClick={disabled ? undefined : onClick}
      className={`btn ${variant}`}
      style={{
        ...baseStyle,
        ...variantStyle,
        ...disabledStyle,
        gridColumn: `span ${span}`,
      }}
      aria-label={String(label)}
      aria-disabled={disabled ? "true" : "false"}
    >
      {label}
    </button>
  );
}
