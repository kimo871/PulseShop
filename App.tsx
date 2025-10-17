import "./global.css";
import { useAppLock } from "./src/core/hooks/useAppLock";
import RootNavigator from "./src/navigation/Navigator";
import AppProviders from "./src/proivders/AppProviders";

export default function App() {
  return (
    <AppProviders>
      <RootNavigator />
    </AppProviders>
  );
}
