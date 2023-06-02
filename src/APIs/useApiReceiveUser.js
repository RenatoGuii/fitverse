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
        const userJson = JSON.stringify(user);
        login(userJson);
        return user; // Retorne o usuário encontrado
      } else {
        console.log("Usuário não encontrado.");
      }
    } else {
      console.log("Falha ao receber usuários.");
    }
  } catch (error) {
    console.error("Erro ao fazer a chamada à API:", error);
    throw error; // Lança o erro para ser tratado no componente Login
  }
};

export default receiveUser;
