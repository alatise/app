import { authService } from "@/services/authService";
import {
  AuthState,
  LoginRequest,
  RegisterRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  User,
} from "@/types/auth";
import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";

interface AuthContextType extends AuthState {
  login: (credentials: LoginRequest) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (request: ForgotPasswordRequest) => Promise<void>;
  verifyOTP: (email: string, otpCode: string) => Promise<void>;
  resetPassword: (request: ResetPasswordRequest) => Promise<void>;
  clearError: () => void;
  getTempEmail: () => Promise<string | null>;
}

type AuthAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_USER"; payload: { user: User; token: string } }
  | { type: "SET_ERROR"; payload: string }
  | { type: "CLEAR_ERROR" }
  | { type: "LOGOUT" }
  | {
      type: "INIT_STATE";
      payload: { user: User | null; token: string | null };
    };

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  token: null,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: action.payload, error: null };

    case "SET_USER":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };

    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    case "CLEAR_ERROR":
      return { ...state, error: null };

    case "LOGOUT":
      return {
        ...initialState,
        isLoading: false,
      };

    case "INIT_STATE":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: !!action.payload.user && !!action.payload.token,
        isLoading: false,
      };

    default:
      return state;
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const initializeAuth = async () => {
      dispatch({ type: "SET_LOADING", payload: true });

      try {
        const [user, token] = await Promise.all([
          authService.getCurrentUser(),
          authService.getStoredToken(),
        ]);

        dispatch({ type: "INIT_STATE", payload: { user, token } });
      } catch (error) {
        console.error("Auth initialization error:", error);
        dispatch({ type: "LOGOUT" });
      }
    };

    initializeAuth();
  }, []);

  const login = async (credentials: LoginRequest): Promise<void> => {
    dispatch({ type: "SET_LOADING", payload: true });

    try {
      const { user, token } = await authService.login(credentials);
      dispatch({ type: "SET_USER", payload: { user, token } });
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred. Please try again.";
      dispatch({ type: "SET_ERROR", payload: errorMessage });
      throw error;
    }
  };

  const register = async (userData: RegisterRequest): Promise<void> => {
    dispatch({ type: "SET_LOADING", payload: true });

    try {
      const { user, token } = await authService.register(userData);
      dispatch({ type: "SET_USER", payload: { user, token } });
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred. Please try again.";
      dispatch({ type: "SET_ERROR", payload: errorMessage });
      throw error;
    }
  };

  const forgotPassword = async (
    request: ForgotPasswordRequest
  ): Promise<void> => {
    dispatch({ type: "SET_LOADING", payload: true });

    try {
      await authService.forgotPassword(request);
      dispatch({ type: "SET_LOADING", payload: false });
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred. Please try again.";
      dispatch({ type: "SET_ERROR", payload: errorMessage });
      throw error;
    }
  };

  const verifyOTP = async (email: string, otpCode: string): Promise<void> => {
    dispatch({ type: "SET_LOADING", payload: true });

    try {
      await authService.verifyOTP(email, otpCode);
      dispatch({ type: "SET_LOADING", payload: false });
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred. Please try again.";
      dispatch({ type: "SET_ERROR", payload: errorMessage });
      throw error;
    }
  };

  const resetPassword = async (
    request: ResetPasswordRequest
  ): Promise<void> => {
    dispatch({ type: "SET_LOADING", payload: true });

    try {
      await authService.resetPassword(request);
      dispatch({ type: "SET_LOADING", payload: false });
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred. Please try again.";
      dispatch({ type: "SET_ERROR", payload: errorMessage });
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    dispatch({ type: "SET_LOADING", payload: true });

    try {
      await authService.logout();
      dispatch({ type: "LOGOUT" });
    } catch (error) {
      console.error("Logout error:", error);
      dispatch({ type: "LOGOUT" });
    }
  };

  const clearError = (): void => {
    dispatch({ type: "CLEAR_ERROR" });
  };

  const getTempEmail = async (): Promise<string | null> => {
    return await authService.getTempEmail();
  };

  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    forgotPassword,
    verifyOTP,
    resetPassword,
    clearError,
    getTempEmail,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
