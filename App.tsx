import "./global.css";
import RootNavigator from "./src/navigation/Navigator";
import AppProviders from "./src/proivders/AppProviders";

export default function App() {
  return (
    <AppProviders>
      <RootNavigator />
    </AppProviders>
  );
}
