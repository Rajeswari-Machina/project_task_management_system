import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true; 

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ user: null, loading: true });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('http://localhost:7000/api/auth/me',{widthCredentials:'true'}); // 👈 fetch user using token cookie
        setAuth({ user: res.data.user, loading: false });
      } catch (err) {
        console.error('Auth fetch failed:', err);
        setAuth({ user: null, loading: false });
      }
    };
    fetchUser();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post('http://localhost:7000/api/auth/login',{ email, password });
      setAuth({ user: res.data.user, loading: false });
      alert(res.data.message);
    } catch (err) {
      console.error('Login error:', err);
      setAuth({ user: null, loading: false });
      throw new Error(err.response?.data?.message || 'Login failed');
    }
  };

  const register = async (userData) => {
    try {
      
      const res = await axios.post('http://localhost:7000/api/auth/register', userData);
      setAuth({ user: res.data.user, loading: false });
    } catch (err) {
      console.error('Registration error:', err);
      throw new Error(err.response?.data?.message || 'Registration failed');
    }
  };

  const logout = async () => {
    try {
      await axios.get('http://localhost:7000/api/auth/logout',  {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      setAuth({ user: null, loading: false });
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const createProject = async (projectData) => {
    try {
      const res = await axios.post('http://localhost:7000/api/projects/',{withCredentials:true}, projectData);
      return res.data;
    } catch (err) {
      console.error('Project creation error:', err);
      throw new Error(err.response?.data?.message || 'Project creation failed');
    }
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, register, logout, createProject }}>
      {!auth.loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
