import React, { useEffect, useState } from "react";

const Register = () => {
  const [user, setUser] = useState({});
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = (e) => {
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
      alert("Preencha os campos todos os campos!");
    } else if (password.length < 6) {
      alert("A senha deve ter pelo menos 6 digitos!");
    } else if (password !== confirmPassword) {
      alert("As duas senhas estão diferentes, corrija-as!");
    } else {
      setUser({
        username: username,
        email: email,
        password: password,
      });

      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    }
  };

  useEffect(() => {
    const userJson = JSON.stringify(user);
    console.log(user);
    console.log(userJson);
  }, [user]);

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
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="form-label">
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
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="form-label">
            Confirmar senha
          </label>
          <input
            type="password"
            name="confirmarSenha"
            id="confirmarSenha"
            className="form-control-input"
            placeholder="Confirme sua senha"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />

          <a href={"/login"} className="links">
            Já tem uma conta?
          </a>
        </div>

        <button className="btn btn-primary" type="submit">
          Registrar
        </button>
      </form>
    </div>
  );
};

export default Register;
