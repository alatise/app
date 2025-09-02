import { CustomAlert } from "@/constants/toastConfig";
import { useSession } from "@/lib/authCtx";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

type TabWrapperProps = React.PropsWithChildren<{}>;

const TabWrapper: React.FC<TabWrapperProps> = ({ children }) => {
  const { alertVisible, requestResponse } = useSession();
  return (
    <SafeAreaView
      edges={["left", "top"]}
      style={{ backgroundColor: "white" }}
      className={`flex-1 px-4 pt-4`}
    >
      {children}
      <CustomAlert
        visible={alertVisible}
        title={requestResponse.title}
        message={requestResponse.message}
        type={requestResponse.type!}
      />
    </SafeAreaView>
  );
};

export default TabWrapper;
