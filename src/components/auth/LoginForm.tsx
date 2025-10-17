import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "../../api/auth";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScrollView, TextInput, TouchableOpacity, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import CustomText from "../ui/CustomText";
import { useDispatch, useSelector } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../../store/slices/authSlice";
import { MmkvStorage } from "../../core/storage";
export default function LoginForm() {
  const insets = useSafeAreaInsets(); // prevent elemnets from overlapping bottom phone controls'
  type RootStackParamList = {
    Home: undefined;
    // add other routes here as needed
  };
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state?.auth);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const MutateLogin = useMutation({
    mutationFn: () => authApi.login({ username, password }),
    onSuccess: (data: any) => {
      console.log("================Login Success========================");
      console.log(data);
      dispatch(
        loginSuccess({
          user: {
            id: data.id,
            username: data.username,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            gender: data.gender,
            image: data.image,
          },
          token: data.token,
        }),
      );
      MmkvStorage.setItem("USER_TOKEN",data?.token)
      navigation.navigate("App");
    },
    onError: (error: Error) => {
      console.log(error);
      dispatch(loginFailure(error.message));
    },
  });

  const handleLogin = () => {
    // Basic validation
    if (!username.trim() || !password.trim()) {
      dispatch(loginFailure("Please enter both username and password"));
      return;
    }

    // Dispatch loading action
    dispatch(loginStart());
    MutateLogin.mutate();
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
            <CustomText className="font-inter-bold text-neutral-500">
              Password
            </CustomText>
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
              className={`bg-[#4D7380] ${loading || (isLoading && "bg-gray-400")} p-3 rounded-lg`}
            >
              <CustomText className="text-white font-inter-bold text-center text-base">
                {loading || isLoading ? "Signing in...." : "Sign In"}
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
