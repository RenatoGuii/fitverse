import axios from "axios";

const checkDuplicateEmail = async (email) => {
  const url = "http://127.0.0.1:5000/api/user";

  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      const usuarios = response.data;

      const existingUser = usuarios.find((usuario) => usuario.email === email);
      
      return existingUser !== undefined;
    } else {
      console.log("Falha ao receber usuários.");
      return false;
    }
  } catch (error) {
    console.error("Erro ao fazer a chamada à API:", error);
    throw error;
  }
};

export default checkDuplicateEmail;
