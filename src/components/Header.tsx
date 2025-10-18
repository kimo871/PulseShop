import { View, Image } from "react-native";
import CustomText from "./ui/CustomText";

type ProfileProps = {
  image: string;
  firstName: string;
  lastName: string;
};

export default function Header({ image, firstName, lastName }: ProfileProps) {
  return (
   <>
      {/* Text Content */}
      <View className="flex-1 pr-4">
        <CustomText className="text-neutral-400 font-inter-medium text-sm uppercase tracking-wider mb-1">
          Welcome Back
        </CustomText>
        <CustomText className="text-neutral-800 font-inter-black text-2xl leading-8">
          Discover The Best{"\n"}Marketplace
        </CustomText>
        <CustomText className="text-neutral-500 font-inter-regular text-sm mt-2">
          Find quality products from trusted sellers
        </CustomText>
      </View>

      {/* Enhanced Profile Section */}
      <View className="flex-col items-end">
        {/* Profile Image with Status Indicator */}
        <View className="relative">
          <View className="rounded-2xl border-2 border-white w-16 h-16 overflow-hidden shadow-lg shadow-neutral-300">
            <Image
              source={{
                uri: image,
              }}
              resizeMode="cover"
              className="w-full h-full"
            />
          </View>
          {/* Online Status Indicator */}
          <View className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></View>
        </View>

        {/* User Name */}
        <CustomText className="text-neutral-700 font-inter-medium text-sm mt-2 text-center">
          {firstName} {lastName}
        </CustomText>
      </View>
      </>
  );
}
