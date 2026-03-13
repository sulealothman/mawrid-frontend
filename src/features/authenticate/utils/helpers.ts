import { AxiosError } from "axios";
import { UserStore } from "@/features/users/store/User";

const { resetUser } = UserStore.getState();

export const getUserFirstName = (fullName?: string): string => {
  if (!fullName) return "";
  return fullName.trim().split(" ")[0];
};

export const handleAuthenticationExpired = (error: unknown): void => {
  if (
    error instanceof AxiosError &&
    error.response?.status === 401 &&
    error.response?.data?.message === "Unauthenticated."
  ) {
    resetUser();
    window.location.href = "/authenticate";
  }
};
