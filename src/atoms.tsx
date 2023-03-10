import { atom } from "recoil";
import { IKakaoData } from "./socialLogin";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

export const widthSize = atom({
  key: "widthSize",
  default: window.innerWidth,
});

export const loginState = atom({
  key: "isLoggedIn",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const UserData = atom<IKakaoData>({
  key: "UserData",
  default: {
    id: 0,
    kakao_account: { email: "", gender: true },
    properties: {
      nickname: "",
      profile_image: "",
      thumbnail_image: "",
    },
  },
  effects_UNSTABLE: [persistAtom],
});
