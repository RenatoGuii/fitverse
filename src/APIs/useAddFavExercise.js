import axios from "axios";

const addExercise = async (exercise, id) => {
  const url = "http://127.0.0.1:5000/api/exercicio";

  const data = {
    musculo: exercise.target,
    user_id: id,
    nome: exercise.name,
    gif_url: exercise.gifUrl,
    equipamento: exercise.equipment,
    tipo: exercise.type,
  };

  try {
    const response = await axios.post(url, data);
    console.log("Exercicio favoritado!");
    return true;
  } catch (error) {
    console.error("Falha ao favoritar exercício!", error);
    throw error;
  }
};

export default addExercise;
