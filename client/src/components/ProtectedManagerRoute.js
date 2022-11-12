import { useAppContext } from "../context/appContext";
import { Navigate } from "react-router-dom";

const ProtectedManagerRoute = ({ children }) => {
  const { user } = useAppContext();
  if (user.type !== "ProcurementManager") {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedManagerRoute;
