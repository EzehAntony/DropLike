import create from "zustand";
import { persist } from "zustand/middleware";

let userStore = create(
  persist(
    (set) => ({
      user: {},
      addUser: (user) => {
        set(() => ({
          user: user,
        }));
      },
    }),
    { name: "user store" }
  )
);

export default userStore;
