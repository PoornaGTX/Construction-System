import { useLayoutEffect } from "react";
import { FlatList, ImageBackground, StyleSheet } from "react-native";

import { ProductName } from "../dummyData/data";
import ProductGirdTitle from "../components/ProductGirdTitle";
import IconButton from "../components/icons/IconButton";
import { images } from "../components/ui/ProductImages/Product";
import { LinearGradient } from "expo-linear-gradient";

const ProductScreen = ({ navigation }) => {
  const renderGradesItem = (itemData) => {
    const pressHandler = () => {
      navigation.navigate("Suppliers", { typeName: itemData.item.Name });
    };

    return (
      <ProductGirdTitle
        name={itemData.item.Name}
        color={itemData.item.color}
        type={itemData.item.type}
        onPressProp={pressHandler}
      />
    );
  };

  const headerButtonHandler = () => {
    navigation.navigate("Login");
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton
            icon="exit"
            color="white"
            size={24}
            onPressProp={headerButtonHandler}
          />
        );
      },
    });
  }, []);

  return (
    <LinearGradient colors={["black", "black"]} style={styles.liner}>
      <ImageBackground
        style={styles.image}
        source={images.Project}
        resizeMode="cover"
        imageStyle={styles.backImage}
      >
        <FlatList
          data={ProductName}
          keyExtractor={(item) => item.id}
          renderItem={renderGradesItem}
          numColumns={2}
        />
      </ImageBackground>
    </LinearGradient>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
  liner: {
    flex: 1,
  },
  backImage: {
    opacity: 0.6,
  },
});
