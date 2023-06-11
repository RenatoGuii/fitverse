import { useContext, useState } from "react";

// Context
import UserContext from "../../Contexts/AuthContext";

// APIs
import getData from "../../APIs/useSearchExercises";
import getDataTranslate from "../../APIs/useTranslate";

// Images
import tp1 from "../../assets/images/tp1.jpg";
import tp2 from "../../assets/images/tp2.jpg";
import tp3 from "../../assets/images/tp3.jpg";
import tp4 from "../../assets/images/tp4.jpg";

// Icons
import { AiFillStar } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";

const TrainingPlan = () => {
  const [type, setType] = useState("");
  const [data, setData] = useState(null);
  const [favoriteExercise, setFavoriteExercise] = useState([]);
  const [emptyFields, setEmptyFields] = useState([]);
  const [loadingExercises, setLoadingExercises] = useState(false);
  const [loadindAdd, setLoadingAdd] = useState(false);
  const [noResultsFound, setNoResultsFound] = useState(false);
  const [searchClicked, setSearchClicked] = useState(false);

  const { user, userExercises, addNewExercise } = useContext(UserContext);

  // função onde transformamos um array de objetos (API de exercicios) em uma string apenas com seus valores
  const dataTranslation = (array) => {
    const itemTexts = array.map((item) => {
      const itemFiltering = {
        name: item.name,
        bodyPart: item.bodyPart,
        target: item.target,
        equipment: item.equipment,
        gifUrl: item.gifUrl,
      };

      return Object.values(itemFiltering).join(", ");
    });

    const concatenatedText = itemTexts.join(" | ");

    const stringToArray = concatenatedText.split(" | ");

    return stringToArray;
  };

  // função que transforma os strings traduzidas do array em arrays
  const dataChangeFormat = (array) => {
    const itemText = array.map((item) => {
      const stringToArray = item.split(", ");
      return stringToArray;
    });

    return itemText;
  };

  // função que chama a API do banco de exercícios
  const handleSubmit = (e) => {
    e.preventDefault();

    const emptyFieldsArr = [];

    if (type === "") {
      emptyFieldsArr.push("type");
    }

    if (emptyFieldsArr.length > 0) {
      setEmptyFields(emptyFieldsArr);
      setSearchClicked(true);
      alert("Preencha os campos primeiro!");
    } else {
      setLoadingExercises(true);

      getData(type)
        .then((response) => {
          if (response && response.length > 0) {
            const translatedString = dataTranslation(response);
            getDataTranslate(translatedString).then((response) => {
              setData(dataChangeFormat(response));
              setLoadingExercises(false);
            });
          } else {
            setData([]);
            setNoResultsFound(true);
            setLoadingExercises(false);
          }
        })
        .catch((error) => {
          console.error(error);
          setNoResultsFound(true);
        });

      setEmptyFields([]);
      setSearchClicked(true);
      setType("");
    }
  };


  const handleSaveExercise = async (index) => {
    const confirmed = window.confirm(
      "Deseja adicionar o treino aos seus treinos favoritos?"
    );

    if (confirmed) {
      setLoadingAdd(true);
      const selectedExercise = data[index];

      const objectExercise = {
        name: selectedExercise[0],
        type: selectedExercise[1],
        target: selectedExercise[2],
        equipment: selectedExercise[3],
        gifUrl: selectedExercise[4],
      };

      const isAlreadyFavorited = userExercises.some(
        (item) => item.nome === objectExercise.name
      );

      if (!isAlreadyFavorited) {
        const isFavorited = await addNewExercise(objectExercise, user.id);

        if (isFavorited) {
          setLoadingAdd(false);
          alert("Exercício favoritado com sucesso!");
        }
      } else {
        alert("Esse exercício já está favoritado!");
      }
    }
  };

  return (
    <div>
      {loadindAdd && <p className="loadingAdd-text">Adicionando...</p>}

      <div className="container trainingPlan">
        <div className="text-tp">
          <h2>
            Pesquise e salve seus exercícios <br /> favoritos
          </h2>
          <p>
            Utilize nosso banco de exercícios para montar seu plano de treino
            baseado nos filtros que você mais gosta.
          </p>
        </div>
        <div className="images-desktop">
          <img
            id="tp1"
            className="images-tp-desktop"
            src={tp1}
            alt="imagens de academia 1"
          />
          <img
            id="tp2"
            className="images-tp-desktop"
            src={tp2}
            alt="imagens de academia 2"
          />
          <img
            id="tp3"
            className="images-tp-desktop"
            src={tp3}
            alt="imagens de academia 3"
          />
        </div>
        <div className="images-mobile">
          <img
            className="images-tp-mobile"
            src={tp4}
            alt="imagens de academia 4"
          />
        </div>
      </div>

      <div className="container form">
        <h4>Banco de exercícios</h4>

        <form onSubmit={handleSubmit} className="form-tp">
          <div className="input-form">
            <label htmlFor="type">Tipo de exercício</label>
            <select
              id="tipo"
              className={
                searchClicked && emptyFields.includes("type")
                  ? "form-select error"
                  : "form-select"
              }
              onChange={(e) => setType(e.target.value)}
              value={type}
            >
              <option value="" className="selected-op">
                Escolha
              </option>
              <option value="lower arms">Braço (Inferior)</option>
              <option value="upper arms">Braço (Superior)</option>
              <option value="cardio">Cardio</option>
              <option value="waist">Cintura</option>
              <option value="back">Costas</option>
              <option value="shoulders">Ombros</option>
              <option value="chest">Peito</option>
              <option value="lower legs">Pernas (Inferior)</option>
              <option value="upper legs">Pernas (Superior)</option>
            </select>
          </div>

          <input
            className="search-button"
            type="submit"
            value="Pesquisar"
            disabled={loadingExercises}
          />
        </form>

        {loadingExercises ? (
          <p className="loading-text">Carregando...</p>
        ) : (
          <div>
            {data && data.length > 0 ? (
              <div className="results-form">
                <h4>Resultados:</h4>

                <div className="row results">
                  {data.map((item, index) => (
                    <div
                      key={index}
                      id={`card-${index}`}
                      className={`result-item my-2 col-6`}
                    >
                      {/* Ícones de Favoritos */}
                      {favoriteExercise.some(
                        (favorite) => favorite[0] === item[0]
                      ) ? (
                        <AiFillStar className="star-favorite" />
                      ) : (
                        <AiOutlineStar
                          onClick={() => handleSaveExercise(index)}
                          className="star-favorite"
                        />
                      )}

                      <p className="name-item">{item[0]}</p>
                      <p className="type-item">
                        Tipo: <span>{item[1]}</span>
                      </p>
                      <p className="target-item">
                        Grupo alvo: <span>{item[2]}</span>
                      </p>
                      <p className="equipment-item">
                        Equipamento: <span>{item[3]}</span>
                      </p>
                      <input
                        type="submit"
                        value="ver mais"
                        data-bs-toggle="modal"
                        data-bs-target={`#modal-item${index}`}
                      />

                      <div
                        className="modal fade"
                        id={`modal-item${index}`}
                        tabIndex="-1"
                        aria-labelledby={`modal-label-item${index}`}
                        aria-hidden="true"
                      >
                        {/* Modal */}
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="header-modal">
                              <h5
                                className="modal-title"
                                id={`modal-label-item${index}`}
                              >
                                {item[0]}
                              </h5>
                            </div>
                            <div className="body-modal">
                              <img
                                className="gif-exercise"
                                src={item[4]}
                                alt="gif-exercise"
                              />
                            </div>
                            <div className="footer-modal">
                              <button
                                type="button"
                                className="close-button"
                                data-bs-dismiss="modal"
                              >
                                Fechar
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        )}

        {searchClicked && noResultsFound && data.length === 0 && (
          <h2 className="no-results-found">Nenhum resultado encontrado :(</h2>
        )}
      </div>
    </div>
  );
};

export default TrainingPlan;
