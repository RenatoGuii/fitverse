import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import receiveUser from "../../../APIs/useApiReceiveUser";
import UserContext from "../../../Contexts/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emptyFields, setEmptyFields] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const { login, logout } = useContext(UserContext);

  const handleSubmit = async (e) => {
    setError("");

    e.preventDefault();

    const emptyFieldsArr = [];

    if (email === "") {
      emptyFieldsArr.push("email");
    }

    if (password === "") {
      emptyFieldsArr.push("password");
    }

    if (emptyFieldsArr.length > 0) {
      setEmptyFields(emptyFieldsArr);
      alert("Preencha todos os campos!");
    } else {
      setIsLoading(true);

      try {
        const user = await receiveUser(email, password, login);

        if (user) {
          login(JSON.stringify(user));
          navigate("/trainingPlan");
          setIsLoading(false);
        } else {
          setError("email ou senha incorretos");
          setIsLoading(false);
        }
      } catch (error) {
        setError("Erro ao fazer login");
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    logout();
  }, []);

  return (
    <div className="login-form-page">
      <h1>
        Bem-vindo de volta <br /> ao <span>FitVerse</span>!
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="form-label">
            Endereço de E-mail
          </label>
          <input
            type="email"
            className="form-control-input"
            name="email"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Insira seu e-mail"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            disabled={isLoading}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="form-label">
            Senha
          </label>
          <input
            type="password"
            name="senha"
            id="senha"
            className="form-control-input"
            placeholder="Digite sua senha"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            disabled={isLoading}
          />

          <a
            href={"/register"}
            className="links"
            style={{ display: isLoading ? "none" : "" }}
          >
            Não tem uma conta?
          </a>
        </div>

        {error && <p className="error-message">{error}</p>}

        <button className="btn btn-primary" type="submit" disabled={isLoading}>
          {isLoading ? "Carregando..." : "Logar"}
        </button>
      </form>
    </div>
  );
};

export default Login;
