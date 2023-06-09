import axios from "axios";

const addExercise = (exercise, id) => {
  const url = "http://127.0.0.1:5000/api/exercicio";
  // Substitua pelo URL correto da sua aplicação Flask

  const data = {
    musculo: "musculo do exercicio",
    user_id: "id do usuario",
    nome: "nome do exercicio",
    gif_url: "gif_url",
    equipamento: "equipamento",
    tipo: "tipo do treino",
  };

  try {
    const response = axios.post(url, data);
    console.log("Exercicio favoritado!");
    return true;
  } catch (error) {
    console.log("Falha ao favoritar exercício!");
  }
};

export default addExercise;
