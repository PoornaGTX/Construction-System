import { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from "react-native";
import OrderGirdTitle from "../components/OrderGirdTitle";
import { useAppContext } from "../context/appContext";
import { useIsFocused } from "@react-navigation/core";
import Button from "../components/icons/Button";
import { images } from "../components/ui/ProductImages/Product";
import { LinearGradient } from "expo-linear-gradient";

const OrderScreen = ({ route }) => {
  const { getOrderSummery, order } = useAppContext();

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getOrderSummery();
    }
  }, [isFocused]);

  return (
    <LinearGradient colors={["black", "black"]} style={styles.liner}>
      <ImageBackground
        style={[styles.container, styles.image]}
        source={images.Project}
        resizeMode="cover"
        imageStyle={styles.backImage}
      >
        <ScrollView>
          <View style={styles.total}>
            <View style={styles.totalFlex}>
              <Text style={styles.title}>Site Order Summery</Text>
            </View>
          </View>

          {order.map((item) => {
            return <OrderGirdTitle key={item._id} {...item} />;
          })}
        </ScrollView>
      </ImageBackground>
    </LinearGradient>
  );
};
export default OrderScreen;

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    alignItems: "center",
    // backgroundColor: "white",
    flex: 1,
  },
  total: {
    marginHorizontal: 10,
    marginVertical: 20,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  totalFlex: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  cartTotal: {
    marginLeft: 60,
  },
  title: {
    fontSize: 23,
    color: "white",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  approvel: {
    alignItems: "center",
    marginVertical: 10,
  },
  approvelTitle: {
    color: "red",
    fontWeight: "bold",
    marginBottom: 10,
  },
  image: {
    flex: 1,
  },
  liner: {
    flex: 1,
  },
  backImage: {
    opacity: 0.6,
  },
});
