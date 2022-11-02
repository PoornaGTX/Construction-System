import { useEffect } from "react";
import { View, StyleSheet, Text, ImageBackground } from "react-native";
import { useAppContext } from "../context/appContext";
import { useIsFocused } from "@react-navigation/core";
import { images } from "../components/ui/ProductImages/Product";
import { LinearGradient } from "expo-linear-gradient";

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

  if (projectDetails.length <= 0) {
    return (
      <View>
        <Text>no projects</Text>
      </View>
    );
  }

  return (
    <LinearGradient colors={["black", "black"]} style={styles.liner}>
      <ImageBackground
        style={[styles.container, styles.imageStyle]}
        source={images.Project}
        resizeMode="cover"
        imageStyle={styles.backImage}
      >
        <AdminForm
          labelName1="Project Name"
          labelName2="Project Location"
          labelName3="Project EstimatedCost"
          labelName4="Project Manager"
          labelName5="Project DeadLine"
          projectDetails={projectDetails}
        />
      </ImageBackground>
    </LinearGradient>
  );
};

export default ProjectScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: "#a281f0",
    alignItems: "center",
  },
  imageStyle: {
    flex: 1,
  },
  liner: {
    flex: 1,
  },
  backImage: {
    opacity: 0.4,
  },
});
