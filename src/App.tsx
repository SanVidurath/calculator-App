import { ButtonGroup, CssBaseline, Typography } from "@mui/material";
import { useState, useEffect, useCallback, useMemo } from "react";
import { StyledGrid, StyledButton } from "./Styles";
import * as math from "mathjs";
import "./index.css";
import React from "react";

const App = () => {
  const [inputExpression, setInputExpression] = useState("");
  const [error, setError] = useState<string | null>(null);

  // handling text on the field element
  const handleText = (value: string) => {
    setError(null);
    setInputExpression((prevValue) => prevValue + value);
  };

  // logic for AC button
  const handleReset = () => {
    setError(null);
    setInputExpression("");
  };

  // logic for +/- button
  const changeSign = () => {
    setError(null);
    setInputExpression((prevValue) =>
      prevValue.startsWith("-") ? prevValue.slice(1) : "-" + prevValue
    );
  };

  // logic for % button
  const handlePercentage = () => {
    setError(null);
    const percent = parseFloat(inputExpression) / 100;
    setInputExpression(percent.toString());
  };

  // logic for = button
  const calculateResult = useCallback(() => {
    try {
      const result = math.evaluate(inputExpression).toString();
      if (isNaN(result)) {
        setInputExpression("Not a number");
      } else {
        setInputExpression(result);
      }
    } catch (error) {
      console.log(error);
      // display specific error
      if (error instanceof Error) {
        setError(error.message || "Enter a valid expression");
      } else {
        setError("Enter a valid expression");
      }
    }
  }, [inputExpression]);

  const keys = useMemo(
    () => [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      "+",
      "-",
      "*",
      "/",
      "=",
      ".",
      "Backspace",
      "Enter",
    ],
    []
  );

  // keyboard events
  const handleKeyboardEvent = useCallback(
    (event: KeyboardEvent) => {
      const { key } = event;
      if (keys.includes(key)) {
        event.preventDefault(); // Prevent default behavior for the pressed key

        switch (key) {
          case "Backspace":
            setError(null);
            setInputExpression((prevValue) =>
              prevValue.slice(0, prevValue.length - 1)
            );
            break;
          case "Enter":
          case "=":
            setError(null);
            calculateResult();
            break;
          default:
            setError(null);
            setInputExpression((prevValue) => prevValue + key);
            break;
        }
      }
    },
    [calculateResult, keys]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboardEvent);

    return () => {
      document.removeEventListener("keydown", handleKeyboardEvent);
    };
  }, [handleKeyboardEvent]);

  return (
    <>
      <CssBaseline />
      <StyledGrid
        container
        alignItems="center"
        direction="column"
        justifyContent="center"
      >
        <input id="outlined-basic" disabled value={inputExpression} />
        {error && (
          <Typography
            variant="body2"
            sx={{ color: "red", marginBottom: "2px" }}
          >
            Enter a valid expression
          </Typography>
        )}
        <ButtonGroup variant="contained" aria-label="Basic button group">
          <StyledButton onClick={handleReset}>AC</StyledButton>
          <StyledButton onClick={changeSign}>+/-</StyledButton>
          <StyledButton onClick={handlePercentage}>%</StyledButton>
          <StyledButton
            onClick={() => handleText("/")}
            sx={{
              backgroundColor: "gold",
              "&:hover": { backgroundColor: "yellow" },
            }}
          >
            ÷
          </StyledButton>
        </ButtonGroup>
        <ButtonGroup
          variant="contained"
          aria-label="Basic button group"
          sx={{ marginTop: "0.85px" }}
        >
          <StyledButton onClick={() => handleText("7")}>7</StyledButton>
          <StyledButton onClick={() => handleText("8")}>8</StyledButton>
          <StyledButton onClick={() => handleText("9")}>9</StyledButton>
          <StyledButton
            onClick={() => handleText("*")}
            sx={{
              backgroundColor: "gold",
              "&:hover": { backgroundColor: "yellow" },
            }}
          >
            ×
          </StyledButton>
        </ButtonGroup>
        <ButtonGroup
          variant="contained"
          aria-label="Basic button group"
          sx={{ marginTop: "0.85px" }}
        >
          <StyledButton onClick={() => handleText("4")}>4</StyledButton>
          <StyledButton onClick={() => handleText("5")}>5</StyledButton>
          <StyledButton onClick={() => handleText("6")}>6</StyledButton>
          <StyledButton
            onClick={() => handleText("-")}
            sx={{
              backgroundColor: "gold",
              "&:hover": { backgroundColor: "yellow" },
            }}
          >
            -
          </StyledButton>
        </ButtonGroup>
        <ButtonGroup
          variant="contained"
          aria-label="Basic button group"
          sx={{ marginTop: "0.85px" }}
        >
          <StyledButton onClick={() => handleText("1")}>1</StyledButton>
          <StyledButton onClick={() => handleText("2")}>2</StyledButton>
          <StyledButton onClick={() => handleText("3")}>3</StyledButton>
          <StyledButton
            onClick={() => handleText("+")}
            sx={{
              backgroundColor: "gold",
              "&:hover": { backgroundColor: "yellow" },
            }}
          >
            +
          </StyledButton>
        </ButtonGroup>
        <ButtonGroup
          variant="contained"
          aria-label="Basic button group"
          sx={{ marginTop: "0.85px" }}
        >
          <StyledButton onClick={() => handleText("00")}>00</StyledButton>
          <StyledButton onClick={() => handleText("0")}>0</StyledButton>
          <StyledButton onClick={() => handleText(".")}>.</StyledButton>
          <StyledButton
            onClick={calculateResult}
            sx={{
              backgroundColor: "gold",
              "&:hover": { backgroundColor: "yellow" },
            }}
          >
            =
          </StyledButton>
        </ButtonGroup>
      </StyledGrid>
    </>
  );
};

export default App;
