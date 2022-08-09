import create from "zustand";
import { persist } from "zustand/middleware";

let userStore = create(
  persist(
    (set) => ({
      user: [],
      addUser: (user) => {
        set((state) => ({
          user: [user],
        }));
      },
      registeredUser: [],
      addRegisteredUser: (registeredUser) => {
        set((state) => ({
          registeredUser: [registeredUser],
        }));
      },
    }),
    { name: "user store" }
  )
);

export default userStore;
