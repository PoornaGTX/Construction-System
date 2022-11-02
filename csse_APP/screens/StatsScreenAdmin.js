import { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  ImageBackground,
  Dimensions,
} from "react-native";
import CartGridTitle from "../components/CartGridTitle";
import { useAppContext } from "../context/appContext";
import { useIsFocused } from "@react-navigation/core";
import Button from "../components/icons/Button";
import { images } from "../components/ui/ProductImages/Product";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../constants/styles";

const StatsScreenAdmin = ({ route }) => {
  const { getCart, cart, deleteCartitem, addToOrder } = useAppContext();

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getCart();
    }
  }, [isFocused]);

  let totalCart = 0;
  cart.map((item) => {
    const { total } = item;
    totalCart = totalCart + total;
  });

  const cartDeleteButtonHandler = (pid) => {
    const cartItemID = pid;
    deleteCartitem(cartItemID);
    return Alert.alert("Successfull", "item deleted successfully");
  };

  const cartConfirmHamdler = () => {
    addToOrder(cart, totalCart);
  };

  return (
    <LinearGradient colors={["black", "black"]} style={styles.liner}>
      <ImageBackground
        style={[styles.container, styles.image]}
        source={images.siteCart}
        resizeMode="cover"
        imageStyle={styles.backImage}
      >
        <ScrollView>
          <View style={styles.total}>
            <View style={styles.totalFlex}>
              <View>
                {totalCart === 0 ? (
                  <Text style={styles.titleTotal}>No cart available</Text>
                ) : (
                  <Text style={styles.titleTotal}>Total Cart Amount</Text>
                )}
              </View>
              <View style={styles.cartTotal}>
                <Text style={styles.titleTotal}>Rs.{totalCart}.00</Text>
              </View>
            </View>
            <View style={styles.approvel}>
              {+totalCart > 100000 && (
                <Text style={styles.approvelTitle}>You need Approvel</Text>
              )}
              {totalCart > 0 && (
                <Button color="#e32929" onPressProp={cartConfirmHamdler}>
                  Confirm cart
                </Button>
              )}
            </View>
          </View>

          {cart.map((item) => {
            return (
              <CartGridTitle
                key={item._id}
                {...item}
                totalCart={totalCart}
                deleteButtonHandler={cartDeleteButtonHandler}
              />
            );
          })}
        </ScrollView>
      </ImageBackground>
    </LinearGradient>
  );
};
export default StatsScreenAdmin;

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    alignItems: "center",
    flex: 1,
  },
  total: {
    marginHorizontal: 10,
    marginVertical: 20,
    backgroundColor: Colors.primaryBlack,
    borderRadius: 8,
    paddingHorizontal: 10,
    opacity: 0.9,
  },
  totalFlex: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  cartTotal: {
    marginLeft: 20,
  },
  title: {
    fontSize: 20,
    color: Colors.primaryWhite,
  },
  approvel: {
    alignItems: "center",
    marginVertical: 10,
  },
  approvelTitle: {
    color: "red",
    fontWeight: "bold",
    marginBottom: 10,
    fontSize: 18,
  },
  titleTotal: {
    fontSize: 22,
    color: Colors.primaryWhite,
    fontWeight: "bold",
  },
  image: {
    flex: 1,
    position: "absolute",
    left: 0,
    top: 0,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  liner: {
    flex: 1,
  },
  backImage: {
    opacity: 0.8,
  },
});
