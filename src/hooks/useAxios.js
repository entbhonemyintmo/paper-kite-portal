import axios from "axios";
import dayjs from "dayjs";
import { useRecoilState, useSetRecoilState } from "recoil";
import authAtom from "../recoil/auth";
import { useNavigate } from "react-router-dom";
import { withAlert } from "../recoil/snackbar";
import { jwtDecode } from "jwt-decode";

const baseURL = import.meta.env.VITE_APP_BACKEND_URL;
const useAxios = (props) => {
  const [auth, setAuth] = useRecoilState(authAtom);
  const openAlert = useSetRecoilState(withAlert);
  const navigate = useNavigate();

  const axiosInstance = axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${auth?.access_token}` },
    validateStatus: function (status) {
      return status <= 500;
    },
  });

  axiosInstance.interceptors.request.use(async (req) => {
    const user = jwtDecode(auth.access_token);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    if (!isExpired) return req;

    const res = await axios.post(
      `${baseURL}/auth/refresh`,
      {},
      {
        headers: {
          Authorization: `Bearer ${auth.refresh_token}`,
        },
        validateStatus: function (status) {
          return status <= 500;
        },
      }
    );

    if (res.status === 200) {
      localStorage.setItem("paper-kite", JSON.stringify(res.data));
      setAuth(res.data);
      req.headers.Authorization = `Bearer ${res.data.access_token}`;
    } else {
      setAuth(null);
      localStorage.removeItem("paper-kite");
      navigate("/");
    }
    return req;
  });

  axiosInstance.interceptors.response.use((res) => {
    if (res.config.method !== "get") {
      if (props?.autoSnackbar) {
        openAlert({
          status: res.status,
          detail:
            typeof res.data.message === "string"
              ? res.data.message
              : res.data.message[0],
        });
      }
    }
    return res;
  });

  return axiosInstance;
};

export default useAxios;
