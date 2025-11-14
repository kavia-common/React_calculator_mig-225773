import React from "react";

/**
 * PUBLIC_INTERFACE
 * Display - Accessible calculator display area.
 * Props:
 * - value: string to show in the display
 */
export default function Display({ value }) {
  return (
    <div
      role="textbox"
      aria-label="Calculator display"
      aria-readonly="true"
      tabIndex={-1}
      style={{
        padding: "20px",
        fontSize: "32px",
        textAlign: "right",
        background: "#1f2937",
        color: "#e5e7eb",
        wordWrap: "break-word",
        minHeight: "64px",
      }}
    >
      {value}
    </div>
  );
}
