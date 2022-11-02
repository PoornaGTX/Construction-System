import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  Image,
} from "react-native";
import Button from "./icons/Button";
import { useState } from "react";
import { selectImage } from "./ui/ProductImages/Product";

const SupplierGirdTitle = ({
  _id,
  supplierName,
  name,
  type,
  qty,
  price,
  onPressHandler,
}) => {
  const [aQty, setAQty] = useState(0);
  const [date, setDate] = useState("");

  const productAmountHandler = (enteredAmount) => {
    setAQty(+enteredAmount);
  };

  const datehandler = (enteredAmount) => {
    setDate(enteredAmount);
  };

  const handler = () => {
    setAQty(10);
    setDate(0);
  };

  const img = selectImage(type);

  return (
    <View style={styles.gridItem}>
      <View style={styles.innerContainer}>
        <Text style={styles.titleHead}>{supplierName}</Text>
        <View style={styles.detailsContainer}>
          <View style={styles.image}>
            <Image source={img} style={styles.ImageStyle} />
          </View>
          <View style={styles.test}>
            <View style={styles.mainTitle}>
              <Text style={styles.title}>Quntity :</Text>
              <Text style={styles.title}>Price(PU):</Text>
            </View>
            <View style={styles.subTitle}>
              <Text style={styles.title}>{qty}</Text>
              <Text style={styles.title}>Rs.{price}.00</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.testText}>
        <View style={styles.amountContainer}>
          <Text style={styles.amountText}>Amount</Text>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Date</Text>
        </View>

        <View style={styles.amountInput}>
          <TextInput
            style={styles.inputAmount}
            onChangeText={productAmountHandler}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.inputdate}
            value={date}
            onChangeText={datehandler}
            placeholder="YYYY-MM-DD"
            keyboardType="numeric"
          />
        </View>
      </View>

      <Button
        onPressProp={() =>
          onPressHandler(_id, price, qty, supplierName, aQty, date, name)
        }
        color="black"
        fontSize={18}
      >
        Add to cart
      </Button>
    </View>
  );
};

export default SupplierGirdTitle;

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 16,
    height: 300,
    borderRadius: 8,
    elevation: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    backgroundColor: "white",
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  gridItemupdate: {
    height: 200,
  },
  button: {
    flex: 1,
  },
  buttonPressed: {
    opacity: 0.5,
  },
  innerContainer: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 0,
    marginTop: 10,
  },
  innerContainerUpdateAdmin: {
    borderRadius: 0,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
  image: {
    width: 120,
    height: 120,
  },
  detailsContainer: {
    flexDirection: "row",
  },
  mainTitle: {
    marginLeft: 10,
  },
  subTitle: {
    marginHorizontal: 6,
  },
  titleHead: {
    fontWeight: "bold",
    fontSize: 22,
    textAlign: "center",
    marginBottom: 10,
    textDecorationLine: "underline",
    color: "black",
  },
  test: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    marginBottom: 20,
  },
  ImageStyle: {
    width: 120,
    height: 120,
  },
  input: {
    backgroundColor: "#d8ebeb",
  },

  inputdate: {
    backgroundColor: "#d8ebeb",
    marginTop: 10,
    fontSize: 18,
  },

  inputAmount: {
    backgroundColor: "#d8ebeb",
    marginTop: 10,
    fontSize: 18,
  },

  dateTille: {
    marginTop: 10,
  },

  testText: {
    alignContent: "center",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: 50,
    marginVertical: 10,
  },
  tesView: {
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },
  amountContainer: {
    marginLeft: 40,
  },
  amountText: {
    marginVertical: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  amountInput: {
    marginRight: 40,
    justifyContent: "center",
  },
});

{
  /* <View style={styles.input}>
<TextInput onChangeText={productAmountHandler} />
</View>
<View>
<TextInput style={styles.inputdate} placeholder="MM-DD-YYYY" />
</View>


<Text style={styles.title}>Amount:</Text>
<View style={styles.dateTille}>
  <Text style={styles.title}>Deliver Date:</Text>
</View> */
}
