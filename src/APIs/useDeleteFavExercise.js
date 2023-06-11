import axios from "axios";

const deleteExercise = async (id) => {
  const url = `http://127.0.0.1:5000/api/exercicio/${id}`;

  try {
    const response = await axios.delete(url);
    console.log(response);
    console.log("Exercício deletado!");
    return true;
  } catch (error) {
    console.error("Falha ao deletar exercício!", error);
  }
};

export default deleteExercise;
