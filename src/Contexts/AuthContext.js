import React, { createContext, useEffect, useState } from "react";

// APIs
import createUser from "../APIs/useCreateUser";
import receiveUser from "../APIs/useApiReceiveUser";
import checkDuplicateEmail from "../APIs/useCheckDuplicateEmail";
import changeName from "../APIs/useApiChangeUsername";
import changePassword from "../APIs/useApiChangePassword";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const isAuthenticated = () => {
    return user !== null;
  };

  const login = async (userJson) => {
    try {
      const user = JSON.parse(userJson);
      setUser(user);
    } catch (error) {
      throw new Error("Falha no login");
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
        return true;
      }
    } catch (error) {
      console.error("Falha na atualização de senha", error);
      throw new Error("Falha na atualização de senha");
    }
  };

  const updateUsername = async (newName, user) => {
    try {
      await changeName(newName, user.id, setUser);
      const updatedUser = await receiveUser(user.email, user.senha, login);
      return updatedUser !== null;
    } catch (error) {
      console.error("Erro ao atualizar o nome de usuário", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
  };

  useEffect(() => {
    if (isAuthenticated()) {
      console.log("Está autenticado!");
    } else {
      console.log("Não está autenticado!");
    }
    console.log(user);
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        register,
        isDuplicateEmail,
        updatePassword,
        updateUsername,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
