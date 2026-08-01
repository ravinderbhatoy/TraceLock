import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "@/api/axiosClient";
import { Spinner } from "flowbite-react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null
  });

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const logout = async () => {
    localStorage.removeItem('user')
    try {
      await axiosClient.post("/users/logout/");
    } catch (error) {
      console.error("Logout failed:", error.response.data);
    } finally {
      setUser(null);
    }
  };

  // Check if user is logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axiosClient.get("/csrf/");
        if (user) {
          const response = await axiosClient.get("/users/me/");
          localStorage.setItem('user', JSON.stringify(response.data));
          setUser(response.data)
        }
      } catch (error) {
        if (error.response?.status == 401) {
          console.log("Unauthorized user redirecting to login...");
          await logout();
          navigate("/signin");
        }
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (username, password) => {
    try {
      console.log("loging in...");
      await axiosClient.post("/token/", { username, password });
      const response = await axiosClient.get("/users/me/");
      setUser(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
      navigate("/profile");
    } catch (error) {
      console.log("Error while login.", error.response);
      throw error; // <-- re-throw so the form's catch still runs
    }
  };

  return (

    <AuthContext.Provider value={{ user, login, logout, loading, navigate }}>
      {loading ? <div className="flex justify-center items-center h-screen"><Spinner size="xl" /></div> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
