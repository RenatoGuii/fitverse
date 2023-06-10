import React, { useContext, useEffect, useState } from "react";

// React Router
import { Link } from "react-router-dom";

// Context
import UserContext from "../../Contexts/AuthContext";

// Icon
import { BsFillGearFill } from "react-icons/bs";
import { BsPerson } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";

const Perfil = () => {
  const [data, setData] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [NoResults, setNoResults] = useState(false);

  const { user, logout, userExercises, getExercises, deleteFavExercise } = useContext(UserContext);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    // NoResults(false);
    // isLoading(true);
    // const dataBD = getExercises(user.id);

    // if (dataBD > 0) {
    //   setIsCollapsed(!isCollapsed);
    //   isLoading(false);
    // } else {
    //   NoResults(true);
    //   isLoading(false);
    // }
  };

  const handleRemoveFavoriteExercise = (id) => {
    const confirmed = window.confirm(
      "Deseja excluir esse treino dos seus favoritos?"
    );

    if (confirmed) {
      deleteFavExercise(id);
    }
  };

  useEffect(() => {
    setData([
      [
        "archer push up",
        "peito",
        "peitorais",
        "peso corporal",
        "http://d205bpvrqc9yn1.cloudfront.net/3294.gif",
      ],
      [
        "archer push up",
        "peito",
        "peitorais",
        "peso corporal",
        "http://d205bpvrqc9yn1.cloudfront.net/3294.gif",
      ],
    ]);
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className="container perfil">
      <h1 className="perfil-h1">Perfil de Usuário</h1>
      <div className="user-info-box">
        <h4 className="person-title">
          {" "}
          <BsPerson className="person-icon" /> Informações
        </h4>
        <p className="username">
          Nome de Usuário: <span className="value">{user.nome}</span>
        </p>
        <p className="email">
          Email: <span className="value">{user.email}</span>
        </p>
      </div>

      <div className="favoriteEx">
        <h4 className="favoriteEx-title">
          {" "}
          <AiFillStar className="favoriteEx-icon" /> Exercícios favoritos
        </h4>

        <button
          className="favoriteEx-button-collapse"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseExample"
          aria-expanded={isCollapsed}
          aria-controls="collapseExample"
          onClick={toggleCollapse}
        >
          {isCollapsed ? "Esconder" : "Mostrar"}
        </button>
        <span
          className="loading-text"
          style={{ display: isLoading ? "inline" : "none" }}
        >
          Carregando...
        </span>
        <div className="collapse" id="collapseExample">
          <div className="row results">
            <p
              className="no-results-text"
              style={{ display: NoResults ? "block" : "none" }}
            >
              Nenhum resultado encontrado!
            </p>
            {data.map((item, index) => (
              <div
                key={index}
                id={`card-${index}`}
                className={`result-item my-2 col-6`}
              >
                <AiFillStar
                  onClick={() => handleRemoveFavoriteExercise(item.id)}
                  className="star-favorite"
                />

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
      </div>

      <div className="config">
        <h4 className="config-title">
          {" "}
          <BsFillGearFill className="config-icon" /> Configurações
        </h4>
        <p className="changeUsername">
          <Link className="value" to={"/changeUsername"}>
            Alterar nome de usuário
          </Link>
        </p>
        <p className="changePassword">
          <Link className="value" to={"/changePassword"}>
            Alterar senha
          </Link>
        </p>
      </div>
      <a className="logout" href={"/login"} onClick={() => logout()}>
        Sair
      </a>
    </div>
  );
};

export default Perfil;
