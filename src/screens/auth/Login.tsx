import { faShop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import {
  View,
  Image,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import LoginForm from "../../components/auth/LoginForm";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function LoginScreen() {
    const insets = useSafeAreaInsets(); // prevent elemnets from overlapping bottom phone controls'
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        paddingBottom: insets?.bottom + 10,
        flexGrow: 1,
      }}
      showsVerticalScrollIndicator={false}
      enableOnAndroid={true}
      extraScrollHeight={120}
      keyboardShouldPersistTaps="handled"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 items-center bg-[#4D7380]">
          {/* Header Section */}
          <View className="relative min-h-[50vh] w-full">
            <Image
              source={{
                uri: "https://plus.unsplash.com/premium_photo-1683746792239-6ce8cdd3ac78?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
              }}
              className="absolute top-0 left-0 w-full h-[50vh]"
              resizeMode="cover"
            />

            <View
              style={{ opacity: 0.93 }}
              className="absolute top-0 left-0 w-full h-[50vh] bg-[#4D7380]"
            />

            <View className="relative z-10 flex flex-col gap-4 items-center justify-center h-[50vh]">
              <FontAwesomeIcon color="white" icon={faShop} size={40} />
              <Text className="text-white text-2xl font-inter-medium">
                PulseShop
              </Text>
            </View>
          </View>

          {/* End Header Section */}

          {/* Form Section */}
          <View className="bg-white h-full w-full rounded-t-3xl -mt-4 p-6">
            {/* Welcome Text */}
            <View className="mb-8">
              <Text className="font-medium text-2xl font-inter leading-relaxed">
                Welcome Back !
              </Text>
              <Text className="text-neutral-500 text-md mt-2">
                Hello there, sign in to continue.
              </Text>
            </View>

            {/* Login Form */}
            <LoginForm />
          </View>
          {/* End Form Section */}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
  );
}
