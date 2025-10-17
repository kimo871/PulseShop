import { View, Image, ScrollView, TouchableOpacity } from "react-native";
import CustomText from "../../components/ui/CustomText";
import { useQuery } from "@tanstack/react-query";
import { categoriesApi } from "../../api/categories";
import { useEffect, useState } from "react";
import { productsApi } from "../../api/products";
import { categoryIcons } from "../../utils/icons/categoryIcons";
import ProductSkeleton from "../../components/ui/product/ProductSkeleton";
import Product from "../../components/ui/product/Product";
import { useSelector } from "react-redux";
import Header from "../../components/Header";

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
  const { user } = useSelector((state) => state?.auth);
  // state for tracking selected category
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  // query for getting categories
  const {
    data: categoriesData,
    isLoading: loadingCategories,
    error: errorCategories,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: categoriesApi.getCategroies,
  });
  // if (categoriesData) {
  //   console.log(categoriesData);
  // }
  if (errorCategories) {
    console.log(errorCategories);
  }

  useEffect(() => {
    if (categoriesData && categoriesData.length > 0 && !selectedCategory) {
      setSelectedCategory(categoriesData[0]?.slug);
    }
  }, [categoriesData, selectedCategory]);
  // query for getting products by selected category section
  const {
    data: productsData,
    isLoading: loadingProducts,
    error: errorProducts,
  } = useQuery({
    queryKey: ["productsByCategory", selectedCategory],
    queryFn: () => productsApi.getProductsByCategory(selectedCategory),
    enabled: !!selectedCategory,
  });
  if (productsData) {
    console.log(productsData);
  }
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
        <View className="flex-row justify-between items-center pb-4">
          <Header
            firstName={user?.firstName}
            lastName={user?.lastName}
            image={user?.image}
          />
        </View>
        <View className="">
          {/* Categories Header */}
          <View className="flex-row justify-between items-center mb-4">
            <View>
              <CustomText className="text-neutral-800 font-inter-black text-xl">
                All Categories
              </CustomText>
              <CustomText className="text-neutral-500 font-inter-regular text-sm mt-1">
                {categoriesData?.length || 0} categories available
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
            {Array.isArray(categoriesData) &&
              categoriesData.map((item, i) => {
                // derive a safe key for categoryIcons and whether this item is selected
                const iconKey = (item?.name ?? "")
                  .toLowerCase()
                  .replace(/\s+/g, "-") as keyof typeof categoryIcons;
                const isSelected =
                  (item?.slug ?? "").toLowerCase() ===
                  (selectedCategory ?? "").toLowerCase();
                // fallback image if icon not found
                const iconSource =
                  categoryIcons[iconKey] ??
                  require("../../../assets/icons/categories/placeholder.png");

                return (
                  <TouchableOpacity
                    key={i}
                    className="flex-col items-center active:scale-95"
                    style={{ width: 80 }}
                    onPress={() => setSelectedCategory(item?.slug ?? "")}
                  >
                    {/* Category Card */}
                    <View
                      className={`p-4 rounded-2xl  w-16 h-16 border bg-white ${isSelected ? "border-4 border-[#4D7380]" : "border-neutral-200"}  items-center justify-center shadow-sm shadow-neutral-200`}
                    >
                      <Image
                        source={iconSource}
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
          {/* Products Header  */}
          <View className="flex-row justify-between items-center mb-6 ">
            <View>
              <CustomText className="text-neutral-800 font-inter-black text-xl">
                Products By Category
              </CustomText>
              <CustomText className="text-neutral-500 font-inter-regular text-sm mt-1">
                Handpicked items just for you
              </CustomText>
            </View>
          </View>

          {/* Enhanced Products Grid */}
          <View className="pb-32 w-full flex-row flex-wrap gap-2 justify-between px-2  ">
            {loadingProducts ? (
              <View className="flex-row flex-wrap justify-between">
                {Array.from({ length: 6 }).map((_, i) => (
                  <ProductSkeleton key={i} />
                ))}
              </View>
            ) : (
              <View className="flex-row flex-wrap justify-between w-full">
                {Array.isArray(productsData?.products) &&
                  productsData?.products?.map((product: any) => (
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
