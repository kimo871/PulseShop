import { View, Image, ScrollView, RefreshControl } from "react-native";
import CustomText from "../../components/ui/CustomText";
import CustomTextInput from "../../components/ui/CustomeTextInput";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Product from "../../components/product/Product";
import { useQuery } from "@tanstack/react-query";
import { productsApi } from "../../api/products";
import { useCallback, useEffect, useState } from "react";
import ProductSkeleton from "../../components/product/ProductSkeleton";
import Header from "../../components/Header";
import { useSelector } from "react-redux";
import { queryClient } from "../../lib/client";

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const { user, isSuperAdmin } = useSelector((state) => state?.auth);
  const [searchTerm, setSearchTerm] = useState("");
  const [deboucedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchTerm.trim()), 200);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // fetching products with various states handled by react-query
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["products", deboucedSearch],
    queryFn: () => productsApi.getProducts(deboucedSearch),
  });
  // debugging
  if (data) {
    console.log("============================");
    console.log(data);
  }
  // debugging
  if (error) {
    console.log(error);
  }

  const onRefresh = useCallback(async () => {
    try {
      await refetch?.();
    } catch (err) {
      console.log(err);
    }
  }, [refetch, queryClient]);

  useEffect(() => {
    console.log(
      "🔄 HomeScreen data updated, products count:",
      data?.products?.length
    );
  }, [data]);
  return (
    <ScrollView
      contentContainerStyle={{
        rowGap: 10,
        paddingBottom: 10,
      }}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={["#4D7380"]}
          tintColor="#4D7380"
        />
      }
    >
      <View className="px-4 py-6 flex-col gap-6">
        <View className="flex-row justify-between items-center pb-4">
          <Header
            firstName={user?.firstName}
            lastName={user?.lastName}
            image={user?.image}
          />
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
                {Array.isArray(data?.products) &&
                  data?.products?.map((product: any) => (
                    <Product
                      key={product.id}
                      product={product}
                      config={{ isSuperAdmin: isSuperAdmin }}
                    />
                  ))}
              </View>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
