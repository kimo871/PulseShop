import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import CustomText from "../ui/CustomText";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function LoginForm() {
  const insets = useSafeAreaInsets(); // prevent elemnets from overlapping bottom phone controls
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Submit Login data Handler
  const handleLogin = async () => {
    try {
      setLoading(true);
      const prom = await new Promise((res, rej) => {
        setTimeout(() => {
          res("d");
        }, 1000);
      }); // just dummy logic to simulate the proccess (login functionality later)
    } catch (err) {
      console.log(err);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1">
      <ScrollView
        contentContainerStyle={{
          paddingBottom: insets.bottom + 350,
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View className="space-y-6 flex-1 py-2 px-2">
          {/* Error Message */}
          {error ? (
            <View className="p-2  bg-red-50 border border-red-200 rounded-lg flex flex-row gap-2 items-center">
              <FontAwesomeIcon color="red" icon={faTriangleExclamation} />
              <CustomText className="text-red-600 text-sm mb-1">
                {error}
              </CustomText>
            </View>
          ) : null}

          {/* Username/Email Field */}
          <View className="space-y-2">
            <CustomText className="font-inter-bold  text-neutral-500">
              Username or email
            </CustomText>
            <TextInput
              value={username}
              onChangeText={setUsername}
              placeholderTextColor="#9CA3AF"
              placeholder="Enter your username or email"
              className="border border-neutral-300 text-black bg-gray-100 p-3 rounded-lg"
            />
          </View>

          {/* Password Field */}
          <View className="space-y-2">
            <Text className="font-inter-bold text-neutral-500">Password</Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholderTextColor="#9CA3AF"
              placeholder="Enter your password"
              secureTextEntry
              className="border border-neutral-300 text-black bg-gray-100 p-3 rounded-lg"
            />
          </View>

          {/* Sign In Button */}
          <View className="mt-2">
            <TouchableOpacity
              disabled={loading}
              onPress={handleLogin}
              className={`bg-[#4D7380] ${loading && "bg-gray-400"} p-3 rounded-lg`}
            >
              <CustomText className="text-white font-inter-bold text-center text-base">
                Sign In
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
