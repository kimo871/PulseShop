import { View, Image, ScrollView, TouchableOpacity } from "react-native";
import CustomText from "../../components/ui/CustomText";
import Product from "../../components/Product";
const Categories = {
  // 0: {
  //   id: 0,
  //   name: "Beauty",
  //   thumbnail: BEAUTY,
  // },
  // 1: {
  //   id: 1,
  //   name: "Fragrances",
  //   thumbnail: FRAGNACES,
  // },
  2: {
    id: 2,
    name: "Furniture",
    thumbnail: require("../../../assets/icons/furniture.png"),
    selected: true,
  },
  3: {
    id: 3,
    name: "Groceries",
    thumbnail: require("../../../assets/icons/groceries.png"),
  },
  4: {
    id: 4,
    name: "Home Decoration",
    thumbnail: require("../../../assets/icons/home.png"),
  },
  5: {
    id: 5,
    name: "Kitchen Accessories",
    thumbnail: require("../../../assets/icons/kitchen-room.png"),
  },
  6: {
    id: 6,
    name: "Laptops",
    thumbnail: require("../../../assets/icons/laptop.png"),
  },
  7: {
    id: 7,
    name: "Men's Shirts",
    thumbnail: require("../../../assets/icons/t-shirt.png"),
  },
};

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

export default function CategoriesScreen() {
  return (
    <ScrollView
      contentContainerStyle={{
        rowGap: 10,
        paddingBottom: 0,
      }}
      className="px-4 py-2  w-full"
      showsVerticalScrollIndicator={true}
    >
      <View className=" py-4 flex-col gap-6">
        <View className="flex-row justify-between items-center pb-4 ">
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
                    uri: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
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
              Sarah M.
            </CustomText>
          </View>
        </View>
        <View className="">
          {/* Categories Header */}
          <View className="flex-row justify-between items-center mb-4">
            <View>
              <CustomText className="text-neutral-800 font-inter-black text-xl">
                All Categories
              </CustomText>
              <CustomText className="text-neutral-500 font-inter-regular text-sm mt-1">
                {Object.values(Categories).length} categories available
              </CustomText>
            </View>
            <TouchableOpacity className="flex-row items-center">
              <CustomText className="text-blue-600 font-inter-medium text-sm mr-1">
                View All
              </CustomText>
              <CustomText className="text-blue-600 text-lg">›</CustomText>
            </TouchableOpacity>
          </View>

          {/* Categories Scroll */}
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={true}
            contentContainerStyle={{
              paddingHorizontal: 5,
              paddingVertical: 10,
              gap: 20,
            }}
          >
            {Object.values(Categories).map((item, i) => {
              return (
                <TouchableOpacity
                  key={item.id}
                  className="flex-col items-center active:scale-95"
                  style={{ width: 80 }}
                >
                  {/* Enhanced Category Card */}
                  <View
                    className={`p-4 rounded-2xl  w-16 h-16 border bg-white ${item?.selected ? "border-4 border-[#4D7380]" : "border-neutral-200"}  items-center justify-center shadow-sm shadow-neutral-200`}
                  >
                    <Image
                      source={item?.thumbnail}
                      resizeMode="contain"
                      className="w-8 h-8"
                      style={{ width: 32, height: 32 }}
                    />
                  </View>
                  <CustomText
                    numberOfLines={2}
                    className="text-neutral-800 font-inter-medium text-xs leading-4 text-center mt-3"
                  >
                    {item?.name}
                  </CustomText>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Products Section */}
        <View className="mt-0 w-full   ">
          {/* Products Header with Filter */}
          <View className="flex-row justify-between items-center mb-6 ">
            <View>
              <CustomText className="text-neutral-800 font-inter-black text-xl">
                Products By Category
              </CustomText>
              <CustomText className="text-neutral-500 font-inter-regular text-sm mt-1">
                Handpicked items just for you
              </CustomText>
            </View>
            {/* <TouchableOpacity className="flex-row items-center bg-white rounded-xl px-4 py-2 border border-neutral-200 shadow-sm">
      <CustomText className="text-neutral-600 mr-2">Filter</CustomText>
      <CustomText className="text-neutral-400 text-lg">⌄</CustomText>
    </TouchableOpacity> */}
          </View>

          {/* Enhanced Products Grid */}
          <View className="pb-32 w-full flex-row flex-wrap gap-2 justify-between px-2  ">
            {Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).map((i) => {
              return (
                <Product width="w-[48%]" product={{ id: i, ...DummyProduct }} />
              );
            })}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
