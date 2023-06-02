import React, { createContext, useEffect, useState } from "react";

// APIs
import createUser from "../APIs/useCreateUser";
import changePassword from "../APIs/useApiChangePassword";
import changeName from "../APIs/useApiChangeUsername";
import receiveUser from "../APIs/useApiReceiveUser";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const isAuthenticated = () => {
    return user !== null; // Ou qualquer outra lógica para verificar se o usuário está autenticado
  };

  const login = async (userJson) => {
    try {
      const user = JSON.parse(userJson);
      setUser(user);
    } catch (error) {
      throw new Error("Falha no login");
    }
  };

  const register = async (userJson) => {
    try {
      createUser(userJson);
      const user = JSON.parse(userJson);
      setUser(user);
    } catch (error) {
      throw new Error("Falha no registro");
    }
  };

  const updatePassword = async (userJson) => {
    try {
      changePassword(userJson);
    } catch (error) {
      throw new Error("Falha na atualização de senha");
    }
  };

  const updateUsername = async (userJson) => {
    try {
      changeName(userJson);
      const user = JSON.parse(userJson);
      setUser((prevUser) => ({
        ...prevUser,
        nome: user.nome,
      }));
    } catch (error) {
      throw new Error("Falha na atualização do nome de usuário");
    }
  };

  const logout = () => {
    setUser(null);
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        register,
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
