import axios from "axios";
import receiveUser from "./useApiReceiveUser";


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
      receiveUser(data.email, data.senha, login);
    } else {
      console.log("Falha ao criar usuário.");
    }
  } catch (error) {
    console.error("Erro ao fazer a chamada à API:", error);
  }
};

export default createUser;
