export interface User {
  email: string;
  password: string;
  status: "active" | "inactive" | "pending";
  role: "user" | "admin" | "manager";
  name?: string;
}

export interface CommonState {
  message: string;
  status: number;
  timestamp: string;
}

export interface Slide {
  id: number;
  title: string;
  description: string;
  image_url: string;
}
export interface WelcomeSlides extends CommonState {
  data: {
    slides: Slide[];
  };
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  token: string | null;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse extends CommonState {
  data: {
    email: string;
    token: string;
    expires_in: string;
    token_type: string;
    user_id: number;
    name: string;
  };
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  // confirmPassword: string;
}

export interface ForgotPasswordRequest {
  email: string;
  otp_type?: string
}

export interface ForgotPasswordResponse extends CommonState {
  data: {
    message: string;
    otp_sent: string;
  };
}

export interface OtpConfirmationRequest {
  email: string;
  otp: string;
  otp_type: string;
}

export interface ResetPasswordRequest {
  new_password: string;
  confirm_password: string;
  email?: string;
  otp?: string;
}

export interface ChangePasswordRequest {
  new_password: string;
  current_password: string;
}

export interface authRefreshRequest {
  user_id: number;
}
