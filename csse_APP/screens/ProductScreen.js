import { useLayoutEffect } from "react";
import { FlatList } from "react-native";

import { ProductName } from "../dummyData/data";
import GradeGirdTitle from "../components/GradeGirdTitle";
import IconButton from "../components/icons/IconButton";

const ProductScreen = ({ navigation }) => {
  const renderGradesItem = (itemData) => {
    const pressHandler = () => {
      navigation.navigate("Suppliers", { typeName: itemData.item.Name });
    };

    return (
      <GradeGirdTitle
        name={itemData.item.Name}
        color={itemData.item.color}
        type={itemData.item.type}
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
      data={ProductName}
      keyExtractor={(item) => item.id}
      renderItem={renderGradesItem}
      numColumns={2}
    />
  );
};

export default ProductScreen;
