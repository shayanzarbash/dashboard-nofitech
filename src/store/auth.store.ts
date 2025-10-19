import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {IAuthState, IUser} from "./libraries/auth-type.ts";

export const useAuthStore = create<IAuthState>()(
  persist(
    (set) => ({
      user: null,
      login: (user: IUser) => {
        set({ user });
      },
      logout: () => {
        set({ user: null });
        localStorage.removeItem("authToken");
      },
    }),
    {
      name: "auth-store",
    }
  )
);
