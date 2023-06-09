import axios from "axios";

const changePassword = async (newPassword, id) => {
  const url = `http://127.0.0.1:5000/api/user/senha/${id}`;

  const data = {
    senha: newPassword,
  };

  try {
    const response = await axios.put(url, data);
    console.log("Senha atualizada com sucesso!");
    return true;
  } catch (error) {
    console.error("Falha ao atualizar senha.", error);
    throw error;
  }
};

export default changePassword;
