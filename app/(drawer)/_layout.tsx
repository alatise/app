import CustomDrawerContent from "@/components/Shared/DrawerContent";
import { Drawer } from "expo-router/drawer";

export default function DrawerLayout() {
  return (
    <Drawer
      drawerContent={(props: any) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false, // 👈 hides the top navigation header
        drawerStyle: {
          backgroundColor: "#fff", // drawer background color
          width: 260, // drawer width
        },
        drawerActiveTintColor: "#fff", // active item text color
        drawerInactiveTintColor: "#888", // inactive item text color
        drawerLabelStyle: {
          fontSize: 16,
          marginLeft: -10,
        },
      }}
    />
  );
}
