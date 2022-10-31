import { useLayoutEffect, useContext, useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  Alert,
  View,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/core";

//components
import SubjectGirdTitle from "../components/SubjectGirdTitle";
import IconButton from "../components/icons/IconButton";
import { useAppContext } from "../context/appContext";

//route will resive to any registred screens
const SuppliersScreen = ({ route }) => {
  const type = route.params.typeName;
  const navigation = useNavigation();

  const { addToCart, getAllProducts, products } = useAppContext();

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
        "greather than amount avalible!",
        "Could not log you in. Please check credentials or try again later"
      );
    }

    if (+aQty <= 0) {
      return Alert.alert(
        "less tha 0",
        "Could not log you in. Please check credentials or try again later"
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
      "Could not log you in. Please check credentials or try again later"
    );
  };

  const displaySubjects = products.filter((singleProduct) => {
    return singleProduct.name === type;
  });

  useEffect(() => {
    getAllProducts();
  }, []);

  const renderSubjectItem = (itemData) => {
    return (
      <SubjectGirdTitle
        {...itemData.item}
        onPressHandler={NevigateToCartHandler}
      />
    );
  };

  //get all subjects

  if (displaySubjects.length === 0) {
    return <Text style={styles.infoText}>No Products</Text>;
  }

  return (
    <FlatList
      data={displaySubjects}
      keyExtractor={(item) => item._id}
      renderItem={renderSubjectItem}
      numColumns={1}
    />
  );
};

export default SuppliersScreen;

const styles = StyleSheet.create({
  infoText: {
    color: "black",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
});
