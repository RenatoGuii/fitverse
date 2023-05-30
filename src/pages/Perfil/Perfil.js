import React, { useState } from "react";

// React Router
import { Link } from "react-router-dom";

// Icon
import { BsFillGearFill } from "react-icons/bs";

const Perfil = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div className="container perfil">
      <h1 className="perfil-h1">Perfil de Usuário</h1>
      <div className="user-info-box">
        <p className="username">
          Nome de Usuário: <span className="value">{username}</span>
        </p>
        <p className="email">
          Email: <span className="value">{email}</span>
        </p>
      </div>
      <div className="options">
        <h4 className="options-title"> <BsFillGearFill className="config-icon" /> Configurações</h4>
        <p className="changeUsername">
          <Link className="value" to={"/changeUsername"}>Alterar nome de usuário</Link>
        </p>
        <p className="changePassword">
          <Link className="value" to={"/changePassword"}>Alterar senha</Link>
        </p>
      </div>
      <Link className="logout" to={"/login"}>Sair</Link>
    </div>
  );
};

export default Perfil;
