import React, { useState, useEffect } from "react";
import { evaluate } from "mathjs"; // Import evaluate from mathjs
import "./App.css";

const App = () => {
  // React state to track the input string
  const [input, setInput] = useState("");

  // Array of all calculator buttons
  const buttons = [
    "AC", "/", "*", "DEL",
    "7", "8", "9", "-",
    "4", "5", "6", "+",
    "1", "2", "3", "=",
    "0", ".", 
  ];

  // Helper function to identify operator characters
  const isOperator = (char) => /[+\-*/]/.test(char);

  // Main function to handle button clicks
  const handleClick = (value) => {
    if (value === "AC") {
      // Clear all input
      setInput("");
    } else if (value === "DEL") {
      // Remove the last character
      setInput(input.slice(0, -1));
    } else if (value === "=") {
      handleEvaluate();
    } else {
      // Prevent multiple operators or decimals in a row
      const lastChar = input.slice(-1);
      if (
        (isOperator(lastChar) && isOperator(value)) ||
        (value === "." && input.split(/[\+\-\*\/]/).pop().includes("."))
      ) {
        return;
      }
      setInput((prev) => prev + value); // Add new value to input
    }
  };

  // Function to safely evaluate input using mathjs
  const handleEvaluate = () => {
    try {
      if (!input) return;

      // Use mathjs to evaluate safely
      const result = evaluate(input);
      setInput(String(result));
    } catch (error) {
      setInput("Error");
    }
  };

  // Allow keyboard support (Enter key evaluates)
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        handleEvaluate();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [input]);

  return (
    <div className="calculator">
      {/* Display section */}
      <div id="display" className="display">{input || "0"}</div>

      {/* Buttons section */}
      <div className="buttons">
        {buttons.map((btn, index) => (
          <button
            key={index}
            id={btn === "=" ? "equals" : btn === "AC" ? "clear" : btn}
            onClick={() => handleClick(btn)}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
};

export default App;
