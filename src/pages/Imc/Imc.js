import { useContext, useEffect, useState } from "react";

// Context
import UserContext from "../../Contexts/AuthContext";

// API
import getData from "../../APIs/useImc";
import getDataTranslate from "../../APIs/useTranslate";

const Imc = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [data, setData] = useState("");
  const [emptyFields, setEmptyFields] = useState([]);
  const [searchClicked, setSearchClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const { user } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    const emptyFieldsArr = [];

    if (height === "") {
      emptyFieldsArr.push("height");
    }

    if (weight === "") {
      emptyFieldsArr.push("weight");
    }

    if (emptyFieldsArr.length > 0) {
      setEmptyFields(emptyFieldsArr);
      setSearchClicked(true);
      alert("Preencha os campos primeiro!");
    } else {
      setLoading(true);

      getData(height, weight)
        .then(async (response) => {
          const translatedClassification = dataTranslation(
            response.info.health
          );
          setData({
            imc: response.info.bmi,
            classification: await translatedClassification,
          });
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }

    setEmptyFields([]);
    setSearchClicked(true);
  };

  const dataTranslation = (classification) => {
    const dataTranslated = getDataTranslate([classification]);
    return dataTranslated;
  };

  const handleReset = () => {
    setHeight("");
    setWeight("");
    setData("");
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className="container imc">
      <h1>Índice de massa corporal</h1>
      <div className="imc-info">
        <h4 className="imc-info-h4">O que é IMC?</h4>
        <p className="imc-info-p">
          O IMC, ou Índice de Massa Corporal, é uma medida utilizada para
          avaliar se uma pessoa possui um peso adequado em relação à sua altura.
          É amplamente utilizado como uma ferramenta simples e rápida para
          avaliar o status nutricional e o risco de problemas de saúde
          relacionados ao peso.
        </p>
      </div>
      <div className="imc-form-container">
        <h4 className="imc-form-h4">Calculadora de IMC</h4>

        <form onSubmit={handleSubmit} className="imc-form">
          <div className="imc-form-inputs">
            <div className="input-item height">
              <label>Altura (ex.: 179)</label>
              <input
                type="number"
                className="if-inputs"
                placeholder="Centímetros"
                onChange={(e) => setHeight(e.target.value)}
                value={height}
              />
            </div>

            <div className="input-item weight">
              <label>Peso (ex.: 69.5)</label>
              <input
                type="number"
                className="if-inputs"
                placeholder="Quilos"
                onChange={(e) => setWeight(e.target.value)}
                value={weight}
              />
            </div>
          </div>

          <input
            type="submit"
            value="Calcular"
            className="calculate-button"
            disabled={loading}
          />
        </form>

        {loading ? (
          <p className="loading-text">Carregando...</p>
        ) : (
          <>
            {data && (
              <div className="imc-form-result">
                <h2 className="imc-form-result-h2">
                  Seu IMC: <span className="result-value">{data.imc}</span>
                </h2>
                <p className="imc-form-result-p">
                  Classificação:{" "}
                  <span className="result-class">{data.classification}</span>
                </p>
                {/* <button className="imc-form-result-saveButton">
                  Salvar IMC
                </button> */}
                <button
                  className="imc-form-result-resetButton"
                  onClick={handleReset}
                >
                  Limpar
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Imc;
