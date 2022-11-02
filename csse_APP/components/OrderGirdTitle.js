import { View, Text, StyleSheet, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../constants/styles";

const OrderGirdTitle = ({ _id, cartproducts, total, status }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.gridItem}>
      <View style={styles.innertContainer}>
        <View>
          <Text style={styles.textStyle}>Order Total</Text>
          <Text style={styles.textStyle}>Order Status</Text>
        </View>

        <View style={styles.innertSubContainer}>
          <Text style={styles.textStyle}>Rs.{total}.00</Text>
          <Text
            style={[
              styles.textStyleStatus,
              (status === "pending" || status === "declined") && {
                color: "red",
              },
            ]}
          >
            {status}
          </Text>
        </View>
      </View>
      <Text style={styles.textStyleUp}>Order Details</Text>
      {cartproducts.map((item) => {
        const { type, userQty, supName, _id } = item;
        return (
          <View style={styles.border} key={_id}>
            <View style={styles.innertContainerUpdate}>
              <View>
                <Text style={styles.textStyle}>Product</Text>
                <Text style={styles.textStyle}>Quantity</Text>
                <Text style={styles.textStyle}>Supplier</Text>
              </View>
              <View style={styles.innertSubContainer}>
                <Text style={styles.textStyle}>{type}</Text>
                <Text style={styles.textStyle}>{userQty}</Text>
                <Text style={styles.textStyle}>{supName}</Text>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default OrderGirdTitle;

const styles = StyleSheet.create({
  gridItem: {
    margin: 10,
    width: 380,
    borderRadius: 8,
    backgroundColor: Colors.primaryWhite,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
    backgroundColor: Colors.primaryWhite,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    elevation: 10,
    shadowColor: Colors.primaryBlack,
    shadowOffset: { width: 2, height: 2 },
    opacity: 0.9,
  },
  innertContainer: {
    flexDirection: "row",
    paddingVertical: 15,
  },

  innertSubContainer: {
    marginLeft: 20,
  },
  button: {
    marginVertical: 10,
  },
  innertContainerUpdate: {
    flexDirection: "row",
    marginTop: 10,
    padding: 5,
    marginBottom: 10,
  },
  textStyle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  textStyleUp: {
    fontSize: 20,
    marginTop: 5,
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
  border: {
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.primaryBlack,
    marginVertical: 10,
  },
  textStyleStatus: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#006dfc",
  },
});
