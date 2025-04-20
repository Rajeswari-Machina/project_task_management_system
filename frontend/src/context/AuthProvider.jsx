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
        const res = await axios.get(`https://backend-service-m0q3.onrender.com/api/auth/me`,{
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          }},); 
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
      const res = await axios.post(`https://backend-service-m0q3.onrender.com/api/auth/login`,{ email, password },{
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        }});
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
      
      const res = await axios.post(`https://backend-service-m0q3.onrender.com/api/auth/register`,userData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        }});
      setAuth({ user: res.data.user, loading: false });
    } catch (err) {
      console.error('Registration error:', err);
      throw new Error(err.response?.data?.message || 'Registration failed');
    }
  };

  const logout = async () => {
    try {
      await axios.get(`https://backend-service-m0q3.onrender.com/api/auth/logout`,  {
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
      const res = await axios.post(`https://backend-service-m0q3.onrender.com/api/projects/`, projectData,{withCredentials:true});
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
