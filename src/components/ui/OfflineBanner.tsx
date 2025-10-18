import React from 'react';
import { View, Text} from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function OfflineBanner() {
  return (
    <>
      <StatusBar style="light" />
      <View className=" bg-red-500 px-4 py-2 z-50 shadow-lg">
        <View className="flex-row items-center ">
          <Text className="text-white text-sm font-semibold flex-1 text-center">
             You're offline
          </Text>
        </View>
      </View>
    </>
  );
}