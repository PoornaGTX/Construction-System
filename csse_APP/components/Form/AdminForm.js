import { useState } from "react";
import { View, StyleSheet, Text, Alert } from "react-native";

import AdminInput from "./AdminInput";
import Button from "../icons/Button";
import ColorPixer from "../colorPixer/ColorPixer";

const AdminForm = ({
  labelName1,
  labelName2,
  Grade,
  onCancel,
  onSubmit,
  submitButtonLabel,
  defaultValuesForEdit,
  GradeValueForNewSubject,
}) => {
  const [subjectValue, setSubjectValue] = useState(
    defaultValuesForEdit ? defaultValuesForEdit.subjectName : ""
  );

  const [colorSub, setColorSub] = useState(
    defaultValuesForEdit ? defaultValuesForEdit.color : ""
  );

  //subject input handler
  const subjectChangeHandler = (enteredAmount) => {
    setSubjectValue(enteredAmount);
  };

  //subject color handler
  const subjectColorHandler = (colorselect) => {
    setColorSub(colorselect);
  };

  const sumbitHandler = () => {
    //validate subject input
    //CHECK STRING CONTAINS NUMBER FUNCTION
    function containsNumbers(str) {
      return /\d/.test(str);
    }

    const checkSubjectHasNumber = containsNumbers(subjectValue);
    const checkSubjectNotEmpty = !!subjectValue;
    const checkColorSelect = !!colorSub;

    if (checkSubjectHasNumber || !checkSubjectNotEmpty) {
      {
        checkSubjectHasNumber
          ? Alert.alert(
              "Invalid Input",
              "Subject name cannot contain numeric values"
            )
          : Alert.alert("Invalid Input", "Please enter subject name");
      }
      return;
    }

    if (!checkColorSelect) {
      Alert.alert("Invalid Input", "Please select color for subject");
      return;
    }

    onSubmit(subjectValue, GradeValueForNewSubject, colorSub);
  };

  return (
    <View style={styles.form}>
      <Text style={styles.formTitle}>Subject Manager</Text>
      <AdminInput
        label={labelName1}
        textInputAllProps={{
          value: Grade || GradeValueForNewSubject,
          editable: false,
        }}
      />
      <AdminInput
        label={labelName2}
        textInputAllProps={{
          onChangeText: subjectChangeHandler,
          value: subjectValue,
        }}
      />
      <View style={styles.selectColorView}>
        <Text style={styles.colorTilte}>Select Color for subject</Text>
        <View style={[styles.viewSelect, { backgroundColor: colorSub }]}></View>
      </View>

      <View style={styles.colorViewContainer}>
        <ColorPixer subjectColor="#f54242" onPressProp={subjectColorHandler} />
        <ColorPixer subjectColor="#f5a442" onPressProp={subjectColorHandler} />
        <ColorPixer subjectColor="#f5428d" onPressProp={subjectColorHandler} />
        <ColorPixer subjectColor="#f5d142" onPressProp={subjectColorHandler} />
        <ColorPixer subjectColor="#368dff" onPressProp={subjectColorHandler} />
        <ColorPixer subjectColor="#41d95d" onPressProp={subjectColorHandler} />
        <ColorPixer subjectColor="#f5428d" onPressProp={subjectColorHandler} />
        <ColorPixer subjectColor="#9eecff" onPressProp={subjectColorHandler} />
        <ColorPixer subjectColor="#ffc7ff" onPressProp={subjectColorHandler} />
        <ColorPixer subjectColor="#47fced" onPressProp={subjectColorHandler} />
        <ColorPixer subjectColor="#dbde3c" onPressProp={subjectColorHandler} />
        <ColorPixer subjectColor="#e386fc" onPressProp={subjectColorHandler} />
        <ColorPixer subjectColor="#ff5c95" onPressProp={subjectColorHandler} />
        <ColorPixer subjectColor="red" onPressProp={subjectColorHandler} />
      </View>

      <View style={styles.buttons}>
        <Button mode="flat" onPressProp={onCancel} style={styles.button}>
          Cancle
        </Button>
        <Button onPressProp={sumbitHandler} style={styles.button}>
          {submitButtonLabel}
        </Button>
      </View>
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
