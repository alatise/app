import Gold from "@/assets/images/iconsvg/categoryimg.svg";
import { useHomeDataQuery } from "@/services/products";
import { router } from "expo-router";
import React from "react";
import { ActivityIndicator, Pressable, ScrollView, Text, View } from "react-native";

interface prop {
  view_all?: boolean;
}

const TopCategories = ({ view_all }: prop) => {
  const { data, isLoading } = useHomeDataQuery();

  const topCategory = data?.data.featured_categories.filter(
    (c) => c.product_count > 1
  );

  return (
    <View className="mt-6">
      <View className="flex-row items-center justify-between">
        <Text className="text-lg font-inter-medium text-title">
          Top Categories
        </Text>
        {view_all && (
          <Pressable onPress={() => router.push("/category") }>
            <Text className="underline text-sm font-inter-medium">
              View All
            </Text>
          </Pressable>
        )}
      </View>
      {isLoading ? (
        <ActivityIndicator color={"#B29954"} />
      ) : (
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          className="mt-4"
        >
          {topCategory?.map((c, i) => (
            <View key={i} className="justify-center items-center mr-10">
              <Gold width={60} height={60} className="mx-auto" />
              <Text className="text-sm font-inter-medium text-title text-center pt-2">
                {c.name}
              </Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default TopCategories;
