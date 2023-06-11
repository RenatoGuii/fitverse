import React, { useContext, useState } from "react";

// React Router
import { Link } from "react-router-dom";

// Context
import UserContext from "../../Contexts/AuthContext";

// Icon
import { BsFillGearFill } from "react-icons/bs";
import { BsPerson } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";

const Perfil = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [loadingUserExercise, setLoadingExercise] = useState(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const { user, logout, userExercises, getExercises, deleteFavExercise } =
    useContext(UserContext);

  const toggleCollapse = async () => {
    setIsCollapsed(!isCollapsed);
    setNoResults(false);

    if (userExercises.length === 0) {
      setLoadingExercise(true);
      try {
        const exercises = await getExercises(user.id);

        if (exercises) {
          setNoResults(false);
        } else {
          setNoResults(true);
        }

        setLoadingExercise(false);
      } catch (error) {
        console.error("Erro ao obter exercícios favoritos", error);
      } finally {
        setLoadingExercise(false);
      }
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  const handleRemoveFavoriteExercise = async (id) => {
    const confirmed = window.confirm(
      "Deseja excluir esse treino dos seus favoritos?"
    );

    if (confirmed) {
      setIsLoadingDelete(true);
      try {
        await deleteFavExercise(id);
        alert("Exercício deletado com sucesso!");
      } catch (error) {
        console.error("Falha ao deletar exercício!", error);
      } finally {
        setIsLoadingDelete(false);
      }
    }
  };

  return (
    <div className="container perfil">
      {isLoadingDelete && <p className="loading-text">Excluindo...</p>}
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
          className="loadingUserExercise-text"
          style={{
            display: loadingUserExercise && isCollapsed ? "inline" : "none",
          }}
        >
          Carregando...
        </span>

        <div className="collapse" id="collapseExample">
          <div className="row results">
            {noResults && (
              <p className="no-results-text">Nenhum exercício encontrado!</p>
            )}
            {userExercises.map((item, index) => (
              <div
                key={index}
                id={`card-${index}`}
                className={`result-item my-2 col-6`}
              >
                <AiFillStar
                  onClick={() => handleRemoveFavoriteExercise(item.id)}
                  className="star-favorite"
                />

                <p className="name-item">{item.nome}</p>
                <p className="type-item">
                  Tipo: <span>{item.tipo}</span>
                </p>
                <p className="target-item">
                  Grupo alvo: <span>{item.musculo}</span>
                </p>
                <p className="equipment-item">
                  Equipamento: <span>{item.equipamento}</span>
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
                          {item.nome}
                        </h5>
                      </div>
                      <div className="body-modal">
                        <img
                          className="gif-exercise"
                          src={item.gif_url}
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
