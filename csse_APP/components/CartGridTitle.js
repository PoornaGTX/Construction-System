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
          <Text>Product Name</Text>
          <Text>Price</Text>
          <Text>Order Amount</Text>
          <Text>Total</Text>
        </View>

        <View style={styles.innertSubContainer}>
          <Text>{type}</Text>
          <Text>Rs.{price}.00</Text>
          <Text>{userQty}</Text>
          <Text>Rs.{total}.00</Text>
        </View>
      </View>
      <Button
        style={styles.button}
        color="red"
        onPressProp={() => deleteButtonHandler(_id)}
      >
        Delete
      </Button>
    </View>
  );
};

export default CartGridTitle;

const styles = StyleSheet.create({
  gridItem: {
    margin: 10,
    height: 140,
    width: 380,
    borderRadius: 8,
    backgroundColor: "white",
    overflow: Platform.OS === "android" ? "hidden" : "visible",
    backgroundColor: "yellow",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  innertContainer: {
    flexDirection: "row",
  },

  innertSubContainer: {
    marginLeft: 20,
  },
  button: {
    marginVertical: 10,
  },
});
