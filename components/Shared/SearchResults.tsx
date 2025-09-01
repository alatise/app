import { SearchProductsResponse } from "@/lib/type";
import React from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import ProductCard from "../Products/ProductCard";

type prop = {
  searching: boolean;
  searchResults: SearchProductsResponse;
  searchState: string;
};

const SearchResultsComp = ({ searchResults, searchState, searching }: prop) => {
  return (
    <View className="pt-8">
      {searching ? (
        <View className="flex items-center justify-center mt-10">
          <ActivityIndicator size="small" color="#B29954" />
          <Text className="mt-2 text-black text-sm  font-inter-medium">
            Loading search results...
          </Text>
        </View>
      ) : (
        <View>
          {!searchResults && (
            <View className="flex items-center justify-center mt-10">
              <Text className="mt-2 text-black text-sm  font-inter-medium">
                There are no items under your search "{searchState}"
              </Text>
            </View>
          )}

          <FlatList
            showsVerticalScrollIndicator={false}
            data={searchResults?.data.results ?? []}
            numColumns={2}
            renderItem={({ item }) => <ProductCard {...item} />}
            columnWrapperStyle={{
              justifyContent: "space-between",
              marginBottom: 20,
            }}
            // //@ts-expect-error
            // onViewableItemsChanged={onViewableItemsChanged}
            // viewabilityConfig={viewabilityConfig}
            // ListFooterComponent={renderFooter}
            // keyExtractor={(item, index) => `${item.id}+${index}`}
            // removeClippedSubviews={true}
            // maxToRenderPerBatch={10}
            // windowSize={10}
          />
        </View>
      )}
    </View>
  );
};

export default SearchResultsComp;
