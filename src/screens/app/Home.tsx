import { View, Image, TouchableOpacity, ScrollView } from "react-native";
import CustomText from "../../components/ui/CustomText";
import CustomTextInput from "../../components/ui/CustomeTextInput";
import {
  faHeart,
  faSearch,
  faStar,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import Product from "../../components/Product";

const DummyProduct = {
  title: "Modern Ergonomic Chair",
  category: "FURNITURE",
  rating: 4.8,
  thumbnail:
    "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp",
  description: "Luxury executive arm chair with premium finish",
  stock: 32,
  discountPercentage: 10,
  price: 100,
  availabilityStatus: "In Stock",
};

export default function HomeScreen() {
  return (
    <View className="px-4 py-6 flex-col gap-6">
      <View className="flex flex-row justify-between">
        <View className="w-3/4 ">
          {" "}
          <CustomText className="text-[#4D7380] font-bold text-2xl mt-1">
            Discover The Best MarketPlace
          </CustomText>
        </View>
        <View className="w-1/4  flex items-center justify-center">
          <View className="rounded-full border-2 border-neutral-300 w-14 h-14 mt-1 overflow-hidden">
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
              }}
              resizeMode="cover"
              className="w-full h-full"
            />
          </View>
        </View>
      </View>
      <View>
        <CustomTextInput
          icon={faSearch}
          value={""}
          onChangeText={() => {}}
          placeholderTextColor="#9CA3AF"
          placeholder="Search Product Name.."
          className="text-black  p-3 rounded-lg"
          containerClassName="bg-white"
        />
      </View>
      <View className="h-[100vh]">
        <CustomText className="text-[#4D7380] font-bold text-xl mt-1 pb-4">
          All Products
        </CustomText>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            rowGap: 10,
            paddingBottom: 270,
          }}
          showsVerticalScrollIndicator={false}
        >
          {Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).map((i) => {
            return <Product key={i} product={{ id: i, ...DummyProduct }} />;
          })}
        </ScrollView>
      </View>
    </View>
  );
}
