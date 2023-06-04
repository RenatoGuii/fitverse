import axios from "axios";

const changeName = async (dataName, id, updateUser) => {
  const url = `http://127.0.0.1:5000/api/user/${id}`;

  const userAttJson = JSON.stringify(dataName);

  try {
    const response = await axios.put(url, userAttJson, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Usuário atualizado com sucesso!");

    // Atualize a variável 'user' com os dados atualizados
    updateUser(response.data);

    return true;
  } catch (error) {
    console.error("Falha ao atualizar usuário.", error);
    throw error;
  }
};

export default changeName;
