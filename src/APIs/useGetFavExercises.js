import axios from "axios";

const getFavoriteExercises = async (id) => {
  const url = `http://127.0.0.1:5000/api/exercicio/${id}`;

  try {
    const response = await axios.get(url);

    if (response.status === 200) {
      return response.data;
    } else {
      console.log("Falha ao receber exercícios.");
      throw new Error("Falha ao receber exercícios.");
    }
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  }
};

export default getFavoriteExercises;
