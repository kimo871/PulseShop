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

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const [isLoading, setIsLoading] = useState(true);
  const {isAuthenticated,token:token2} = useSelector((state)=>state?.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log(token2)
        // Your auth check logic here
        const token = await MmkvStorage.getItem("USER_TOKEN");
        console.log("ee", token);
        if (token) {
          const user = await authApi.getCurrentUser();
          console.log("dd", user);
          dispatch(
            loginSuccess({
              user: user,
              token,
            })
          );
        }
      } catch (error) {
            dispatch(loginFailure("Session expired or invalid"));
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
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Stack.Screen name="App" component={AppTabs} />
        ) : (
          <Stack.Screen name="Auth" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
