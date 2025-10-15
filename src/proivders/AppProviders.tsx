import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../lib/client";
import { ReactElement } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "react-native";

export default function AppProviders({
  children,
}: {
  children: ReactElement | ReactElement[];
}) {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
         <StatusBar 
            barStyle="dark-content" 
          />
        {children}</QueryClientProvider>
    </SafeAreaProvider>
  );
}
