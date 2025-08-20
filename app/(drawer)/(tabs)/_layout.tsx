import { Tabs } from "expo-router";
import React from "react";
import BottomMenu from "../../layout/BottomMenu";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(
        props: React.JSX.IntrinsicAttributes & {
          state: any;
          navigation: any;
          descriptors: any;
        }
      ) => <BottomMenu {...props} />}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Home",
          tabBarLabel: "Home",
        }}
      />

      <Tabs.Screen
        name="wishlist"
        options={{
          title: "Wishlist",
          tabBarLabel: "Wishlist",
        }}
      />
      <Tabs.Screen
        name="myCart"
        options={{
          title: "MyCart",
          tabBarLabel: "MyCart",
        }}
      />
      <Tabs.Screen
        name="category"
        options={{
          title: "Category",
          tabBarLabel: "Category",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarLabel: "Profile",
        }}
      />
    </Tabs>
  );
}
