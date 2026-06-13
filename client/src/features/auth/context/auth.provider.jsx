import { useEffect, useState } from "react";
import AuthContext from "@/features/auth/context/auth.context.jsx";
import { getMeApi } from "../services/auth.api";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAndSetUser = async () => {
      const data = await getMeApi();
      setUser(data.user);
      setLoading(false);
    };
    getAndSetUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
