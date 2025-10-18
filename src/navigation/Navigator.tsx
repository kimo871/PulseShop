// RootNavigator.tsx (Simplified)
import React, { useEffect, useState } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppTabs from "./AppTabs";
import AuthStack from "./AuthStack";
import { MmkvStorage } from "../core/storage";
import { authApi } from "../api/auth";
import LoadingScreen from "../components/ui/LoadingScreen";
import { loginFailure, loginSuccess } from "../store/slices/authSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import useNetworkStatus from "../core/hooks/useNetworkStatus";
import OfflineBanner from "../components/ui/OfflineBanner";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { isConnected } = useNetworkStatus();
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useSelector((state) => state?.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("connected staatus:", isConnected);
    const checkAuth = async () => {
      try {
        const token = await MmkvStorage.getItem("USER_TOKEN");
        if (token) {
          const user = await authApi.getCurrentUser();
          dispatch(
            loginSuccess({
              user: user,
              token,
            })
          );
        }
      } catch (error) {
        dispatch(loginFailure(null));
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer theme={DefaultTheme}>
      <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
        <StatusBar style="light"/>
      {!isConnected && (
          <OfflineBanner />
      )}
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Stack.Screen name="App" component={AppTabs} />
        ) : (
          <Stack.Screen name="Auth" component={AuthStack} />
        )}
      </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}
