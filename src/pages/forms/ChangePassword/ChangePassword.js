import React, { useContext, useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

// Context
import UserContext from "../../../Contexts/AuthContext";

// Icons
import { BsFillArrowLeftSquareFill } from "react-icons/bs";

const ChangePassword = () => {
  const { user } = useContext(UserContext);

  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emptyFields, setEmptyFields] = useState([]);

  const { updatePassword } = useContext(UserContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setError("");
    e.preventDefault();

    const emptyFieldsArr = [];

    if (oldPassword === "") {
      emptyFieldsArr.push("oldPassword");
    }

    if (newPassword === "") {
      emptyFieldsArr.push("newPassword");
    }

    if (emptyFieldsArr.length > 0) {
      setEmptyFields(emptyFieldsArr);
      alert("Preencha todos os campos!");
    } else if (oldPassword === newPassword) {
      setError("A nova senha deve ser diferente da senha atual!");
    } else if (oldPassword !== user.senha) {
      setError("Senha atual incorreta!");
    } else if (newPassword.length < 6) {
      setError("A nova senha deve ter pelo menos 6 dígitos!");
    } else {
      setIsLoading(true);

      try {
        const isUpdated = await updatePassword(newPassword, user);
        if (isUpdated) {
          alert("Senha alterada com sucesso!");
          navigate("/perfil");
        }
      } catch (error) {
        console.error("Erro ao atualizar o nome de usuário", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="changePassword-form-page">
      <Link to={"/perfil"}>
        {/* disabled={isLoading} */}
        <BsFillArrowLeftSquareFill
          className="leave-icon"
          style={{ display: isLoading ? "none" : "" }}
        />
      </Link>
      <h1>Alterar senha</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="oldPassword" className="form-label">
            Senha Atual
          </label>
          <input
            type="password"
            className="form-control-input"
            name="oldPassword"
            id="oldPassword"
            placeholder="Insira seu nome"
            onChange={(e) => setOldPassword(e.target.value)}
            value={oldPassword}
            disabled={isLoading}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="newPassword" className="form-label">
            Nova Senha
          </label>
          <input
            type="password"
            className="form-control-input"
            name="newPassword"
            id="newPassword"
            placeholder="Insira sua senha"
            onChange={(e) => setNewPassword(e.target.value)}
            value={newPassword}
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

export default ChangePassword;
