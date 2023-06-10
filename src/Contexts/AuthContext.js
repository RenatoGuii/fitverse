import React, { createContext, useEffect, useState } from "react";

// APIs
import createUser from "../APIs/useCreateUser";
import receiveUser from "../APIs/useReceiveUser";
import checkDuplicateEmail from "../APIs/useCheckDuplicateEmail";
import changeName from "../APIs/useChangeUsername";
import changePassword from "../APIs/useChangePassword";
import getFavoriteExercises from "../APIs/useGetFavExercises";
import addExercise from "../APIs/useAddFavExercise";
import deleteExercise from "../APIs/useDeleteFavExercise";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [userExercises, setUserExercises] = useState([]);

  const isAuthenticated = () => {
    return user !== null;
  };

  const login = async (userJson) => {
    const userData = JSON.parse(userJson);
    try {
      setUser(userData);
    } catch (error) {
      console.error(error);
    }
  };

  const register = async (user, login) => {
    createUser(user, login);
  };

  const isDuplicateEmail = async (email) => {
    try {
      const result = await checkDuplicateEmail(email);
      return result;
    } catch (error) {
      throw new Error("Erro ao verificar e-mail duplicado");
    }
  };

  const updatePassword = async (newPassword, user) => {
    try {
      const response = await changePassword(newPassword, user.id);

      if (response) {
        const updatedUser = { ...user, senha: newPassword };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        return true;
      }
    } catch (error) {
      console.error("Falha na atualização de senha", error);
      throw new Error("Falha na atualização de senha");
    }
  };

  const updateUsername = async (newName, userData) => {
    try {
      const isUpdated = await changeName(newName, userData.id);

      if (isUpdated) {
        const updatedUser = await receiveUser(
          userData.email,
          userData.senha,
          login
        );

        localStorage.setItem("user", JSON.stringify(updatedUser));
        return updatedUser !== null;
      }
    } catch (error) {
      console.error("Erro ao atualizar o nome de usuário", error);
      throw error;
    }
  };

  const getExercises = async () => {
    setUserExercises(await getFavoriteExercises(user.id));
  };

  const addNewExercise = async (exercise, userId) => {
    try {
      const isAdd = await addExercise(exercise, userId);
      if (isAdd) {
        setUserExercises(await getFavoriteExercises(userId));
      }
    } catch (error) {
      console.error("Erro ao favoritar exercício!", error);
      throw error;
    }
  };

  const deleteFavExercise = async (exerciseID) => {
    const isDeleted = await deleteExercise(exerciseID);

    if (isDeleted) {
      setUserExercises(await getFavoriteExercises(exerciseID));
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  useEffect(() => {
    if (isAuthenticated()) {
      console.log("Está autenticado!");
    } else {
      console.log("Não está autenticado!");
    }
    console.log(user);
    console.log(userExercises);
  }, [user, userExercises]);

  return (
    <UserContext.Provider
      value={{
        user,
        userExercises,
        login,
        register,
        isDuplicateEmail,
        updatePassword,
        updateUsername,
        getExercises,
        addNewExercise,
        deleteFavExercise,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
