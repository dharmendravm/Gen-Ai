import { useContext } from "react";
import AuthContext from "@/features/auth/context/auth.context.jsx";
import {
  login,
  register,
  logout,
  getMe,
} from "@/features/auth/services/auth.api.js"

const useAuth = () => {
  const context = useContext(AuthContext);

  const { user, setUser, loading, setLoading } = context;

  const handleLogin = async (email, password) => {
    try {
      setLoading(true);
      const res = await login({ email, password });

      setUser(res.data);
      setLoading(false)
    } catch (error) {
      setLoading(false)
      throw error
    }
  }

  const handleRegister = async ({ username, email, password}) => {
    try {
      setLoading(true);

      const res = await register({ username, email, password});

      setUser(res.data);
      setLoading(false)
    } catch (error) {
      setLoading(false)
      throw error
    }
  }

  const handleLogout = async() => {
    try {
      setLoading(true);

      await logout();

      setUser(null);
      setLoading(false)
    } catch (error) {
      setLoading(false)
      throw error
    }
  }

  const handleGetMe = async() => {
    try {
      setLoading(true);

      const res = await getMe();

      setUser(res.data);
      setLoading(false)
    } catch (error) {
      setLoading(false)
      throw error
    }
  }

  return{
    user,
    setUser,
    loading,
    setLoading,
    handleLogin,
    handleRegister,
    handleLogout,
    handleGetMe,
  }
};

export default useAuth;