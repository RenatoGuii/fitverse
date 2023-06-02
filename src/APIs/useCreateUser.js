import axios from "axios";

const createUser = async (data) => {
  const url = "http://127.0.0.1:5000/api/user"; // Substitua pelo URL correto da sua aplicação Flask

  console.log(data);

  try {
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      console.log("Usuário criado com sucesso!");
    } else {
      console.log("Falha ao criar usuário.");
    }
  } catch (error) {
    console.error("Erro ao fazer a chamada à API:", error);
  }
};

export default createUser;
