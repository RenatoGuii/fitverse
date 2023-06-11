import axios from "axios";
import receiveUser from "./useReceiveUser";

const createUser = async (data, login) => {
  const url = "http://127.0.0.1:5000/api/user";

  console.log(data);

  const dataJson = JSON.stringify(data);

  try {
    const response = await axios.post(url, dataJson, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      console.log("Usuário criado com sucesso!");
      const searchUser = await receiveUser(data.email, data.senha, login);

      if (searchUser && searchUser[0] && searchUser[1]) {
        localStorage.setItem("user", JSON.stringify(searchUser[0]));
        localStorage.setItem("userExercises", JSON.stringify(searchUser[1]));
        return true;
      }
    } else {
      console.log("Falha ao criar usuário.");
    }
  } catch (error) {
    console.error("Erro ao fazer a chamada à API:", error);
  }

  return false; // Retorne false caso ocorra algum erro ou falha
};

export default createUser;
