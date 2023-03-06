import { atom } from "recoil";

export const widthSize = atom({
  key: "widthSize",
  default: window.innerWidth,
});
