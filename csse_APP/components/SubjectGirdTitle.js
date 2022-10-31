import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Button from "./icons/Button";
import { useState, useEffect } from "react";

const SubjectGirdTitle = ({
  _id,
  supplierName,
  name,
  color,
  qty,
  price,
  onPressHandler,
}) => {
  const navigation = useNavigation();

  const [aQty, setAQty] = useState(0);
  const [date, setDate] = useState(0);

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

  return (
    <View style={styles.gridItem}>
      <View style={styles.innerContainer}>
        <Text style={styles.titleHead}>{supplierName}</Text>
        <View style={styles.detailsContainer}>
          <View style={styles.image}>
            <Image
              source={{
                uri: "data:image/jpeg;base64,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",
              }}
              style={styles.ImageStyle}
            />
          </View>
          <View style={styles.test}>
            <View style={styles.mainTitle}>
              <Text style={styles.title}>Quntity :</Text>
              <Text style={styles.title}>Price(PU):</Text>
              {/* <Text style={styles.title}>Amount:</Text>
              <View style={styles.dateTille}>
                <Text style={styles.title}>Deliver Date:</Text>
              </View> */}
            </View>
            <View style={styles.subTitle}>
              <Text style={styles.title}>{qty}</Text>
              <Text style={styles.title}>Rs.{price}.00</Text>

              {/* <View style={styles.input}>
                <TextInput onChangeText={productAmountHandler} />
              </View> */}
              {/* <View>
                <TextInput style={styles.inputdate} placeholder="MM-DD-YYYY" />
              </View> */}
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
            placeholder="MM-DD-YYYY"
            keyboardType="numeric"
          />
        </View>
      </View>

      <Button
        onPressProp={() =>
          onPressHandler(_id, price, qty, supplierName, aQty, date, name)
        }
        color="#3eabab"
        fontSize={15}
      >
        Add to cart
      </Button>
    </View>
  );
};

export default SubjectGirdTitle;

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 16,
    height: 300,
    borderRadius: 8,
    elevation: 4,
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
    fontSize: 20,
    textAlign: "center",
    marginBottom: 10,
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
