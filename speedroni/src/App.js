import "./App.css";
import PhoneSelector from "./PhoneSelector";
import { Howl, Howler } from "howler";
import { CrazyInput } from "./CrazyInput";
import { useEffect, useState } from "react";
import DrinkSelector from "./DrinkSelector";

const timelimit = 15;

function App() {
  const [page, setPage] = useState(1);

  const [inputField, setInputField] = useState({
    sabor: "",
    bebida: "",
    cep: "",
    telefone: "",
  });

  const [timer, setTimer] = useState(timelimit);
  const [timeout, setTimeout] = useState(true);

  useEffect(() => {
    if (!timeout) {
      const id = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => {
        clearInterval(id);
      };
    }
  }, [timeout]);

  useEffect(() => {
    if (timer <= 0 && !timeout) {
      setTimeout(true);
      // O QUE FAZER??
      if (page != 5) setPage(-1);
    }
  }, [timer]);

  const toText = (sec) => {
    return ("0" + Math.floor(sec / 60)).slice(-2) + ":" + ("0" + (sec % 60)).slice(-2);
  };
  const inputsHandler = (e) => {
    const newInputs = { ...inputField, [e.target.name]: e.target.value };
    setInputField(newInputs);
  };

  const submitButton = () => {
    setPage(2);
    setTimeout(false);
  };

  const sound = new Howl({
    src: ["../public/italianino.mp3"],
  });

  const nextPage = () => {
    setPage(page + 1);
  };

  sound.play();

  return (
    <div className="App">
      <header className="App-header">
        {page === 1 ? (
          <div>
            <p
              style={{
                alignSelf: "center",
                fontSize: "100px",
                fontStyle: "italic",
                color: "black",
                fontFamily: "Kalam",
              }}
            >
              SpeedRonni
            </p>
            <p
              style={{
                alignSelf: "center",
                fontSize: "30px",
                color: "Black",
                backgroundColor: "yellow",
                marginRight: 150,
                marginLeft: 150,
                opacity: 0.8,
              }}
            >
              Depois de considerada a melhor pizza do mundo por diversos especialistas,
              agora somente os verdadeiros dignos poderao saborear da melhor pizza de
              todas. Preencha suas informacoes abaixo e se prepare para o teste para
              provar que voce eh realmete digno da pizza mestra.
            </p>
            <form>
              <label>
                <span
                  style={{ color: "Black", marginLeft: 40, backgroundColor: "yellow" }}
                >
                  Sabor:
                </span>
                <select
                  name="sabor"
                  onChange={inputsHandler}
                  style={{ borderRadius: 5, padding: 5 }}
                >
                  <option value="Portuguesa">Portuguesa</option>
                  <option value="Calabresa">Calabresa</option>
                  <option selected value="Peperonni">
                    Peperonni
                  </option>
                  <option value="Frango">Frango</option>
                  <option value="Marguerita">Marguerita</option>
                  <option value="Havaiana">Havaiana</option>
                  <option value="Chocolate">Chocolate</option>
                </select>
              </label>
              <label>
                <span
                  style={{ color: "Black", marginLeft: 40, backgroundColor: "yellow" }}
                >
                  Bebida:
                </span>
                <select
                  name="bebida"
                  onChange={inputsHandler}
                  style={{ borderRadius: 5, padding: 5 }}
                >
                  <option value="Doly">Doly</option>

                  <option value="Guarana">Guarana</option>
                  <option value="Suquinho">Suquinho</option>
                </select>
              </label>
              <label>
                <span
                  style={{ color: "Black", marginLeft: 40, backgroundColor: "yellow" }}
                >
                  CEP:
                </span>
                <input type="text" name="cep" onChange={inputsHandler} maxLength={8} />
              </label>
              <label>
                <span
                  style={{ color: "Black", marginLeft: 40, backgroundColor: "yellow" }}
                >
                  Telefone:
                </span>
                <input
                  type="number"
                  name="numero"
                  onChange={inputsHandler}
                  maxLength={11}
                />
              </label>
              <br></br>

              <button
                style={{
                  padding: 30,
                  borderRadius: 10,
                  fontSize: 40,
                  marginLeft: 40,
                  backgroundColor: "orange",
                  marginTop: 100,
                }}
                onClick={submitButton}
              >
                Iniciar o pedido
              </button>
            </form>
          </div>
        ) : page === 2 ? (
          <div style={{ marginTop: 50 }}>
            <p style={{ alignSelf: "center", color: "black", fontSize: 50 }}>
              Confirme seu CEP, para enviarmos para o lugar certo!
            </p>
            <PhoneSelector cep={inputField.cep} nextPage={nextPage} />
          </div>
        ) : page === 3 ? (
          <>
            <p style={{ fontSize: 40 }}>Confirme o sabor escolhido: {inputField.sabor}</p>
            <CrazyInput saborDado={inputField.sabor} nextPage={nextPage} />
          </>
        ) : page === 4 ? (
          <div style={{ width: "60vw" }}>
            <DrinkSelector href={inputField.bebida + ".png"} setCorrect={nextPage} />
          </div>
        ) : page === 5 ? (
          <div>
            <p style={{ marginTop: 0, fontSize: 40 }}>
              Parabens, sua pizza está a caminho
            </p>
            <p
              style={{
                marginRight: 20,
                marginLeft: 20,
                fontSize: 30,
                backgroundColor: "yellow",
                opacity: 0.7,
              }}
            >
              Muito bem! Voce se provou digno da melhor pizza do mundo. Agora, aproveite
              um privilegio que poucos possuem acesso, com uma pizza deliciosa!
            </p>
            <img
              src="https://c.tenor.com/kQ8n1syYw3wAAAAC/pizza-time-party.gif"
              alt="display image"
            />
          </div>
        ) : (
          <div>
            <p style={{ marginTop: 0, fontSize: 50 }}>
              Não foi possível enviar a pizza :(
            </p>
            <p
              style={{
                marginRight: 20,
                marginLeft: 20,

                fontSize: 40,
                backgroundColor: "yellow",
                opacity: 0.7,
              }}
            >
              Voce falhou. Ainda resta muito treino pela frente ate que voce possa chegar
              a ser digno de nossa magnifica pizza. Mas como somos benevolentes, vamos te
              dar uma segunda chance. Tente novamente!
            </p>
            <img src="../pizza.jpeg" alt="display image" />
          </div>
        )}
      </header>
      <div
        style={{
          position: "fixed",
          top: "15px",
          right: "15px",
          fontSize: "20pt",
          color: "white",
        }}
      >
        {toText(timer)}
      </div>
    </div>
  );
}

export default App;
