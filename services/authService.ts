import {
  ForgotPasswordRequest,
  LoginRequest,
  RegisterRequest,
  ResetPasswordRequest,
  User,
} from "@/types/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "https://kabilsgrillz.baocorps-staging.com/api/test";
const STORAGE_KEYS = {
  TOKEN: "@auth_token",
  USER: "@auth_user",
  TEMP_EMAIL: "@temp_email",
};

class AuthService {
  private testUsers: User[] = [];

  constructor() {
    this.initializeTestData();
  }

  private async initializeTestData(): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/users.php`);
      if (response.ok) {
        this.testUsers = await response.json();
      }
    } catch (error) {
      console.error("Failed to fetch test users:", error);
    }
  }

  private generateMockToken(user: User): string {
    const timestamp = Date.now();
    const userInfo = btoa(
      JSON.stringify({ email: user.email, role: user.role })
    );
    return `mock_token_${userInfo}_${timestamp}`;
  }

  private generateMockOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  private async simulateNetworkDelay(): Promise<void> {
    await new Promise((resolve) =>
      setTimeout(resolve, 1000 + Math.random() * 1000)
    );
  }

  async login(
    credentials: LoginRequest
  ): Promise<{ user: User; token: string }> {
    await this.simulateNetworkDelay();

    if (!this.testUsers.length) {
      await this.initializeTestData();
    }

    const user = this.testUsers.find(
      (u) => u.email.toLowerCase() === credentials.email.toLowerCase()
    );

    if (!user) {
      throw new Error("No account found with this email address.");
    }

    if (user.password !== credentials.password) {
      throw new Error("Invalid email or password. Please try again.");
    }

    if (user.status === "inactive") {
      throw new Error(
        "Your account has been deactivated. Please contact support."
      );
    }

    if (user.status === "pending") {
      throw new Error(
        "Your account is pending approval. Please wait for activation."
      );
    }

    const token = this.generateMockToken(user);

    await AsyncStorage.setItem(STORAGE_KEYS.TOKEN, token);
    await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));

    return { user, token };
  }

  async register(
    userData: RegisterRequest
  ): Promise<{ user: User; token: string }> {
    await this.simulateNetworkDelay();

    if (!userData.acceptedTerms) {
      throw new Error("You must accept the terms and conditions to continue.");
    }

    if (userData.password !== userData.confirmPassword) {
      throw new Error("Passwords do not match. Please try again.");
    }

    if (!this.testUsers.length) {
      await this.initializeTestData();
    }

    const existingUser = this.testUsers.find(
      (u) => u.email.toLowerCase() === userData.email.toLowerCase()
    );

    if (existingUser) {
      throw new Error(
        "An account with this email already exists. Please sign in instead."
      );
    }

    const newUser: User = {
      email: userData.email,
      password: userData.password,
      status: "active",
      role: "user",
      name: userData.name,
    };

    const token = this.generateMockToken(newUser);

    await AsyncStorage.setItem(STORAGE_KEYS.TOKEN, token);
    await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(newUser));

    return { user: newUser, token };
  }

  async forgotPassword(
    request: ForgotPasswordRequest
  ): Promise<{ success: boolean }> {
    await this.simulateNetworkDelay();

    if (!this.testUsers.length) {
      await this.initializeTestData();
    }

    const user = this.testUsers.find(
      (u) => u.email.toLowerCase() === request.email.toLowerCase()
    );

    if (!user) {
      throw new Error("No account found with this email address.");
    }

    await AsyncStorage.setItem(STORAGE_KEYS.TEMP_EMAIL, request.email);

    const otp = this.generateMockOTP();
    await AsyncStorage.setItem(`@otp_${request.email}`, otp);

    console.log(` OTP for ${request.email}: ${otp}`);

    return { success: true };
  }

  async verifyOTP(
    email: string,
    otpCode: string
  ): Promise<{ success: boolean }> {
    await this.simulateNetworkDelay();

    const storedOTP = await AsyncStorage.getItem(`@otp_${email}`);

    if (!storedOTP || storedOTP !== otpCode) {
      throw new Error("Invalid verification code. Please check and try again.");
    }

    return { success: true };
  }

  async resetPassword(
    request: ResetPasswordRequest
  ): Promise<{ success: boolean }> {
    await this.simulateNetworkDelay();

    if (request.newPassword !== request.confirmPassword) {
      throw new Error("Passwords do not match. Please try again.");
    }

    await this.verifyOTP(request.email, request.otpCode);

    await AsyncStorage.removeItem(`@otp_${request.email}`);
    await AsyncStorage.removeItem(STORAGE_KEYS.TEMP_EMAIL);

    return { success: true };
  }

  async logout(): Promise<void> {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.TOKEN,
      STORAGE_KEYS.USER,
      STORAGE_KEYS.TEMP_EMAIL,
    ]);
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const userData = await AsyncStorage.getItem(STORAGE_KEYS.USER);
      return userData ? JSON.parse(userData) : null;
    } catch {
      return null;
    }
  }

  async getStoredToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(STORAGE_KEYS.TOKEN);
    } catch {
      return null;
    }
  }

  async getTempEmail(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(STORAGE_KEYS.TEMP_EMAIL);
    } catch {
      return null;
    }
  }
}

export const authService = new AuthService();
