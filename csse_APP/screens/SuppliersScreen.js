import { useLayoutEffect, useContext, useEffect, useState } from "react";
import {
  FlatList,
  Text,
  Alert,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/core";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { images } from "../components/ui/ProductImages/Product";
import { LinearGradient } from "expo-linear-gradient";

//components
import SupplierGirdTitle from "../components/SupplierGirdTitle";
import { Colors } from "../constants/styles";
import { useAppContext } from "../context/appContext";

//route will resive to any registred screens
const SuppliersScreen = ({ route }) => {
  const type = route.params.typeName;
  const navigation = useNavigation();

  const {
    addToCart,
    getAllProducts,
    products,
    getOrderSummery,
    order,
    isLoading,
  } = useAppContext();

  const NevigateToCartHandler = (
    _id,
    price,
    qty,
    supplierName,
    aQty,
    date,
    name
  ) => {
    const supName = supplierName;
    const pid = _id;
    const total = +price * +aQty;

    if (+qty < +aQty) {
      return Alert.alert(
        "Quantity Error",
        "Enterd quantity greater than available quantity"
      );
    }

    //check amount contain Strings
    if (isNaN(aQty)) {
      return Alert.alert("Invalid Quantity", "Please provide a valid quantity");
    }

    //check date empty
    if (date === "") {
      return Alert.alert(
        "Please Enter A Date",
        "You submited an order with empty date",
      );
    }

    //check date format
    const newDate = new Date(date);
    const today = new Date();
    if (newDate.toString() === "Invalid Date" || today > newDate) {
      return Alert.alert("Date error", "Please provide valid date");
    }

    if (today > newDate) {
      return Alert.alert("Invalid Date", "Sorry you cannot enter a past date");
    }

    //check amount
    if (+aQty <= 0) {
      return Alert.alert(
        "Quantity Error",
        "Enterd quantity less than or equal to 0"
      );
    }

    addToCart({
      supName,
      price: Number(price),
      qty,
      pid,
      total,
      userQty: Number(aQty),
      date,
      name,
    });

    return Alert.alert(
      "Add to cart success",
      "You can view your cart details from the cart tab"
    );
  };

  const displaySubjects = products.filter((singleProduct) => {
    return singleProduct.name === type;
  });

  useEffect(() => {
    getAllProducts();
    getOrderSummery();
  }, []);

  if (isLoading) {
    <LoadingOverlay />;
  }

  const renderSubjectItem = (itemData) => {
    return (
      <SupplierGirdTitle
        {...itemData.item}
        type={type}
        onPressHandler={NevigateToCartHandler}
      />
    );
  };

  //get all subjects

  if (displaySubjects.length === 0) {
    return <Text style={styles.infoText}>No Products</Text>;
  }

  return (
    <LinearGradient colors={["black", "black"]} style={styles.liner}>
      <ImageBackground
        style={styles.image}
        source={images.Project}
        resizeMode="cover"
      >
        <FlatList
          data={displaySubjects}
          keyExtractor={(item) => item._id}
          renderItem={renderSubjectItem}
          numColumns={1}
        />
      </ImageBackground>
    </LinearGradient>
  );
};

export default SuppliersScreen;

const styles = StyleSheet.create({
  infoText: {
    color: Colors.primaryBlack,
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
  image: {
    flex: 1,
  },
  liner: {
    flex: 1,
  },
});
