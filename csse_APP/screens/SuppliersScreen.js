import { useLayoutEffect, useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/core";

//components
import SubjectGirdTitle from "../components/SubjectGirdTitle";
import { Prodcuts } from "../dummyData/data";
import IconButton from "../components/icons/IconButton";
import { KnowledgelabContext } from "../store/KLab-context";

//http request
import { getAllSubject } from "../utill/http";

//route will resive to any registred screens
const SuppliersScreen = ({ route }) => {
  const type = route.params.typeName.toLowerCase();
  const navigation = useNavigation();

  const NevigateToCartHandler = (id, price, qty, supName) => {
    navigation.navigate("Stats", {
      pID: id,
      pPrice: price,
      pqty: qty,
      supName: supName,
    });
  };

  const displaySubjects = Prodcuts.filter((singleProduct) => {
    return singleProduct.type === type;
  });

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
    return <Text style={styles.infoText}>{displaySubjects}</Text>;
  }

  return (
    <FlatList
      data={displaySubjects}
      keyExtractor={(item) => item.id}
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
