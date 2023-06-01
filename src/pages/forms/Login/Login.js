import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = (e) => {
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
      console.log(email);
      console.log(password);

      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="login-form-page">
      <h1>
        Bem vindo de volta <br /> ao <span>FitVerse</span> !
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
          />

          <a href={"/register"} className="links">
            Não tem uma conta?
          </a>
        </div>

        <button className="btn btn-primary" type="submit">
          Logar
        </button>
      </form>
    </div>
  );
};

export default Login;
