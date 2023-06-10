import axios from "axios";

const deleteExercise = async (id) => {
  const url = "http://127.0.0.1:5000/api/exercicio";

  const data = {
    id: id,
  };

  console.log(data);

  try {
    const response = await axios.post(url, data);
    console.log(response);
    console.log("Exercício deletado!");
    return true;
  } catch (error) {
    console.log("Falha ao deletar exercício!", error);
    throw error;
  }
};

export default deleteExercise;
