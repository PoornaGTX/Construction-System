import { useLayoutEffect } from "react";
import { FlatList } from "react-native";

import { grades } from "../dummyData/data";
import GradeGirdTitle from "../components/GradeGirdTitle";
import IconButton from "../components/icons/IconButton";

const GradesScreen = ({ navigation }) => {
  const renderGradesItem = (itemData) => {
    const pressHandler = () => {
      navigation.navigate("Subjects", { singlegardeID: itemData.item.id });
    };

    return (
      <GradeGirdTitle
        grade={itemData.item.Grade}
        color={itemData.item.color}
        onPressProp={pressHandler}
      />
    );
  };

  const headerButtonHandler = () => {
    navigation.navigate("ManageGrade");
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton
            icon="add"
            color="black"
            size={24}
            onPressProp={headerButtonHandler}
          />
        );
      },
    });
  }, []);

  return (
    <FlatList
      data={grades}
      keyExtractor={(item) => item.id}
      renderItem={renderGradesItem}
      numColumns={2}
    />
  );
};

export default GradesScreen;
