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
import ProjectScreen from "./screens/ProjectScreen";
import StatsScreenAdmin from "./screens/StatsScreenAdmin";
import OrderScreen from "./screens/OrderScreen";

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
        headerStyle: { backgroundColor: Colors.primaryWhite },
        headerTintColor: Colors.primaryBlack,
        contentStyle: { backgroundColor: Colors.primaryWhite},
        headerShown: false,
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
        headerStyle: { backgroundColor: Colors.primaryBlack },
        headerTitleAlign: "center",
        contentStyle: { backgroundColor: Colors.primaryBlack },
      }}
    >
      <Stack.Screen
        name="Products"
        component={ProductScreen}
        options={{
          // contentStyle: { backgroundColor: "white" },
          headerTitleAlign: "center",
          headerTintColor: Colors.primaryWhite,
        }}
      />
      <Stack.Screen
        name="Suppliers"
        component={SuppliersScreen}
        options={{
          // contentStyle: { backgroundColor: "#d7dbdb" },
          headerTitleAlign: "center",
          headerTintColor: Colors.primaryWhite,
        }}
      />

      <Stack.Screen name="Login" component={LoginScreen} />

    </Stack.Navigator>
  );
};

function AuthenticatedStack() {
  return (
    <Bottom.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primaryBlack },
        tabBarStyle: { backgroundColor: Colors.primaryBlack },
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
            <Ionicons name="home" size={size} color={Colors.primaryWhite} />
          ),
        }}
      />

      <Bottom.Screen
        name="Project"
        component={ProjectScreen}
        options={{
          headerShown: true,
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="construct" size={size} color={Colors.primaryWhite} />
          ),
          headerTitleAlign: "center",
          headerTintColor: Colors.primaryBlack,
        }}
      />

      <Bottom.Screen
        name="Stats"
        component={StatsScreenAdmin}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart" size={size} color={Colors.primaryWhite} />
          ),
          headerTitleAlign: "center",
          headerTitle: "Site Cart",
          headerTintColor: Colors.primaryWhite,
        }}
      />

      <Bottom.Screen
        name="Order"
        component={OrderScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="clipboard" size={size} color={Colors.primaryWhite} />
          ),
          headerTitleAlign: "center",
          headerTintColor: Colors.primaryWhite,
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
