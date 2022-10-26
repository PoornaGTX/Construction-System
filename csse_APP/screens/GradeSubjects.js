import { useLayoutEffect, useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/core";

//components
import SubjectGirdTitle from "../components/SubjectGirdTitle";
import IconButton from "../components/icons/IconButton";
import { KnowledgelabContext } from "../store/KLab-context";

//LoadingOverlay
import LoadingOverLay from "../components/LoadingOverLay/LoadingOverLay";

//http request
import { getAllSubject } from "../utill/http";

//route will resive to any registred screens
const GradeSubjects = ({ route }) => {
  const navigation = useNavigation();
  const gradeID = route.params.singlegardeID; ////this contain gradeID 'Grade 1'
  const SubjectCtx = useContext(KnowledgelabContext);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      const getAllSub = async () => {
        const allSubjects = await getAllSubject();
        SubjectCtx.setSubjects(allSubjects);
      };
      getAllSub();
    }
  }, [isFocused]);

  //loading spiriner

  // const Subjects = SubjectCtx.subjects;

  const displaySubjects = SubjectCtx.subjects.filter((singleSubject) => {
    return singleSubject.gID === gradeID;
  });

  //for header button for adding new subject
  const headerButtonHandler = () => {
    navigation.navigate("ManageSubjects", { gradeNameID: gradeID });
  };

  const renderSubjectItem = (itemData) => {
    return (
      <SubjectGirdTitle
        subjectName={itemData.item.subjectName}
        subjectcolor={itemData.item.color}
        subjectID={itemData.item._id}
        Grade={gradeID}
      />
    );
  };

  //header Button

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton
            icon="add-circle"
            color="black"
            size={24}
            onPressProp={headerButtonHandler}
          />
        );
      },
    });
  }, []);

  //get all subjects

  if (displaySubjects.length === 0) {
    return <Text style={styles.infoText}>No subjects availble</Text>;
  }

  return (
    <FlatList
      data={displaySubjects}
      keyExtractor={(item) => item._id}
      renderItem={renderSubjectItem}
      numColumns={2}
    />
  );
};

export default GradeSubjects;

const styles = StyleSheet.create({
  infoText: {
    color: "black",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
});
