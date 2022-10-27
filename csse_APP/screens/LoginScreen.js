import { useState, useContext } from "react";
import { Alert } from "react-native";
import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { useAppContext } from "../context/appContext";

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const { loginUser } = useAppContext();

  const loginHandler = async ({ email, password }) => {
    setIsAuthenticating(true);
    try {
      loginUser({ email, password });
    } catch (error) {
      Alert.alert(
        "Authntication failed!",
        "Could not log you in. Please check credentials or try again later"
      );
      setIsAuthenticating(false);
    }
  };

  if (isAuthenticating) {
    return <LoadingOverlay message="Login you in..." />;
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
