import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";

//icons
import { Ionicons } from "@expo/vector-icons";

//navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//screens
import LoginScreen from "./screens/LoginScreen";
import ProductScreen from "./screens/ProductScreen";
import SuppliersScreen from "./screens/SuppliersScreen";
import ManageSubjectScreen from "./screens/ManageSubjectScreen";
import ManageGradesScreen from "./screens/ManageGradesScreen";
import StatsScreenAdmin from "./screens/StatsScreenAdmin";
import projectScreen from "./screens/ProjectScreen";

import { AppProvider } from "./context/appContext";
import { useAppContext } from "./context/appContext";
import { Colors } from "./constants/styles";

const Stack = createNativeStackNavigator();
const Bottom = createBottomTabNavigator();

//for unathunticated users
const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      {/* <Stack.Screen name="Signup" component={SignupScreen} /> */}
    </Stack.Navigator>
  );
};

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
        name="Products"
        component={ProductScreen}
        options={{
          contentStyle: { backgroundColor: "white" },
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="Suppliers"
        component={SuppliersScreen}
        options={{
          contentStyle: { backgroundColor: "#d7dbdb" },
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

function AuthenticatedStack() {
  return (
    <Bottom.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#3db1ff" },
        tabBarStyle: { backgroundColor: "#3db1ff" },
        tabBarActiveTintColor: "red",
      }}
    >
      <Bottom.Screen
        name="project"
        component={projectScreen}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color="black" />
          ),
        }}
      />

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
      <Bottom.Screen
        name="Stats"
        component={StatsScreenAdmin}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart" size={size} color="black" />
          ),
          headerTitleAlign: "center",
        }}
      />
    </Bottom.Navigator>
  );
}

function Navigation() {
  const { isLogedIn } = useAppContext();

  return (
    <NavigationContainer>
      {!isLogedIn ? <AuthStack /> : <AuthenticatedStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AppProvider>
        <Navigation />
      </AppProvider>
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
