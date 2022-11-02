import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  Image,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Button from "./icons/Button";
import { useState } from "react";
import { Colors } from "../constants/styles";

const CartGridTitle = ({
  _id,
  type,
  price,
  pid,
  total,
  userQty,
  deleteButtonHandler,
}) => {
  // const user = "Admn"; //tempory
  const navigation = useNavigation();

  const [aQty, setAQty] = useState(0);

  const productAmountHandler = (enteredAmount) => {
    setAQty(+enteredAmount);
  };

  return (
    <View style={styles.gridItem}>
      <View style={styles.innertContainer}>
        <View>
          <Text style={styles.title}>Product Name</Text>
          <Text style={styles.title}>Price</Text>
          <Text style={styles.title}>Order Amount</Text>
          <Text style={styles.title}>Total</Text>
        </View>

        <View style={styles.innertSubContainer}>
          <Text style={styles.title}>{type}</Text>
          <Text style={styles.title}>Rs.{price}.00</Text>
          <Text style={styles.title}>{userQty}</Text>
          <Text style={styles.title}>Rs.{total}.00</Text>
        </View>
      </View>
      <View style={styles.button}>
        <Button
          style={styles.button}
          color="#e32929"
          onPressProp={() => deleteButtonHandler(_id)}
        >
          Delete Item
        </Button>
      </View>
    </View>
  );
};

export default CartGridTitle;

const styles = StyleSheet.create({
  gridItem: {
    margin: 10,
    width: 380,
    borderRadius: 8,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
    backgroundColor: Colors.primaryWhite,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    elevation: 10,
    shadowColor: Colors.primaryBlack,
    shadowOffset: { width: 0, height: 2 },
    opacity: 0.9,
  },
  innertContainer: {
    flexDirection: "row",
    marginTop: 20,
  },

  innertSubContainer: {
    marginLeft: 20,
  },
  button: {
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
  },
  button: {
    marginTop: 5,
    marginBottom: 12,
  },
});
