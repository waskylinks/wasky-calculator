import React, { useState, useEffect, useCallback } from "react";
import { evaluate } from "mathjs";
import "./App.css";

const App = () => {
  const [input, setInput] = useState("");

  // Buttons array with empty strings for placeholders
  const buttons = [
    "AC", "", "", "DEL",
    "7", "8", "9", "*",
    "4", "5", "6", "-",
    "1", "2", "3", "+",
    "0", ".", "/", "=",
  ];

  const isOperator = (char) => /[+\-*/]/.test(char);

  const handleClick = (value) => {
    if (value === "AC") {
      setInput("");
    } else if (value === "DEL") {
      setInput(input.slice(0, -1));
    } else if (value === "=") {
      handleEvaluate();
    } else if (value === "") {
      return; // Ignore empty placeholders
    } else {
      const lastChar = input.slice(-1);
      if (
        (isOperator(lastChar) && isOperator(value)) ||
        (value === "." && input.split(/[+\-*/]/).pop().includes("."))
      ) {
        return;
      }
      setInput((prev) => prev + value);
    }
  };

  const handleEvaluate = useCallback(() => {
    try {
      if (!input) return;
      const result = evaluate(input);
      setInput(String(result));
    } catch {
      setInput("Error");
    }
  }, [input]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        handleEvaluate();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleEvaluate]);

  return (
    <div className="calculator">
      <div id="display" className="display" data-testid="display">
        {input || "0"}
      </div>
      <div className="buttons">
        {buttons.map((btn, index) =>
          btn === "" ? (
            <div key={index} /> // empty grid cell placeholder
          ) : (
            <button
              key={index}
              id={
                btn === "="
                  ? "equals"
                  : btn === "AC"
                  ? "clear"
                  : btn === "DEL"
                  ? "delete"
                  : btn === "/"
                  ? "divide"
                  : btn === "*"
                  ? "multiply"
                  : btn === "-"
                  ? "subtract"
                  : btn === "+"
                  ? "add"
                  : btn
              }
              onClick={() => handleClick(btn)}
            >
              {btn}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default App;