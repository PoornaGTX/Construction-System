import { useAppContext } from "../context/appContext";
import { Navigate } from "react-router-dom";

const ProtectedCustomerRoute = ({ children }) => {
  const { user } = useAppContext();
  if (user.type === "Supplier") {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedCustomerRoute;
