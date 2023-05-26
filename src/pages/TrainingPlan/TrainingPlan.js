import { useEffect, useState } from "react";

// Images
import tp1 from "../../assets/images/tp1.jpg";
import tp2 from "../../assets/images/tp2.jpg";
import tp3 from "../../assets/images/tp3.jpg";
import tp4 from "../../assets/images/tp4.jpg";

// Icon
import { AiOutlineCloseCircle } from "react-icons/ai";

const TrainingPlan = () => {
  const [muscle, setMuscle] = useState("");
  const [type, setType] = useState("");
  const [level, setLevel] = useState("");
  const [favoritePlans, setFavoritePlans] = useState([]);

  const [searchClicked, setSearchClicked] = useState(false);
  const [emptyFields, setEmptyFields] = useState([]);

  const [editButtonActive, setEditButtonActive] = useState(false);
  const [deleteCardActive, setDeleteCardActive] = useState([]);

  const alertSaveEdits = () => {
    window.confirm("Deseja salvar as alterações?");
  };

  const editButtonActivation = () => {
    setEditButtonActive(!editButtonActive);
  };

  const deleteCardActivation = (index) => {
    setDeleteCardActive((prevState) => {
      const updatedDeleteCardActive = [...prevState];
      updatedDeleteCardActive[index] = !updatedDeleteCardActive[index];
      return updatedDeleteCardActive;
    });
  };

  const cancelButtonActivation = () => {
    setDeleteCardActive([]);
  };

  useEffect(() => {
    console.log(favoritePlans);
  }, [favoritePlans]);

  const handleSavePlan = () => {
    const allCardsHidden = teste.every((item) => item.display === "none");

    if (allCardsHidden) {
      alert(
        "Não é possível confirmar o plano, pois não há treinos para salvar."
      );
    } else {
      const confirmed = window.confirm(
        "Deseja confirmar o salvamento do plano?"
      );

      if (confirmed) {
        const addPlan = teste
          .filter((item, index) => !deleteCardActive[index])
          .map((item) => ({ ...item }));
        setFavoritePlans((prevFavoritePlans) => [
          ...prevFavoritePlans,
          addPlan,
        ]);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emptyFieldsArr = [];

    if (muscle === "") {
      emptyFieldsArr.push("muscle");
    }
    if (type === "") {
      emptyFieldsArr.push("type");
    }
    if (level === "") {
      emptyFieldsArr.push("level");
    }

    if (emptyFieldsArr.length > 0) {
      setEmptyFields(emptyFieldsArr);
      setSearchClicked(true);
      alert("Preencha os campos primeiro!");
    } else {
      setEmptyFields([]);
      setSearchClicked(false);
      console.log(muscle);
      console.log(type);
      console.log(level);
      setMuscle("");
      setType("");
      setLevel("");
    }
  };

  const teste = [
    {
      nome: "teste",
      tipo: "tipo",
      musculo: "musculo",
      level: "level",
      texto: "kdkdkdkdkdkdkdkdkdkd",
    },
    {
      nome: "teste2",
      tipo: "tipo2",
      musculo: "musculo2",
      level: "level2",
      texto: "01010101010101010101001010101010",
    },
  ];

  return (
    <div>
      <div className="container trainingPlan">
        <div className="text-tp">
          <h2>
            Monte seu plano <br /> de treinos
          </h2>
          <p>
            Utilize nosso sistema para montar seu plano de treino baseado nos
            filtros que você mais gosta.
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
        <h4>Planejador de treinos</h4>

        <form onSubmit={handleSubmit} className="form-tp">
          <div className="input-form">
            <label htmlFor="type">Musculo</label>
            <select
              id="tipo"
              className={
                searchClicked && emptyFields.includes("muscle")
                  ? "form-select error"
                  : "form-select"
              }
              onChange={(e) => setMuscle(e.target.value)}
              value={muscle}
            >
              <option value="" className="selected-op">
                Escolha
              </option>
              <option value="abdominals">Abdômen</option>
              <option value="abductors">Abdutor</option>
              <option value="adductors">Adutores</option>
              <option value="forearms">Antebraços</option>
              <option value="biceps">Bíceps</option>
              <option value="lats">Dorsal</option>
              <option value="glutes">Glúteos</option>
              <option value="lower_back">Inferior - Costas</option>
              <option value="hamstrings">Isquiotibais</option>
              <option value="middle_back">Meio - Costas</option>
              <option value="calves">Panturrilha</option>
              <option value="chest">Peito</option>
              <option value="neck">Pescoço</option>
              <option value="quadriceps">Quadríceps</option>
              <option value="traps">Trapézio</option>
              <option value="triceps">Tríceps</option>
            </select>
          </div>
          <div className="input-form">
            <label htmlFor="type">Tipo de treino</label>
            <select
              id="type"
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
              <option value="stretching">Alongamento</option>
              <option value="cardio">Cardio</option>
              <option value="strength">Força</option>
              <option value="olympic_weightlifting">
                Lev. de peso olímpico
              </option>
              <option value="plyometrics">Pliometria</option>
              <option value="powerlifting">Powerlifting</option>
              <option value="strongman">Strongman</option>
            </select>
          </div>
          <div className="input-form">
            <label htmlFor="type">Nível</label>
            <select
              id="tipo"
              className={
                searchClicked && emptyFields.includes("level")
                  ? "form-select error"
                  : "form-select"
              }
              onChange={(e) => setLevel(e.target.value)}
              value={level}
            >
              <option value="" className="selected-op">
                Escolha
              </option>
              <option value="beginner">Iniciante</option>
              <option value="intermediate">Intermediário</option>
              <option value="expert">Expert</option>
            </select>
          </div>
          <input className="search-button" type="submit" value="Pesquisar" />
        </form>

        <div className="results-form">
          <h4>Resultados:</h4>

          <div className="row results">
            <div className="action-buttons">
              <button
                className={
                  editButtonActive ? "save-button-active" : "save-button"
                }
                onClick={() => {
                  editButtonActivation();
                  alertSaveEdits();
                }}
              >
                Salvar
              </button>

              <button
                className={!editButtonActive ? "edit-button" : "reset-button"}
                onClick={
                  !editButtonActive
                    ? editButtonActivation
                    : () => {
                        editButtonActivation();
                        cancelButtonActivation();
                      }
                }
              >
                {!editButtonActive ? "Editar" : "Resetar"}
              </button>
            </div>

            {teste &&
              teste.map((item, index) => (
                <div
                  key={index}
                  id={`card-${index}`}
                  className={`result-item my-2 col-6`}
                  style={{
                    display: deleteCardActive[index] ? "none" : "block",
                  }}
                >
                  {editButtonActive ? (
                    <AiOutlineCloseCircle
                      className="delete-training-button"
                      onClick={() => deleteCardActivation(index)}
                    />
                  ) : (
                    ""
                  )}

                  <p className="name-item">{item.nome}</p>
                  <p className="type-item">
                    Tipo: <span>{item.nome}</span>
                  </p>
                  <p className="muscle-item">
                    Muscúlo: <span>{item.musculo}</span>
                  </p>
                  <p className="level-item">
                    Dificuldade: <span>{item.level}</span>
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
                    aria-labelledby={`#modal-label-item${index}`}
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
                            {item.nome}
                          </h5>

                          <AiOutlineCloseCircle
                            className="close-button"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          />
                        </div>
                        <div className="body-modal">
                          <p>{item.texto}</p>
                        </div>
                        <div className="footer-modal">
                          <button
                            type="button"
                            className="close-button2"
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

            <div className="save-plan-div">
              <button
                style={{
                  display: !editButtonActive ? "block" : "none",
                }}
                className="save-plan-button"
                onClick={handleSavePlan}
              >
                SALVAR PLANO
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingPlan;
