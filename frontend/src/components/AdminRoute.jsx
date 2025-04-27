import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const AdminRoute = ({ children }) => {
  const { isAuth, isAdmin, loading } = useUser();

  if (loading) return <div>Loading...</div>;

  if (!isAuth) return <Navigate to="/login" />;
  if (!isAdmin) return <Navigate to="/unauthorized" />; // if user not admin

  return children;
};

export default AdminRoute;
