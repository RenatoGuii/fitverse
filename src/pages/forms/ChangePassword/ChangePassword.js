import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

// Icons
import { BsFillArrowLeftSquareFill } from "react-icons/bs";

const ChangePassword = () => {
  const user = {
    senha: "teste",
  }; // Resgatar usuário

  const [userData, setUserData] = useState(user);
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = (e) => {
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
    } else if (oldPassword !== userData.senha) {
      alert("Senha atual incorreta!");
    } else if (newPassword.length < 6) {
      alert("A nova senha deve ter pelo menos 6 digitos!");
    } else {
      changePassword(newPassword);
      alert("Senha atualizada com sucesso :)");

      setNewPassword("");
      setOldPassword("");
    }
  };
  const changePassword = (newPassword) => {
    const updateUserData = { ...userData, senha: newPassword };

    // Envés de atualizar o state, mandar o update para o BD
    setUserData(updateUserData);
  };

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  return (
    <div className="changePassword-form-page">
      <Link to={"/perfil"}>
        <BsFillArrowLeftSquareFill className="leave-icon" />
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
          />
        </div>
        <div className="mb-4">
          <label htmlFor="newPassword" className="form-label">
            Senha
          </label>
          <input
            type="password"
            className="form-control-input"
            name="newPassword"
            id="newPassword"
            placeholder="Insira sua senha"
            onChange={(e) => setNewPassword(e.target.value)}
            value={newPassword}
          />
        </div>

        <button className="btn btn-primary" type="submit">
          Atualizar
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
