import "../style/_common.scss";

import { Outlet, Route, Routes } from "react-router-dom";

import ChangePassword from "../pages/ChangePassword";
import CreateItem from "../pages/Product/Create";
import CreateUser from "../pages/User/Create";
import DefaultLayout from "../layout/DefaultLayout";
import Home from "../pages/Home";
import Order from "../pages/Order";
import Product from "../pages/Product/index";
import Profile from "../pages/Profile";
import { ProtectedRoute } from "./ProtectedRoute";
import User from "../pages/User/index";

export default function RouterRoute() {
  const routes = [
    { path: "home", name: "Home", element: Home },
    { path: "profile", name: "Profile", element: Profile },
    {
      path: "change_password",
      name: "ChangePassword",
      element: ChangePassword,
    },
    { path: "order", name: "Order", element: Order },
    {
      path: "user",
      name: "User",
      element: Outlet,
      children: [
        { path: "", name: "User", element: User },
        { path: "create", name: "Home", element: CreateUser },
      ],
    },
    {
      path: "product",
      name: "Prodcut",
      element: Outlet,
      children: [
        { path: "", name: "Item", element: Product },
        { path: "create", name: "CreateItem", element: CreateItem },
      ],
    },
  ];
  return (
    <ProtectedRoute>
      <DefaultLayout>
        <Routes>
          {routes.map(
            (route, idx) =>
              route.element && (
                <Route key={idx} path={route.path} element={<route.element />}>
                  {route.children &&
                    route.children.map(
                      (childRoute, childIdx) =>
                        childRoute.element && (
                          <Route
                            key={childIdx}
                            path={childRoute.path}
                            element={<childRoute.element />}
                          />
                        )
                    )}
                </Route>
              )
          )}
        </Routes>
      </DefaultLayout>
    </ProtectedRoute>
  );
}
