import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../lib/client";
import { ReactElement } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { persistor, store } from "../store";
import { useAppLock } from "../core/hooks/useAppLock";
import { GlobalActivityBoundary } from "./GlobalBoundaryActivity";

export default function AppProviders({
  children,
}: {
  children: ReactElement | ReactElement[];
}) {
  return (
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <StatusBar barStyle="dark-content" />
              {children}
            </PersistGate>
          </Provider>
        </QueryClientProvider>
      </SafeAreaProvider>
  );
}
