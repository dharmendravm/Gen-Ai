import { useState } from 'react';
import AuthContext from '@/features/auth/context/auth.context.jsx';

 const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <AuthContext.Provider value={user, setUser, loading, setLoading}>
        {children}
    </AuthContext.Provider>
  )
};

export default AuthProvider;
