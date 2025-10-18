import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { TouchableOpacity, View, Image, Alert } from "react-native";
import { faStar, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import CustomText from "../ui/CustomText";
import { productsApi } from "../../api/products";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../lib/client";

type ProductProps = {
  id: number;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  availabilityStatus: string;
};

type ConfigProps = {
  isSuperAdmin: boolean;
};

export default function Product({
  product,
  width,
  config = { isSuperAdmin: false },
}: {
  product: ProductProps;
  config?: ConfigProps;
  width?: string;
}) {
  // delete mutation for invalidating all cached queries with products
  const mutationDelete = useMutation({
    mutationFn: () => productsApi.deleteProductById(product?.id),
    onMutate: async () => {
      // 1) invalidate products query
      await queryClient.cancelQueries({ queryKey: ["products"] });

      // 2) Here we loop over all query keys contain products that actually contain the target product
      queryClient.setQueriesData(
        { queryKey: ["products"] }, 
        (old: any) => {
          if (old?.products?.some((p: any) => p.id === product.id)) {
            return {
              ...old,
              products: old.products.filter((p: any) => p.id !== product.id),
              total: (old.total || 0) - 1,
            };
          }
          return old;
        }
      );

      return {
        previousProducts: queryClient.getQueriesData({
          queryKey: ["products"],
        }),
      };
    },
    onError: (err, variables, context) => {
      // revert  products queries
      context?.previousProducts?.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });
    },
  });

  // delete product handler
  const handleDelete = () => {
    console.log("delete action pressed");
    Alert.alert(
      "Delete",
      `Are you sure you want to delete ${product?.title}?`,
      [
        { text: "No,Keep Product", style: "cancel" },
        {
          text: "Yes,Delete it",
          onPress: () => {
            mutationDelete.mutate();
            console.log("deleted.....");
          },
        },
      ]
    );
  };
  return (
    <View
      className={` bg-white rounded-xl shadow-lg shadow-neutral-200/80 border border-neutral-200 p-0 ${width ? width : "w-[49%]"} mb-4 `}
    >
      {/* Image Container */}
      <View className="relative rounded-xl w-full h-36 overflow-hidden mb-3">
        <Image
          source={{
            uri: `${product?.thumbnail}`,
          }}
          resizeMode="cover"
          className="w-full h-full rounded-xl mt-2"
        />
      </View>

      {/* Product Content */}
      <View className="space-y-2 p-2">
        {/* Category Tag */}
        <View className="flex-row justify-between items-start">
          <View className="bg-[#4D7380] px-2 py-1 rounded-md flex-shrink mr-2 max-w-[90%]">
            <CustomText
              numberOfLines={1}
              className="text-white font-inter-medium text-[10px]"
            >
              {product?.category.toUpperCase()}
            </CustomText>
          </View>
          <View className="flex-row items-center bg-amber-50 px-2 py-1 rounded-md">
            <FontAwesomeIcon color="#f59e0b" icon={faStar} size={10} />
            <CustomText className="text-amber-700 font-inter-bold text-xs ml-1">
              {product?.rating}
            </CustomText>
          </View>
        </View>

        {/* Product Title & Description */}
        <View className="space-y-1">
          <CustomText
            numberOfLines={2}
            className="text-neutral-800 font-inter-bold text-base leading-5"
          >
            {product?.title}
          </CustomText>
          <CustomText
            numberOfLines={2}
            className="text-neutral-500 font-inter-regular text-sm leading-4"
          >
            {product?.description}
          </CustomText>
        </View>

        {/* Price & Action Section */}
        <View className="flex-row justify-between items-center pt-1">
          <View>
            <CustomText className="font-inter-black text-xl text-neutral-900">
              {((product?.price * product?.discountPercentage) / 100).toFixed(
                2
              )}
            </CustomText>
            <CustomText className="text-neutral-400 font-inter-regular text-xs line-through">
              {product?.price}
            </CustomText>
          </View>

          {/* Action Buttons */}
          {config?.isSuperAdmin && (
            <View className="flex-row space-x-2">
              <TouchableOpacity
                onPress={handleDelete}
                className="bg-red-50 w-9 h-9 rounded-lg items-center justify-center border border-red-100"
              >
                <FontAwesomeIcon color="#dc2626" icon={faTrashAlt} size={14} />
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Quick Status */}
        <View className="flex-row items-center justify-between pt-1">
          <View className="flex-row items-center">
            <View
              className={`w-2 h-2 ${product?.availabilityStatus.toLowerCase() == "in stock" ? "bg-green-500" : "bg-red-500"} rounded-full mr-1`}
            ></View>
            <CustomText
              className={`${product?.availabilityStatus.toLowerCase() == "in stock" ? "text-green-700" : "text-red-700"} font-inter-medium text-xs`}
            >
              {product?.availabilityStatus}
            </CustomText>
          </View>
        </View>
      </View>
    </View>
  );
}
