import { useState, useContext } from "react";
import { Alert } from "react-native";
import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { useAppContext } from "../context/appContext";

function LoginScreen({ navigation }) {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const { loginUser, showAlert } = useAppContext();

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

  const alertHandler = () => {
    setIsAuthenticating(false);
    navigation.navigate("Login");
  };

  if (showAlert) {
    Alert.alert(
      "Authntication failed!",
      "Could not log you in. Please check credentials or try again later",
      [{ text: "Okay", style: "destructive", onPress: alertHandler }]
    );
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Login you in..." />;
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
