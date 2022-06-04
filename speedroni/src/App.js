import logo from "./logo.svg";
import "./App.css";
import { AudioPlayer } from "./AudioPlayer";
import { AudioPlayerProvider } from "react-use-audio-player";
import { useState } from "react";
import PhoneSelector from "./PhoneSelector";
import { Howl, Howler } from "howler";
import { CrazyInput } from "./CrazyInput";

function App() {
  const [page, setPage] = useState(1);

  const [inputField, setInputField] = useState({
    sabor: "",
    bebida: "",
    cep: "",
  });

  console.log(inputField.sabor);
  const inputsHandler = (e) => {
    const newInputs = { ...inputField, [e.target.name]: e.target.value };
    setInputField(newInputs);
  };

  const submitButton = () => {
    setPage(2);
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
                  <option value="Coca">Coca</option>
                  <option value="Doly">Doly</option>
                  <option value="Jess">Jesus</option>
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
        ) : (
          <div></div>
        )}
      </header>
    </div>
  );
}

export default App;
