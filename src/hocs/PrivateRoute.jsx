import { Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import authAtom from "../recoil/auth";

function PrivateRoute({ component: Component }) {
  const auth = useRecoilValue(authAtom);
  if (auth) {
    return <Component />;
  } else {
    return <Navigate to="/" replace />;
  }
}

export default PrivateRoute;
