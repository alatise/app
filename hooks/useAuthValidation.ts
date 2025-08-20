import { useState } from "react";

interface ValidationErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  name?: string;
  otp?: string;
}

export const useAuthValidation = () => {
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setErrors((prev) => ({ ...prev, email: "Email is required" }));
      return false;
    }
    if (!emailRegex.test(email)) {
      setErrors((prev) => ({
        ...prev,
        email: "Please enter a valid email address",
      }));
      return false;
    }
    setErrors((prev) => ({ ...prev, email: undefined }));
    return true;
  };

  const validatePassword = (password: string): boolean => {
    if (!password) {
      setErrors((prev) => ({ ...prev, password: "Password is required" }));
      return false;
    }
    if (password.length < 6) {
      setErrors((prev) => ({
        ...prev,
        password: "Password must be at least 6 characters",
      }));
      return false;
    }
    setErrors((prev) => ({ ...prev, password: undefined }));
    return true;
  };

  const validateConfirmPassword = (
    password: string,
    confirmPassword: string
  ): boolean => {
    if (!confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Please confirm your password",
      }));
      return false;
    }
    if (password !== confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Passwords do not match",
      }));
      return false;
    }
    setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
    return true;
  };

  const validateName = (name: string): boolean => {
    if (!name) {
      setErrors((prev) => ({ ...prev, name: "Name is required" }));
      return false;
    }
    if (name.length < 2) {
      setErrors((prev) => ({
        ...prev,
        name: "Name must be at least 2 characters",
      }));
      return false;
    }
    setErrors((prev) => ({ ...prev, name: undefined }));
    return true;
  };

  const validateOTP = (otp: string, requiredLength: number = 6): boolean => {
    if (!otp) {
      setErrors((prev) => ({ ...prev, otp: "Verification code is required" }));
      return false;
    }
    if (otp.length !== requiredLength) {
      setErrors((prev) => ({
        ...prev,
        otp: `Verification code must be ${requiredLength} digits`,
      }));
      return false;
    }
    if (!/^\d+$/.test(otp)) {
      setErrors((prev) => ({
        ...prev,
        otp: "Verification code must contain only numbers",
      }));
      return false;
    }
    setErrors((prev) => ({ ...prev, otp: undefined }));
    return true;
  };

  const clearErrors = () => {
    setErrors({});
  };

  const clearError = (field: keyof ValidationErrors) => {
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  return {
    errors,
    validateEmail,
    validatePassword,
    validateConfirmPassword,
    validateName,
    validateOTP,
    clearErrors,
    clearError,
  };
};
