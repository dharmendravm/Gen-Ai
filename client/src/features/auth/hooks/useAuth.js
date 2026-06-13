import { useContext } from "react";
import AuthContext from "@/features/auth/context/auth.context.jsx";
import {
  loginApi,
  registerApi,
  logoutApi,
  getMeApi,
} from "@/features/auth/services/auth.api.js";

const useAuth = () => {
  const context = useContext(AuthContext);

  const { user, setUser, loading, setLoading } = context;

  const handleLogin = async ({ email, password }) => {
    try {
      setLoading(true);
      const res = await loginApi({ email, password });

      setUser(res.user);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const handleRegister = async ({ username, email, password }) => {
    try {
      setLoading(true);

      const res = await registerApi({ username, email, password });

      setUser(res.user);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const handleLogout = async () => {
    try {
      setLoading(true);

      await logoutApi();

      setUser(null);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const handleGetMe = async () => {
    try {
      setLoading(true);

      const res = await getMeApi();

      setUser(res.user);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  return {
    user,
    setUser,
    loading,
    setLoading,
    handleLogin,
    handleRegister,
    handleLogout,
    handleGetMe,
  };
};

export default useAuth;
