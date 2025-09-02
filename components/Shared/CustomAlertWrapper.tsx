import { CustomAlert } from "@/constants/toastConfig";
import { useSession } from "@/lib/authCtx";

export const CustomAlertWrapper = () => {
  const { alertVisible, requestResponse } = useSession();

  return (
    <CustomAlert
      visible={alertVisible}
      title={requestResponse.title}
      message={requestResponse.message}
      type={requestResponse.type!}
    />
  );
};
