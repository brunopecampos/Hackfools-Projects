import React, { useState, useEffect } from "react";

//
function Matcher(props) {
  const [nmbr, setNmbr] = useState(50);
  const time = 80;
  const [dir, setDir] = useState(1);
  const [intervalId, setIntervalId] = useState(-1);
  const [running, setRunning] = useState(true);

  if (nmbr >= 100 || nmbr <= -1) {
    setNmbr(nmbr + dir * -1);
    setDir(dir * -1);
  }

  useEffect(() => {
    if (running) {
      const id = setInterval(() => {
        setNmbr((prevnmbr) => prevnmbr + dir);
        console.log("tick");
      }, time);
      setIntervalId(id);
      console.log(intervalId);

      return () => {
        clearInterval(id);
      };
    }
  }, [dir, running]);

  const click = (ev) => {
    if (running) {
      props.setVal(nmbr);
    }
    setRunning(!running);
  };

  return (
    <div className="matcher">
      <input type="range" min="00" max="99" value={nmbr} readonly />
      <button onClick={click}>{running ? "Parar" : "Continuar"}</button>
      <p> {nmbr} </p>
    </div>
  );
}

function PhoneSelector(props) {
  const logg = (val) => {
    console.log(val);
  };
  const [f1, setF1] = useState(0);
  const [f2, setF2] = useState(0);
  const [f3, setF3] = useState(0);
  const [f4, setF4] = useState(0);

  const [result, setResult] = useState("CEP Errado.");
  const [nextButton, setNextButton] = useState(false);

  useEffect(() => {
    if (pad(f1, false) + pad(f2, false) + pad(f3, false) + pad(f4, false) == props.cep)
      setResult("Boa, CEP correto.");
  }, [f1, f2, f3, f4]);

  const pad = (val, middle) => {
    return middle
      ? ("00" + val).slice(-2).substring(0, 1) +
          "-" +
          ("00" + val).slice(-2).substring(1, 2)
      : ("00" + val).slice(-2);
  };

  return (
    <div className="PhoneSel">
      <Matcher setVal={setF1} />
      <Matcher setVal={setF2} />
      <Matcher setVal={setF3} />
      <Matcher setVal={setF4} />
      <p className="phone" style={{ fontSize: 30 }}>
        {pad(f1, false)}
        {pad(f2, false)}
        {pad(f3, true)}
        {pad(f4, false)}
      </p>
      <span className="phone" style={{ fontSize: 30 }}>
        {result}
      </span>
      {result == "Boa, CEP correto." ? (
        <button onClick={props.nextPage}>Proxima pagina</button>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default PhoneSelector;
