import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";

//icons
import { Ionicons } from "@expo/vector-icons";

//navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//screens
import GradesScreen from "./screens/GradesScreen";
import GradeSubjects from "./screens/GradeSubjects";
import ManageSubjectScreen from "./screens/ManageSubjectScreen";
import KnowledgelabContextProvider from "./store/KLab-context";
import ManageGradesScreen from "./screens/ManageGradesScreen";
import StatsScreenAdmin from "./screens/StatsScreenAdmin";

const Stack = createNativeStackNavigator();
const Bottom = createBottomTabNavigator();

//use by admin
const AdminBottomTabHome = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#3db1ff" },
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen
        name="All Grades"
        component={GradesScreen}
        options={{
          contentStyle: { backgroundColor: "white" },
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="Subjects"
        component={GradeSubjects}
        options={{
          contentStyle: { backgroundColor: "white" },
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="ManageSubjects"
        component={ManageSubjectScreen}
        options={{
          presentation: "modal",
          title: "Manage Subject",
          headerTitleAlign: "center",
        }}
      />

      <Stack.Screen
        name="ManageGrade"
        component={ManageGradesScreen}
        options={{ presentation: "modal", title: "Manage Grades" }}
      />
    </Stack.Navigator>
  );
};

{
  /* <Stack.Navigator
            screenOptions={{ headerStyle: { backgroundColor: "white" } }}
          >
            <Stack.Screen
              name="All Grades"
              component={GradesScreen}
              options={{ contentStyle: { backgroundColor: "white" } }}
            />
            <Stack.Screen
              name="Subjects"
              component={GradeSubjects}
              options={{ contentStyle: { backgroundColor: "white" } }}
            />
            <Stack.Screen
              name="ManageSubjects"
              component={ManageSubjectScreen}
              options={{ presentation: "modal", title: "Manage Subject" }}
            />

            <Stack.Screen
              name="ManageGrade"
              component={ManageGradesScreen}
              options={{ presentation: "modal", title: "Manage Grades" }}
            />

            <Stack.Screen name="AdminStatslk" component={adminBottomTab} />
          </Stack.Navigator> */
}

export default function App() {
  const user = "Admin"; //temp

  return (
    <>
      <StatusBar style="light" />
      <KnowledgelabContextProvider>
        <NavigationContainer>
          <Bottom.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: "#3db1ff" },
              tabBarStyle: { backgroundColor: "#3db1ff" },
              tabBarActiveTintColor: "red",
            }}
          >
            <Bottom.Screen
              name="AdminHome"
              component={AdminBottomTabHome}
              options={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="home" size={size} color="black" />
                ),
              }}
            />

            {user === "Admin" && (
              <Bottom.Screen
                name="Stats"
                component={StatsScreenAdmin}
                options={{
                  tabBarShowLabel: false,
                  tabBarIcon: ({ color, size }) => (
                    <Ionicons name="stats-chart" size={size} color="black" />
                  ),
                  headerTitleAlign: "center",
                }}
              />
            )}
          </Bottom.Navigator>
        </NavigationContainer>
      </KnowledgelabContextProvider>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
