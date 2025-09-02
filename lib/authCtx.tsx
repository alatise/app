import { CustomAlert } from "@/constants/toastConfig";
import { useStorageState } from "@/hooks/useStorageState";
import { useSigninMutation, useSignupMutation } from "@/services/auth";
import { router } from "expo-router";
import { createContext, use, useState, type PropsWithChildren } from "react";
import { LoginRequest, RegisterRequest } from "./type";

type prop = {
  status: number;
  message?: string;
  title: string;
  type?: string;
};

export const AuthContext = createContext<{
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  signIn: (user: LoginRequest) => void;
  signUp: (user: RegisterRequest) => void;
  setSession: (session: string) => void;
  signOut: () => void;
  session?: string | null;
  isSessionLoading: boolean;
  isAuthenticated: boolean;
  alertVisible: boolean;
  showAlert: () => void;
  hideAlert: () => void;
  requestResponse: prop;
  setRequestResponse: React.Dispatch<React.SetStateAction<prop>>;
}>({
  isLoading: false,
  setLoading: () => null,
  signIn: () => null,
  signUp: () => null,
  signOut: () => null,
  session: null,
  isSessionLoading: false,
  isAuthenticated: false,
  setSession: () => {},
  alertVisible: false,
  showAlert: () => {},
  hideAlert: () => {},
  requestResponse: {
    status: 0,
    message: "",
    title: "",
    type: "",
  },
  setRequestResponse: () => {},
});

// This hook can be used to access the user info.
export function useSession() {
  const value = use(AuthContext);
  if (!value) {
    throw new Error("useSession must be wrapped in a <SessionProvider />");
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isSessionLoading, session], setSession] = useStorageState("session");
  const [isLoading, setLoading] = useState(false);
  const [performSignin] = useSigninMutation();
  const [performSignup] = useSignupMutation();
  const [alertVisible, setAlertVisible] = useState(false);
  const [requestResponse, setRequestResponse] = useState<prop>({
    status: 0,
    message: "",
    title: "",
    type: "",
  });

  const showAlert = () => {
    setAlertVisible(true);
  };

  const hideAlert = () => {
    setAlertVisible(false);
  };

  const isAuthenticated = !!session;
  const signIn = async (credentials: LoginRequest) => {
    setLoading(true);
    try {
      const response = await performSignin(credentials).unwrap();
      console.log(">>>>> login response", response.data);

      if (response.status === 200) {
        setSession(response.data.token);
        return Promise.resolve();
      }
    } catch (error: any) {
      console.log(">>>> login error", error.data.message);
      setRequestResponse({
        status: error.data.status,
        title: error.data.message,
        message: "",
        type: "error",
      });
      showAlert();
      return Promise.reject(error);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (credentials: RegisterRequest) => {
    setLoading(true);

    try {
      const response = await performSignup(credentials).unwrap();
      console.log(">>>>>respomse", response);

      if (response.status === 201) {
        router.replace("/(auth)/login");
        return Promise.resolve();
      }
    } catch (error: any) {
      console.log(">>>>.error---", error.data.status);
      setRequestResponse({
        status: error.data.status,
        title: error.data.message,
        message: error.data.message,
        type: "error",
      });
      showAlert();
      return Promise.reject(error); // Propagate error
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setSession(null);
  };

  return (
    <AuthContext
      value={{
        signIn,
        signOut,
        signUp,
        setSession,
        session,
        isSessionLoading,
        isAuthenticated,
        isLoading,
        setLoading,
        showAlert,
        hideAlert,
        alertVisible,
        requestResponse,
        setRequestResponse,
      }}
    >
      {children}

      {/* <CustomAlert
        visible={alertVisible}
        title={requestResponse.title}
        message={requestResponse.message}
        type={requestResponse.type!}
      /> */}
    </AuthContext>
  );
}
