import { useSession } from "@/lib/authCtx";
import { CheckCircle, XCircle } from "lucide-react-native"; // example icon lib
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { BaseToast, ErrorToast } from "react-native-toast-message";

export const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "green", marginTop: 10 }}
      contentContainerStyle={{ paddingHorizontal: 6 }}
      text1NumberOfLines={3}
      text1Style={{
        fontSize: 12,
        fontWeight: "400",
        fontFamily: "HandoMedium",
      }}
      text2Style={{
        fontSize: 12,
        fontWeight: "400",
        fontFamily: "HandoRegular",
      }}
    />
  ),

  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: "red", marginTop: 10 }}
      contentContainerStyle={{ paddingHorizontal: 6 }}
      text1NumberOfLines={3}
      text1Style={{
        fontSize: 12,
        fontWeight: "400",
        fontFamily: "HandoMedium",
      }}
      text2Style={{
        fontSize: 12,
        fontWeight: "400",
        fontFamily: "HandoRegular",
      }}
    />
  ),
};

type Props = {
  visible: boolean;
  title: string;
  message?: string;
  type: string;
};

export const CustomAlert = ({ visible, message, title, type }: Props) => {
  const { hideAlert } = useSession();
  const Icon = type === "error" ? XCircle : CheckCircle;
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View className="flex-1 items-center justify-center bg-black/50">
        <View
          style={{ width: 350 }}
          className="bg-white rounded-[10px] py-6 px-4  items-center"
        >
          <Icon size={40} color={type === "error" ? "red" : "green"} />
          <Text
            style={{ color: type === "error" ? "red" : "green" }}
            className={`text-lg text-center font-bold mt-4 ${type === "error" ? "text-red-600 " : "text-green-600"}`}
          >
            {title}
          </Text>
          <Text className="text-gray-600 mt-2 text-center">{message}</Text>

          <TouchableOpacity
            className="bg-secondary rounded-lg px-6 mt-6 h-[40px]  flex-row justify-center items-center"
            onPress={hideAlert}
          >
            <Text className="text-white text-center items-center font-inter-medium ">
              OK
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
