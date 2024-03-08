import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Login from "../pages/Login";
import PrivateRoute from "../hocs/PrivateRoute";
import Layout from "../Layout";
import Batches from "../pages/Batches";
import ApiLogs from "../pages/ApiLogs";
import Send from "../pages/Send";
import BatchDetail from "../pages/BatchDetail";

const Router = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Login />} />
        <Route element={<PrivateRoute component={Layout} />}>
          <Route path="send" element={<Send />} />
          <Route path="batches" element={<Batches />} />
          <Route path="detail" element={<BatchDetail />} />
          <Route path="api-logs" element={<ApiLogs />} />
        </Route>
        <Route path="*" element={<Navigate to="send" replace />} />
      </>
    )
  );
  return <RouterProvider router={router} />;
};

export default Router;
