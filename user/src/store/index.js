import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const cart = atom({
  key: "cart",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
