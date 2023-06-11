import React, { useContext, useEffect, useState } from "react";

// API
import UserContext from "../../../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [emptyFields, setEmptyFields] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { isAuthenticated, register, login, isDuplicateEmail } =
    useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setError("");

    e.preventDefault();

    const emptyFieldsArr = [];

    if (username === "") {
      emptyFieldsArr.push("username");
    }

    if (email === "") {
      emptyFieldsArr.push("email");
    }

    if (password === "") {
      emptyFieldsArr.push("password");
    }

    if (confirmPassword === "") {
      emptyFieldsArr.push("password");
    }

    if (emptyFieldsArr.length > 0) {
      setEmptyFields(emptyFieldsArr);
      alert("Preencha todos os campos!");
    } else if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 digitos!");
    } else if (password !== confirmPassword) {
      setError("As duas senhas estão diferentes, corrija-as!");
    } else {
      setIsLoading(true);

      try {
        const checkEmail = await isDuplicateEmail(email);

        if (checkEmail) {
          setError("Esse e-mail já está sendo utilizado");
          setIsLoading(false);
        } else {
          const userObj = {
            nome: username,
            email: email,
            senha: password,
          };

          const isRegister = await register(userObj, login);

          if (isRegister) {
            navigate("/trainingPlan");
            setIsLoading(false);

            setUsername("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
          }
        }
      } catch (error) {
        setError("Erro ao fazer registro");
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="register-form-page">
      <h1>
        Bem vindo <br /> ao <span>FitVerse</span> !
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="form-label">
            Nome de usuário
          </label>
          <input
            type="text"
            className="form-control-input"
            name="username"
            id="username"
            placeholder="Insira seu nome"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            disabled={isLoading}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="form-label">
            Endereço de E-mail
          </label>
          <input
            type="email"
            className="form-control-input"
            name="email"
            id="email"
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
            className="form-control-input"
            name="password"
            id="password"
            placeholder="Digite sua senha"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            disabled={isLoading}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="confirmPassword" className="form-label">
            Confirmar senha
          </label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            className="form-control-input"
            placeholder="Confirme sua senha"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            disabled={isLoading}
          />

          <a
            href={"/login"}
            className="links"
            style={{ display: isLoading ? "none" : "" }}
          >
            Já tem uma conta?
          </a>
        </div>

        {error && <p className="error-message">{error}</p>}

        <button className="btn btn-primary" type="submit" disabled={isLoading}>
          {isLoading ? "Carregando..." : "Registrar"}
        </button>
      </form>
    </div>
  );
};

export default Register;
