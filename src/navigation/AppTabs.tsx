// AppTabs.tsx
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faHome,
  faGrip,
  faRightFromBracket,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";

import HomeScreen from "../screens/app/Home";
import CategoriesScreen from "../screens/app/Categories";
import { Alert, View } from "react-native";
import { useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";
import { useAppLock } from "../core/hooks/useAppLock";
import { GlobalActivityBoundary } from "../proivders/GlobalBoundaryActivity";

const Tab = createBottomTabNavigator();

// just a placeholder component for the Logout tab
function Empty() {
  return <View />;
}

export default function AppTabs() {
  const dispatch = useDispatch();
  const { resetLockTimer } = useAppLock({
    inactivityMs: 10_000,
    autoPromptOnLock: false,
  });
  return (
    <GlobalActivityBoundary resetLockTimer={resetLockTimer}>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarHideOnKeyboard: true,
            tabBarActiveTintColor: "#4D7380",
            tabBarInactiveTintColor: "#8E8E93",
            tabBarIcon: ({ focused, size, color }) => {
              const icon =
                route.name === "Home"
                  ? faHome
                  : route.name === "Favorites"
                    ? faHeart
                    : faGrip;
              return <FontAwesomeIcon color={color} icon={icon} size={20} />;
            },
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Categories" component={CategoriesScreen} />
          {/* Logout tab (disable immediate navigation just functionality of clearing session and reset to login) */}
          <Tab.Screen
            name="Logout"
            component={Empty} // placeholder component
            options={{
              tabBarLabel: "Logout",
              tabBarIcon: ({ color, size }) => (
                <FontAwesomeIcon
                  icon={faRightFromBracket}
                  size={18}
                  color={color}
                />
              ),
            }}
            listeners={{
              tabPress: (e) => {
                e.preventDefault();
                console.log("logout pressed");
                Alert.alert("Logout", "Are you sure you want to logout?", [
                  { text: "Cancel", style: "cancel" },
                  {
                    text: "Logout",
                    onPress: () => {
                      dispatch(logout());
                      console.log("logged out........");
                    },
                  },
                ]);
              },
            }}
          />
        </Tab.Navigator>
    </GlobalActivityBoundary>
  );
}
