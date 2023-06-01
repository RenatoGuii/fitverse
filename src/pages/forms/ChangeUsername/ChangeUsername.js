import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

// Icons
import { BsFillArrowLeftSquareFill } from "react-icons/bs";

const ChangeUsername = () => {
  const user = {
    nome: "teste",
    senha: "teste",
  }; // Resgatar usuário

  const [userData, setUserData] = useState(user);
  const [newUsername, setNewUsername] = useState("");
  const [password, setPassword] = useState("");

  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = (e) => {
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
    } else if (password !== userData.senha) {
      alert("Senha incorreta!");
    } else {
      changeName(newUsername);
      alert("Nome de usuário trocado com sucesso :)");

      setNewUsername("");
      setPassword("");
    }
  };

  const changeName = (newUsername) => {
    const updateUserData = { ...userData, nome: newUsername };

    // Envés de atualizar o state, mandar o update para o BD
    setUserData(updateUserData);
  };

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  return (
    <div className="changeUsername-form-page">
      <Link to={"/perfil"}>
        <BsFillArrowLeftSquareFill className="leave-icon" />
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
          />
        </div>

        <button className="btn btn-primary" type="submit">
          Atualizar
        </button>
      </form>
    </div>
  );
};

export default ChangeUsername;
