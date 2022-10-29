import { useLayoutEffect, useContext, useState } from "react";
import { View, StyleSheet } from "react-native";

//components
import IconButton from "../components/icons/IconButton";
import { KnowledgelabContext } from "../store/KLab-context";
import AdminForm from "../components/Form/AdminForm";

const ProjectScreen = ({ route, navigation }) => {
  return (
    <View style={styles.container}>
      <AdminForm
        labelName1="Project Name"
        labelName2="Project Location"
        labelName3="Project EstimatedCost"
        labelName4="Project Manager"
        labelName5="Project DeadLine"
      />
    </View>
  );
};

export default ProjectScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#200364",
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: "#a281f0",
    alignItems: "center",
  },
});
