import { useState } from "react";
import { View, StyleSheet, Text, Alert } from "react-native";

import AdminInput from "./AdminInput";
import Button from "../icons/Button";
import ColorPixer from "../colorPixer/ColorPixer";

const AdminForm = ({
  labelName1,
  labelName2,
  labelName3,
  labelName4,
  labelName5,
  projectDetails,
}) => {
  // const edate = projectDetails.projectDeadLine;
  // const estimateDate = edate.slice(0, 10);

  return (
    <View style={styles.form}>
      <Text style={styles.formTitle}>Project Site Details</Text>
      <AdminInput label={labelName1} value={projectDetails.projectName} />
      <AdminInput label={labelName2} value={projectDetails.projectLocation} />
      <AdminInput
        label={labelName3}
        value={`Rs.${projectDetails.projectEstimatedCost}`}
      />
      <AdminInput label={labelName4} value={projectDetails.projectManager} />
      <AdminInput label={labelName5} value={projectDetails.projectDeadLine} />
    </View>
  );
};

export default AdminForm;

const styles = StyleSheet.create({
  form: {
    marginBottom: 20,
  },
  formTitle: {
    fontSize: 25,
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
    marginVertical: 16,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },

  colorTilte: {
    marginHorizontal: 4,
    marginVertical: 8,
    fontSize: 14,
    color: "#c6affc",
    marginBottom: 4,
    fontWeight: "bold",
  },

  colorViewContainer: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  selectColorView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  viewSelect: {
    height: 15,
    width: 15,
    marginHorizontal: 8,
    marginTop: 5,
  },
});
