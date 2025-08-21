import { useStorageState } from "@/hooks/useStorageState";
import { useSigninMutation, useSignupMutation } from "@/services/auth";
import { router } from "expo-router";
import { createContext, use, useState, type PropsWithChildren } from "react";
import Toast from "react-native-toast-message";
import { LoginRequest, RegisterRequest } from "./type";

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

  const isAuthenticated = !!session;
  const signIn = async (credentials: LoginRequest) => {
    setLoading(true);
    try {
      const response = await performSignin(credentials).unwrap();
      //   console.log(">>>>>respomse", response.data);

      if (response.status === 200) {
        setSession(response.data.token);
        return Promise.resolve();
      }
    } catch (error: any) {
      console.log(">>>>.error", error);

      Toast.show({
        type: "error",
        text1: "An Error Occured",
        text2: error!!?.data.details.errors.non_field_errors,
      });
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
      }
      return Promise.resolve();
    } catch (error: any) {
      console.log(">>>>.error---", error);

      Toast.show({
        type: "error", // or 'error' or 'delete'
        text1: "An Error Occured",
        text2: error!!?.data.message,
      });
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
      }}
    >
      {children}
    </AuthContext>
  );
}
