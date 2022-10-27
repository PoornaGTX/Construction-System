import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";

const StatsScreenAdmin = ({ route }) => {
  const ProductID = route.params?.pID;
  const ProductPrice = route.params?.pPrice;
  const ProductQty = route.params?.pqty;
  const ProductSupName = route.params?.supName;

  const proData = [];
  proData.push({ ProductID, ProductPrice, ProductQty, ProductSupName });

  return (
    <View style={styles.container}>
      <View style={styles.mainBody}>
        <View>
          {proData.map((item) => {
            const { ProductID, ProductPrice, ProductQty, ProductSupName } =
              item;
            return (
              <View key={ProductID}>
                <Text>{ProductID}</Text>
                <Text>{ProductPrice}</Text>
                <Text>{ProductQty}</Text>
                <Text>{ProductSupName}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};
const height = Dimensions.get("window").height;
export default StatsScreenAdmin;

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "#200364",
    flex: 1,
  },
  statstext: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 25,
    marginTop: 10,
  },

  chartContainer: {
    marginTop: 10,
    marginBottom: 60,
  },
  headingText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 24,
    color: "white",
    marginTop: 30,
  },
  totalUsers: {
    width: 390,
    height: 100,
    backgroundColor: "#57c98c",
    marginTop: 20,
    borderRadius: 10,
  },
  totalUsersText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
    fontSize: 20,
  },

  userContainer: {
    margin: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  subjectContainer: {
    height: 260,
  },
  userText: {
    fontSize: 20,
    minWidth: 120,
    marginHorizontal: 30,
    marginVertical: 4,
  },
  totalSubRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    justifyContent: "space-between",
  },

  mainBody: {
    margin: 60,
  },
});
