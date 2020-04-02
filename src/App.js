import React, { useState, useEffect } from "react";
import "./styles.css";

function DadJoke({ isOpen }) {
  const [dadJoke, setDadJoke] = useState("");
  useEffect(() => {
    fetch("https://icanhazdadjoke.com/", {
      headers: {
        Accept: "application/json"
      }
    })
      .then(res => res.json())
      .then(res => res && res.joke)
      .then(joke => setDadJoke(joke));
  }, []);

  return isOpen && <p>{dadJoke}</p>;
}

function SpinDigitLock({ digit, onChange }) {
  let incDigit = (digit + 1) % 10;
  let decDigit = digit > 0 ? digit - 1 : 9;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        width: "48px"
      }}
    >
      <button onClick={() => onChange(incDigit)}>+</button>
      {digit}
      <button onClick={() => onChange(decDigit)}>-</button>
    </div>
  );
}

export default function App() {
  const password = [2, 2, 3];
  const [digits, setDigits] = useState([0, 0, 0]);
  const [isUnlocked, setIsUnlocked] = useState(false);

  let setDigitAtIndex = (digit, idx) => {
    setDigits(currentDigits => [
      ...currentDigits.slice(0, idx),
      digit,
      ...currentDigits.slice(idx + 1)
    ]);
  };

  let checkPassword = () => {
    for (let i = 0; i < password.length; i++) {
      if (password[i] !== digits[i]) return;
    }
    setIsUnlocked(true);
  };

  let increment = idx => {
    let newDigit = (digits[idx] + 1) % 10;
    setDigitAtIndex(newDigit, idx);
  };

  let decrement = idx => {
    let newDigit = digits[idx] > 0 ? digits[idx] - 1 : 9;
    setDigitAtIndex(newDigit, idx);
  };

  return (
    <section>
      <h1>Hello CodeSandbox</h1>
      <div style={{ display: "flex" }}>
        <SpinDigitLock
          digit={digits[0]}
          onChange={newDigit => setDigitAtIndex(newDigit, 0)}
        />
        <SpinDigitLock
          digit={digits[1]}
          onChange={newDigit => setDigitAtIndex(newDigit, 1)}
        />
        <SpinDigitLock
          digit={digits[2]}
          onChange={newDigit => setDigitAtIndex(newDigit, 2)}
        />
      </div>
      <button onClick={() => checkPassword()}>Press me!</button>
      <DadJoke isOpen={isUnlocked} />
    </section>
  );
}
