import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Axios instance with token headers
  const authAxios = axios.create();

  authAxios.interceptors.request.use((config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  const registerUser = async (formData, navigate) => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/users/register", formData);
      toast.success("Registered successfully!");
      localStorage.setItem("authToken", data.token);
      setUser(data);
      setIsAuth(true);
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async (email, password, navigate) => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/users/login", { email, password });
      toast.success("Logged in successfully!");
      localStorage.setItem("authToken", data.token);
      setUser(data);
      setIsAuth(true);
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) throw new Error("No token found");

      const { data } = await authAxios.get("/api/users/profile");
      setUser({ ...data, token });
      setIsAuth(true);
      setIsAdmin(data.isAdmin || false); // <=== NEW
    } catch (error) {
      console.error("User fetch failed:", error.message);
      setIsAuth(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = (navigate) => {
    localStorage.removeItem("authToken");
    setUser(null);
    setIsAuth(false);
    toast.success("Logged out successfully!");
    navigate("/login");
    setIsAdmin(false);

  };

  const updateUserProfile = async (updatedData) => {
    try {
      const { data } = await authAxios.put("/api/users/profile", updatedData);
      toast.success(data.message);
      setUser((prevUser) => ({ ...prevUser, ...data.user }));
    } catch (error) {
      toast.error(error.response?.data?.message || "Profile update failed");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        isAuth,
        loading,
        registerUser,
        loginUser,
        logoutUser,
        fetchUser,
        updateUserProfile,
        setUser,
        setIsAuth,
        isAdmin,  
      }}
    >
      {children}
      <Toaster />
    </UserContext.Provider>
  );
};

// export const UserProvider = () => useContext(UserContext);
export const useUser = () => useContext(UserContext);
