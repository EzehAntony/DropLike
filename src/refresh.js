import create from "zustand";

let refreshStore = create((set) => ({
  refresh: "",
  like: "",

  changeRefreshValue: (value) => {
    set((state) => ({
      refresh: value,
    }));
  },
  changeLikeValue: (value) => {
    set((state) => ({
      refresh: value,
    }));
  },
}));

export default refreshStore;
