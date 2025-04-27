import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const PrivateRoute = ({ children }) => {
  const { isAuth, loading } = useUser();

  if (loading) return <div>Loading...</div>; // or custom spinner

  return isAuth ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
