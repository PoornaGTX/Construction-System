import { View, Pressable, Text, StyleSheet } from "react-native";

const Button = ({ children, onPressProp, mode, style, color, fontSize,height }) => {
  return (
    <View style={style}>
      <Pressable
        onPress={onPressProp}
        style={({ pressed }) => pressed && styles.preased}
      >
        <View
          style={[
            styles.button,
            mode === "flat" && styles.flat,
            { backgroundColor: color,height:height },
          ]}
        >
          <Text
            style={[
              styles.buttonText,
              mode === "flat" && styles.flatText,
              { fontSize: fontSize },
            ]}
          >
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    padding: 8,
    backgroundColor: "#9b095c",

  },
  flat: {
    backgroundColor: "transparent",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  flatText: {
    color: "#a281f0",
  },
  preased: {
    opacity: 0.75,
    backgroundColor: "black",
    borderRadius: 4,
  },
});
