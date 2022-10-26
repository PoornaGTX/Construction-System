import { useLayoutEffect, useContext } from "react";
import { View, StyleSheet } from "react-native";

import IconButton from "../components/icons/IconButton";
import Button from "../components/icons/Button";
import { KnowledgelabContext } from "../store/KLab-context";

const ManageGradesScreen = ({ route, navigation }) => {
  const GradeID = route.params?.GradeNumberID;

  const SubjectCtx = useContext(KnowledgelabContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add Subject",
    });
  }, [navigation]);

  const deleteSubject = () => {
    SubjectCtx.deleteSubject(subjectID);
    navigation.goBack();
  };

  const cancleHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = () => {
    SubjectCtx.addSubject();
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Button mode="flat" onPressProp={cancleHandler} style={styles.button}>
          Cancle
        </Button>
        <Button onPressProp={confirmHandler} style={styles.button}>
          Add Grade
        </Button>
      </View>
    </View>
  );
};

export default ManageGradesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#200364",
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
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: "#a281f0",
    alignItems: "center",
  },
});
