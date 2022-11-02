import { View, Text, Pressable, StyleSheet, Platform } from "react-native";
import { Colors } from "../constants/styles";

const ProductGirdTitle = ({ name, color, onPressProp }) => {
  return (
    <View style={styles.gridItem}>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed ? styles.buttonPressed : null, //this for ios
        ]}
        android_ripple={{ color: "#ccc" }}
        onPress={onPressProp}
      >
        <View style={[styles.innerContainer, { backgroundColor: color }]}>
          <Text style={styles.title}>{name}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default ProductGirdTitle;

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 16,
    height: 150,
    borderRadius: 8,
    elevation: 10,
    shadowColor: Colors.primaryBlack,
    shadowOffset: { width: 0, height: 2 },
    backgroundColor: "white",
    overflow: Platform.OS === "android" ? "hidden" : "visible",
    opacity: 0.8,
  },
  gridItemupdate: {
    height: 200,
  },
  button: {
    flex: 1,
  },
  buttonPressed: {
    opacity: 0.5,
  },
  innerContainer: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 22,
    color: Colors.primaryBlack,
  },
  imageStyle: {
    flex: 1,
  },
  liner: {
    flex: 1,
  },
  backImage: {
    opacity: 0.6,
  },
});
