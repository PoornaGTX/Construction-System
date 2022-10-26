import { View, Text, Dimensions, StyleSheet, ScrollView } from "react-native";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

const StatsScreenAdmin = () => {
  const mydata = [
    { date: "dec", count: 2 },
    { date: "lk", count: 4 },
    { date: "lkkl", count: 3 },
    { date: "lke", count: 1 },
    { date: "lkss", count: 5 },
    { date: "lscl", count: 6 },
  ];

  const date = mydata.map((item) => {
    return item.date;
  });

  const value = mydata.map((pl) => {
    return pl.count;
  });

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.statstext}>APP STATISTICS</Text>
        <View style={styles.totalUsers}>
          <Text style={styles.totalUsersText}>Total users</Text>
          <View style={styles.userContainer}>
            <Text style={styles.userText}>Teachers : 20</Text>
            <Text style={styles.userText}>Students : 20</Text>
          </View>
        </View>

        <View style={[styles.totalUsers, styles.subjectContainer]}>
          <Text style={styles.totalUsersText}>Total subjects</Text>
          <View style={styles.userContainer}>
            <View style={styles.totalSubRow}>
              <Text style={styles.userText}>Grade 1 : 12</Text>
              <Text style={styles.userText}>Grade 2 : 12</Text>
              <Text style={styles.userText}>Grade 3 : 12</Text>
              <Text style={styles.userText}>Grade 4 : 12</Text>
              <Text style={styles.userText}>Grade 5 : 12</Text>
              <Text style={styles.userText}>Grade 6 : 12</Text>
              <Text style={styles.userText}>Grade 7 : 12</Text>
              <Text style={styles.userText}>Grade 8 : 12</Text>
              <Text style={styles.userText}>Grade 10 : 12</Text>
              <Text style={styles.userText}>Grade 11 : 12</Text>
              <Text style={styles.userText}>Grade 12 : 12</Text>
              <Text style={styles.userText}>Grade 13 : 12</Text>
            </View>
          </View>
        </View>

        <Text style={styles.headingText}>Monthly User Creation</Text>
        <View style={styles.chartContainer}>
          <LineChart
            data={{
              labels: date,
              datasets: [
                {
                  data: value,
                },
              ],
            }}
            width={390} // from react-native
            height={220}
            yAxisInterval={1} // optional, defaults to 1
            y
            chartConfig={{
              backgroundColor: "#e26a00",
              strokeWidth: 0,
              backgroundGradientFrom: "#fb8c00",
              backgroundGradientTo: "#ffa726",
              decimalPlaces: 0, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "5",
                stroke: "#ffa726",
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

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
});
