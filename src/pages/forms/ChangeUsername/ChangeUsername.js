import React, { useContext, useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

// Context
import UserContext from "../../../Contexts/AuthContext";

// Icons
import { BsFillArrowLeftSquareFill } from "react-icons/bs";

const ChangeUsername = () => {
  const [newUsername, setNewUsername] = useState("");
  const [password, setPassword] = useState("");
  const [emptyFields, setEmptyFields] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { user, updateUsername } = useContext(UserContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setError("");
    e.preventDefault();

    const emptyFieldsArr = [];

    if (newUsername === "") {
      emptyFieldsArr.push("newUsername");
    }

    if (password === "") {
      emptyFieldsArr.push("password");
    }

    if (emptyFieldsArr.length > 0) {
      setEmptyFields(emptyFieldsArr);
      alert("Preencha todos os campos!");
    } else if (password !== user.senha) {
      setError("Senha incorreta");
    } else if (newUsername === user.nome) {
      setError("O novo nome deve ser diferente do nome atual");
    } else {
      setIsLoading(true);

      const dataName = {
        nome: newUsername,
      };

      try {
        const isUpdated = await updateUsername(dataName, user);
        if (isUpdated) {
          alert("Nome de usuário trocado com sucesso!");
          navigate("/perfil");
        }
      } catch (error) {
        console.error("Erro ao atualizar o nome de usuário", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className="changeUsername-form-page">
      <Link to={"/perfil"}>
        <BsFillArrowLeftSquareFill
          className="leave-icon"
          style={{ display: isLoading ? "none" : "" }}
        />
      </Link>
      <h1>
        Alterar nome de <br /> usuário
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="newUsername" className="form-label">
            Novo nome de usuário
          </label>
          <input
            type="text"
            className="form-control-input"
            name="newUsername"
            id="newUsername"
            placeholder="Insira seu nome"
            onChange={(e) => setNewUsername(e.target.value)}
            value={newUsername}
            disabled={isLoading}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="form-label">
            Senha
          </label>
          <input
            type="password"
            className="form-control-input"
            name="password"
            id="password"
            placeholder="Insira sua senha"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            disabled={isLoading}
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button className="btn btn-primary" type="submit" disabled={isLoading}>
          {isLoading ? "Carregando..." : "Atualizar"}
        </button>
      </form>
    </div>
  );
};

export default ChangeUsername;
