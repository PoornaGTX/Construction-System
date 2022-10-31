import { View, Text, TextInput, StyleSheet } from "react-native";

const AdminInput = ({ label, value }) => {
  return (
    <View style={styles.inputConainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput value={value} style={styles.input} editable={false} />
    </View>
  );
};

export default AdminInput;

const styles = StyleSheet.create({
  inputConainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 14,
    color: "#c6affc",
    marginBottom: 4,
  },
  input: {
    backgroundColor: "#c6affc",
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    color: "#2d0689",
  },
});
