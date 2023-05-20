// Images
import tp1 from "../../assets/images/tp1.jpg";
import tp2 from "../../assets/images/tp2.jpg";
import tp3 from "../../assets/images/tp3.jpg";
import tp4 from "../../assets/images/tp4.jpg";

const TrainingPlan = () => {
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
      texto: "010101010101010101010",
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

        <div className="form-tp">
          <div className="input-form">
            <label for="type">Musculo (Obrigatório)</label>
            <select id="tipo" className="form-select">
              <option className="selected-op" selected>
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
            <label for="type">Tipo de treino (Opcional)</label>
            <select id="type" class="form-select">
              <option className="selected-op" selected>
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
            <label for="type">Nível (Opcional)</label>
            <select id="tipo" class="form-select">
              <option className="selected-op" selected>
                Escolha
              </option>
              <option value="beginner">Iniciante</option>
              <option value="intermediate">Intermediário</option>
              <option value="expert">Expert</option>
            </select>
          </div>
            <input className="search-button" type="submit" value="Pesquisar" />
        </div>

        <div className="results-form">
          <h4>Resultados:</h4>

          <div className="row">
            {teste &&
              teste.map((item, index) => (
                <div className="result-item my-2 col-6">
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
                    class="modal fade"
                    id={`modal-item${index}`}
                    tabindex="-1"
                    aria-labelledby={`#modal-label-item${index}`}
                    aria-hidden="true"
                  >
                    {/* Modal */}
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5
                            class="modal-title"
                            id={`modal-label-item${index}`}
                          >
                            {item.nome}
                          </h5>
                          <button
                            type="button"
                            class="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div class="modal-body">
                          <p>{item.texto}</p>
                        </div>
                        <div class="modal-footer">
                          <button
                            type="button"
                            class="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Fechar
                          </button>
                          <button type="button" class="btn btn-primary">
                            Salvar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingPlan;
