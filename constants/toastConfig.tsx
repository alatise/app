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

// export const CustomAlert = ({ visible, message, title, type }: Props) => {
//   const { hideAlert } = useSession();
//   const Icon = type === "error" ? XCircle : CheckCircle;

//   return (
//     <Modal
//       transparent
//       visible={visible}
//       animationType="fade"
//       statusBarTranslucent
//       presentationStyle="overFullScreen" // This is key
//     >
//       <View
//         style={{
//           flex: 1,
//           backgroundColor: "rgba(0,0,0,0.5)",
//           justifyContent: "center",
//           alignItems: "center",
//           padding: 20,
//         }}
//       >
//         <View
//           style={{
//             backgroundColor: "white",
//             borderRadius: 10,
//             padding: 24,
//             width: "85%",
//             alignItems: "center",
//             elevation: 10, // Android shadow
//             shadowColor: "#000", // iOS shadow
//             shadowOffset: { width: 0, height: 2 },
//             shadowOpacity: 0.25,
//             shadowRadius: 10,
//           }}
//         >
//           <Icon size={40} color={type === "error" ? "red" : "green"} />
//           <Text
//             style={{
//               fontSize: 18,
//               textAlign: "center",
//               fontWeight: "bold",
//               marginTop: 16,
//               color: type === "error" ? "#DC2626" : "#16A34A",
//             }}
//           >
//             {title}
//           </Text>
//           <Text
//             style={{
//               color: "#6B7280",
//               marginTop: 8,
//               textAlign: "center",
//               fontSize: 14,
//             }}
//           >
//             {message}
//           </Text>

//           <TouchableOpacity
//             style={{
//               backgroundColor: "#your-secondary-color", // Replace with your secondary color
//               borderRadius: 8,
//               paddingHorizontal: 24,
//               marginTop: 24,
//               height: 40,
//               justifyContent: "center",
//               alignItems: "center",
//             }}
//             onPress={hideAlert}
//           >
//             <Text style={{ color: "white", fontWeight: "500" }}>OK</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </Modal>
//   );
// };
