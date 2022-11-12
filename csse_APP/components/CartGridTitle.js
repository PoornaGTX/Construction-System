import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Button from "./icons/Button";
import { useState } from "react";
import { Colors } from "../constants/styles";
import { useAppContext } from "../context/appContext";

const CartGridTitle = ({
  _id,
  type,
  price,
  pid,
  total,
  userQty,
  deleteButtonHandler,
  date,
  supName,
  qty,
}) => {
  // const user = "Admn"; //tempory
  const navigation = useNavigation();
  const { updateCartitem } = useAppContext();

  const [aQty, setAQty] = useState(0);
  const [editButton, setEditButton] = useState(false);
  const [dateNew, setDateNew] = useState(date.slice(0, 10));
  const [userQtynew, setUserQtyNew] = useState(userQty);
  const [totalnew, setTotalNew] = useState(total);

  const productAmountHandler = (enteredAmount) => {
    setAQty(+enteredAmount);
  };

  //edit button handler
  const editButtonHandler = () => {
    setEditButton(!editButton);
  };

  const newInputHnadlerQty = (enteredValue) => {
    setUserQtyNew(enteredValue);
  };

  const newInputHnadlerDate = (enteredValue) => {
    setDateNew(enteredValue);
  };

  const updateHandler = () => {
    //check date empty
    if (dateNew === "") {
      return Alert.alert(
        "Please Enter A Date",
        "You submited an order with empty date"
      );
    }

    //check date format
    const newDate = new Date(dateNew);
    const today = new Date();
    if (newDate.toString() === "Invalid Date" || today > newDate) {
      return Alert.alert("Date error", "Please provide valid date");
    }

    if (today > newDate) {
      return Alert.alert("Invalid Date", "Sorry you cannot enter a past date");
    }

    if (+qty < +userQtynew) {
      return Alert.alert(
        "Quantity Error",
        "Enterd quantity greater than available quantity"
      );
    }

    //check amount contain Strings
    if (isNaN(userQtynew)) {
      return Alert.alert("Invalid Quantity", "Please provide a valid quantity");
    }

    //check amount
    if (+userQtynew <= 0) {
      return Alert.alert(
        "Quantity Error",
        "Enterd quantity less than or equal to 0"
      );
    }

    //if only user changed the value then only update the total
    if (userQtynew !== userQty || dateNew !== date.slice(0, 10)) {
      if (userQty > userQtynew) {
        const newUpdateTotal = +price * +userQtynew;
        setTotalNew(newUpdateTotal);
      } else {
        const newUpdateTotal = +price * +userQtynew;
        setTotalNew(newUpdateTotal);
      }

      //db
      updateCartitem(_id, {
        supName,
        price,
        qty,
        total: +price * +userQtynew,
        userQty: userQtynew,
        date: dateNew,
      });
    }

    setEditButton(!editButton);
  };

  return (
    <View style={styles.gridItem}>
      <View style={styles.innertContainer}>
        <View>
          <Text style={styles.title}>Product Name</Text>
          <Text style={styles.title}>Price</Text>
          <Text style={styles.title}>Order Amount</Text>
          <Text style={styles.title}>Total</Text>
          <Text style={[styles.title, { marginTop: 2 }]}>Date</Text>
        </View>

        <View style={styles.innertSubContainer}>
          <Text style={styles.title}>{type}</Text>
          <Text style={styles.title}>Rs.{price}.00</Text>
          <TextInput
            style={[
              styles.title,
              editButton
                ? { color: "red", backgroundColor: "#d8ebeb" }
                : { color: "black" },
            ]}
            value={userQtynew.toString()}
            keyboardType="numeric"
            editable={editButton}
            onChangeText={newInputHnadlerQty}
          />
          <TextInput
            style={[styles.title, { color: "black" }]}
            value={`Rs.${totalnew}.00`}
            editable={false}
          />
          <TextInput
            style={[
              styles.title,
              editButton
                ? { color: "red", backgroundColor: "#d8ebeb" }
                : { color: "black" },
            ]}
            value={dateNew}
            editable={editButton}
            onChangeText={newInputHnadlerDate}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <View>
          <Button
            style={styles.button}
            color="#e32929"
            onPressProp={() => deleteButtonHandler(_id)}
          >
            Delete Item
          </Button>
        </View>

        <View style={styles.editButton}>
          <Button
            style={styles.button}
            color="green"
            onPressProp={editButton ? updateHandler : editButtonHandler}
          >
            {editButton ? "Update Item" : "Edit Item"}
          </Button>
        </View>
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
  buttonContainer: {
    marginVertical: 10,
    flexDirection: "row",
  },
  title: {
    fontSize: 18,
  },
  button: {
    marginTop: 5,
    marginBottom: 12,
  },
  editButton: {
    marginLeft: 10,
  },
});
