import axios from "axios";

const receiveUser = async (email, senha, login) => {
  const url = "http://127.0.0.1:5000/api/user";

  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      const usuarios = response.data;

      const user = usuarios.find(
        (usuario) => usuario.email === email && usuario.senha === senha
      );

      if (user) {
        return new Promise((resolve, reject) => {
          const userJson = JSON.stringify(user);
          const exercisesPromise = login(userJson);

          exercisesPromise
            .then((result) => {
              const exercises = result;
              resolve([user, exercises]);
            })
            .catch((error) => {
              console.error(error);
              reject(error);
            });
        });
      } else {
        console.log("Usuário não encontrado.");
        return "usuario não encontrado"
      }
    } else {
      console.log("Falha ao receber usuários.");
    }
  } catch (error) {
    console.error("Erro ao fazer a chamada à API:", error);
    throw error;
  }
};

export default receiveUser;
