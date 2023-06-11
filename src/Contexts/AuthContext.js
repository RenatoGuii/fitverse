import React, { createContext, useEffect, useState } from "react";

// APIs
import addExercise from "../APIs/useAddFavExercise";
import changeName from "../APIs/useChangeUsername";
import changePassword from "../APIs/useChangePassword";
import checkDuplicateEmail from "../APIs/useCheckDuplicateEmail";
import createUser from "../APIs/useCreateUser";
import deleteExercise from "../APIs/useDeleteFavExercise";
import getFavoriteExercises from "../APIs/useGetFavExercises";
import receiveUser from "../APIs/useReceiveUser";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const [userExercises, setUserExercises] = useState(
    JSON.parse(localStorage.getItem("userExercises")) || []
  );

  const [loginConfirm, setLoginConfirm] = useState(false);

  const isAuthenticated = () => {
    return user !== null;
  };

  const register = async (user, login) => {
    const isCreated = createUser(user, login);

    return isCreated;
  };

  const isDuplicateEmail = async (email) => {
    try {
      const result = await checkDuplicateEmail(email);
      return result;
    } catch (error) {
      throw new Error("Erro ao verificar e-mail duplicado");
    }
  };

  const login = async (userJson) => {
    const userData = JSON.parse(userJson);

    try {
      setUser(userData);
      const favExercises = await getFavoriteExercises(userData.id);

      const isLoad = await getExercises(userData.id);
      if (isLoad) {
        return favExercises;
      }
    } catch (error) {
      console.error(error);
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

  const getExercises = async (userId) => {
    setUserExercises(await getFavoriteExercises(userId));
    saveExercisesToLocalStorage(await getFavoriteExercises(userId));

    if (userExercises.length !== 0) {
      return true;
    }
  };

  const addNewExercise = async (exercise, userId) => {
    try {
      const isAdd = await addExercise(exercise, userId);
      if (isAdd) {
        const updatedExercises = await getFavoriteExercises(userId);
        setUserExercises(updatedExercises);
        saveExercisesToLocalStorage(updatedExercises);
        return true;
      }
    } catch (error) {
      console.error("Erro ao favoritar exercício!");
    }
  };

  const saveExercisesToLocalStorage = (exercises) => {
    localStorage.setItem("userExercises", JSON.stringify(exercises));
    setLoginConfirm(true);
  };

  const deleteFavExercise = async (exerciseID) => {
    const isDeleted = await deleteExercise(exerciseID);

    if (isDeleted) {
      try {
        const updatedExercises = await getFavoriteExercises(user.id);
        setUserExercises(updatedExercises);
        saveExercisesToLocalStorage(updatedExercises);
      } catch (error) {
        console.error("Erro ao obter exercícios favoritos atualizados", error);
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    localStorage.removeItem("userExercises");
    setUserExercises(null);
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
        loginConfirm,
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
