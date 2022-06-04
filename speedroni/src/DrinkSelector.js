import React, { useEffect, useState } from "react";

let correct = Math.floor(Math.random() * 15);

function DrinkSelector(props) {
  const img = props.href;
  let buttons = [];
  const [colors, setColors] = useState(Array(15).fill("black"));
  const clicked = (i) => {
    let newcolors = [...colors];
    if (i === correct) {
      newcolors[i] = "green";
      props.setCorrect(correct);
    } else {
      newcolors[i] = "red";
    }
    setColors(newcolors);
  };

  buttons = colors.map((el, i) => {
    return (
      <button
        onClick={() => clicked(i)}
        style={{ border: "5px solid " + el, margin: "5px" }}
      >
        {" "}
        <span>
          <img style={{ height: "150px" }} src={img}></img>
        </span>
      </button>
    );
  });
  const style = {
    display: "flex",
    flexWrap: "wrap",
  };
  return (
    <div className="drinkSelector" style={style}>
      {buttons}
    </div>
  );
}

export default DrinkSelector;
