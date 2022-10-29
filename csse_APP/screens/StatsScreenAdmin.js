import { useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import CartGridTitle from "../components/CartGridTitle";
import { useAppContext } from "../context/appContext";
import { useIsFocused } from "@react-navigation/core";
import Button from "../components/icons/Button";

const StatsScreenAdmin = ({ route }) => {
  const { getCart, cart, deleteCartitem } = useAppContext();

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
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.total}>
          <View style={styles.totalFlex}>
            <View style={styles.cartTotalTtile}>
              <Text style={styles.title}>Total Cart Amount</Text>
            </View>
            <View style={styles.cartTotal}>
              <Text style={styles.title}>Rs.{totalCart}.00</Text>
            </View>
          </View>
          <View style={styles.approvel}>
            {+totalCart > 100000 && (
              <Text style={styles.approvelTitle}>You need Approvel</Text>
            )}
            {totalCart > 0 && <Button color="red">Confirm cart</Button>}
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
    </View>
  );
};
export default StatsScreenAdmin;

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "#200364",
    flex: 1,
  },
  total: {
    marginHorizontal: 10,
    marginVertical: 20,
    backgroundColor: "blue",
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
  cartTotalTtile: {},
  title: {
    fontSize: 20,
    color: "white",
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
});
