// screens/LoadingScreen.tsx
import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import CustomText from './CustomText';

const LoadingScreen = () => {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <ActivityIndicator size="large" color="#4D7380" />
      <CustomText className="text-neutral-600 mt-4">
        Checking authentication...
      </CustomText>
    </View>
  );
};

export default LoadingScreen;