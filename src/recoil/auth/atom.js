import { atom } from "recoil";

const authAtom = atom({
  key: "authAtom",
  default: localStorage.getItem("paper-kite")
    ? JSON.parse(localStorage.getItem("paper-kite"))
    : null,
});

export default authAtom;
