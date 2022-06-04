import React, { useState, useEffect, useLayoutEffect } from "react";

export function CrazyInput(props) {
  console.log("Sbor antigo" + props.saborDado);
  const randomInt = (max) => {
    return Math.floor(Math.random() * max);
  };

  const randomLetter = () => {
    const alphaIndex = randomInt(24) + 1;
    const my_string = "a";
    return String.fromCharCode(my_string.charCodeAt(0) + alphaIndex);
  };

  const [sabor, setSabor] = useState("");
  const [erro, setErro] = useState("");
  console.log(sabor);

  const confirmSabor = () => {
    if (sabor === props.saborDado) props.nextPage();
    else setErro("Sabores não batem! Tente novamente.");
  };

  const inputsHandler = (e) => {
    setSabor(e.target.value);
  };

  useLayoutEffect(() => {
    const interval = setInterval(() => {
      setSabor((sabor) => {
        if (sabor.length > 1) {
          const index = randomInt(sabor.length - 1);
          const letter = randomLetter();
          console.log(letter);
          const newWord =
            sabor.substring(0, index) + letter + sabor.substring(index + 1, sabor.length);
          //console.log("INDEX: " + index + "LETTER " + letter + "NEW WORD " + newWord);
          return newWord;
        }
      });

      return () => clearInterval(interval);
    }, 4000);
  }, []);

  return (
    <>
      <div className="PhoneSel">
        <input
          style={{ fontSize: 40 }}
          type="text"
          name="sabor"
          onChange={inputsHandler}
          value={sabor}
        />
      </div>
      <button
        onClick={confirmSabor}
        style={{ marginTop: 100, fontSize: 20, borderRadius: 10, padding: 10 }}
      >
        Confirmar sabor
      </button>
      <p>{erro}</p>
    </>
  );
}
