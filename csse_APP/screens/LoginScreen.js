import { useState, useContext } from "react";
import {
  Alert,
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  ScrollView,
} from "react-native";
import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { useAppContext } from "../context/appContext";
import { LinearGradient } from "expo-linear-gradient";
import { images } from "../components/ui/ProductImages/Product";

function LoginScreen({ navigation }) {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const { loginUser, showAlert, alertType } = useAppContext();

  //event handler
  const loginHandler = async ({ email, password }) => {
    setIsAuthenticating(true);
    try {
      //db method
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

  if (showAlert && alertType === "danger") {
    Alert.alert(
      "Authntication failed!",
      "Could not log you in. Please check credentials or try again later",
      [{ text: "Okay", onPress: alertHandler }]
    );
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Login you in..." />;
  }

  return (
    <LinearGradient colors={["black", "black"]} style={styles.container}>
      <ImageBackground
        source={images.LoginImg}
        resizeMode="cover"
        style={styles.imageStyle}
        imageStyle={styles.backImage}
      >
        <View style={styles.form}>
          <AuthContent isLogin onAuthenticate={loginHandler} />
        </View>
      </ImageBackground>
    </LinearGradient>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",
    flex: 1,
  },
  imageStyle: {
    flex: 1,
    position: "absolute",
    left: 0,
    top: 0,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  form: {
    marginTop: 120,
  },
  backImage: {
    opacity: 0.6,
  },
});
