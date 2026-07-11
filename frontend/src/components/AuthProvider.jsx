import {
  useState,
  useEffect,
  createContext,
  useLayoutEffect,
  useContext,
} from "react";
import axiosClient from "../api/axiosClient";
import useRefreshToken from "../hooks/useRefreshToken";

const AuthContext = createContext(undefined);
const refresh = useRefreshToken();

export const useAuth = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return authContext;
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Simulate fetching user data from an API or local storage
    const fetchUser = async () => {
      try {
        var hasToken = localStorage.getItem("token");
        if (!hasToken) {
          const response = await axiosClient.get("/token/");
          hasToken = response.data;
        }
        setToken(hasToken);
      } catch (error) {
        setToken(null);
        console.error("Error fetching token:", error);
      }
    };
    fetchUser();
  }, []);
  // use Layout effect blocks further rendering of the component until the effect is run. This is useful for synchronously updating the token before any child components are rendered.
  useLayoutEffect(() => {
    const authInterceptor = axiosClient.interceptors.request.use((config) => {
      if (!config) {
        config = {};
      }
      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token.access}`,
        };
      }
      return config;
    });

    return () => {
      axiosClient.interceptors.request.eject(authInterceptor);
    };
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
