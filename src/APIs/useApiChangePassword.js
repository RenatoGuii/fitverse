const axios = require("axios");

const changePassword = (user) => {
  const url = "http://127.0.0.1:5000/api/user/senha/3";

  axios
    .put(url, user)
    .then((response) => {
      console.log("Senha atualizada com sucesso!");
    })
    .catch((error) => {
      console.error("Falha ao atualizar senha.", error);
    });
};

export default changePassword;
