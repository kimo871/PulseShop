import { View, Image, TouchableOpacity, ScrollView } from "react-native";
import CustomText from "../../components/ui/CustomText";
import CustomTextInput from "../../components/ui/CustomeTextInput";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Product from "../../components/Product";
import { useQuery } from "@tanstack/react-query";
import { productsApi } from "../../api/products";
import { useEffect, useState } from "react";

export default function HomeScreen() {
  const [searchTerm,setSearchTerm] = useState("");
  const [deboucedSearch,setDebouncedSearch] = useState("");

  useEffect(()=>{
    const timer = setTimeout(()=>setDebouncedSearch(searchTerm.trim()),200)
    return ()=> clearTimeout(timer)
  },[searchTerm])

  // fetching products with various states handled by react-query
  const { data, isLoading, error } = useQuery({
    queryKey: ["products", deboucedSearch],
    queryFn: () => productsApi.getProducts(deboucedSearch),
  });
  // debugging
  if (data) {
    console.log("============================")
    console.log(data);
  }
  // debugging
  if(error){
    console.log(error)
  }
  return (
    <ScrollView
      contentContainerStyle={{
        rowGap: 10,
        paddingBottom: 10,
      }}
      showsVerticalScrollIndicator={false}
    >
      <View className="px-4 py-6 flex-col gap-6">
        <View className="flex-row justify-between items-center pb-4">
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
        <View>
          <CustomTextInput
            icon={faSearch}
            value={searchTerm}
            onChangeText={setSearchTerm}
            placeholderTextColor="#9CA3AF"
            placeholder="Search Product Name.."
            className="text-black  p-3 rounded-lg"
            containerClassName="bg-white"
          />
        </View>
        <View className="">
          <CustomText className="text-neutral-800 font-inter-black text-xl mt-1 pb-4">
            All Products
          </CustomText>
          <View className="flex-row gap-x-1 gap-y-2 flex-wrap justify-between">
             {isLoading ? (
            <View className="flex-row flex-wrap justify-between">
              {Array.from({ length: 6 }).map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </View>
          ) : (
            <View className="flex-row flex-wrap justify-between w-full">
              {Array.isArray(data?.products) && data?.products?.map((product) => (
                <Product key={product.id} product={product} />
              ))}
            </View>
          )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

// Skeleton component
const ProductSkeleton = () => (
  <View className="w-[48%] mb-4 bg-gray-200 rounded-lg h-40 animate-pulse" />
);
