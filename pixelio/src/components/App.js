import { useEffect, lazy } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";

import { Layout } from "./Layout";
import { PrivateRoute } from "./PrivateRoute";
import { RestrictedRoute } from "./RestrictedRoute";
import { refreshUser } from "../redux/auth/operations";
import { useAuth } from "../hooks/useAuth";

const HomePage = lazy(() => import("../pages/Home"));
const RegisterPage = lazy(() => import("../pages/Register"));
const LoginPage = lazy(() => import("../pages/Login"));
const YourMatrixPage = lazy(() => import("../pages/YourMatrix"));
const AddNewMatrices = lazy(() => import("../pages/AddNewMatrix"));
const MatrixViewPage = lazy(() => import("../pages/MatrixDetails"));

export const App = () => {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <b>Refreshing user...</b>
  ) : (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route
          path="/register"
          element={
            <RestrictedRoute
              redirectTo="/yourmatrix"
              component={<RegisterPage />}
            />
          }
        />
        <Route
          path="/login"
          element={
            <RestrictedRoute
              redirectTo="/yourmatrix"
              component={<LoginPage />}
            />
          }
        />
        <Route
          exact
          path="/yourmatrix"
          element={
            <PrivateRoute redirectTo="/login" component={<YourMatrixPage />} />
          }
        />
        <Route
          path="/matrix/:matrixId"
          element={
            <PrivateRoute redirectTo="/login" component={<MatrixViewPage />} />
          }
        />
        <Route
          path="/add-matrix"
          element={
            <PrivateRoute redirectTo="/login" component={<AddNewMatrices />} />
          }
        />
      </Route>
    </Routes>
  );
};
