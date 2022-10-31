import { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useAppContext } from "../context/appContext";
import { useIsFocused } from "@react-navigation/core";

//components
import AdminForm from "../components/Form/AdminForm";

const ProjectScreen = () => {
  const { getAllProjectDetails, projectDetails } = useAppContext();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getAllProjectDetails();
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <AdminForm
        labelName1="Project Name"
        labelName2="Project Location"
        labelName3="Project EstimatedCost"
        labelName4="Project Manager"
        labelName5="Project DeadLine"
        projectDetails={projectDetails}
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
