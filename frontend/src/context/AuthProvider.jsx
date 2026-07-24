import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "@/api/axiosClient";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const logout = async () => {
    if (!user) {
      return;
    }
    try {
      const response = await axiosClient.post("/users/logout/");
      console.log(response.data)
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
        const csrfResponse = await axiosClient.get("/csrf/");
        const response = await axiosClient.get("/users/me/"); // your user info endpoint
        setUser(response.data);
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
      navigate("/profile");
    } catch (error) {
      console.log("Error while login.", error.response);
      throw error; // <-- re-throw so the form's catch still runs
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, navigate }}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
