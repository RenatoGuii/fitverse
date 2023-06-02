const axios = require("axios");

const changeName = (user) => {
  const url = `http://127.0.0.1:5000/api/user/${user.id}`; // Substitua pelo URL correto da sua aplicação Flask e pelo ID do usuário que deseja editar

  axios
    .put(url, user, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      console.log("Usuário atualizado com sucesso!");
    })
    .catch((error) => {
      console.error("Falha ao atualizar usuário.", error);
    });
};

export default changeName;
