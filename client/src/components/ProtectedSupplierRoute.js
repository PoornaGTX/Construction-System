import { useAppContext } from "../context/appContext";
import { Navigate } from "react-router-dom";

const ProtectedSupplierRoute = ({ children }) => {
  const { user } = useAppContext();
  console.log(user.type);
  if (user.type === "Customer") {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedSupplierRoute;
