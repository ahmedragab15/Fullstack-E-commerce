import Home from "@/pages";
import About from "@/pages/About";
import Products from "@/pages/Products";
import Layout from "@/pages/Layout";
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import ProductDetails from "@/pages/ProductDetails";
import LoginIn from "@/pages/Login";
import SignUp from "@/pages/SignUp";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import CookieService from "@/services/CookieService";

const token = CookieService.get("jwt");
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="products" element={<Products />} />
        <Route path="product/:slug" element={<ProductDetails />} />
        <Route
          path="login"
          element={
            <ProtectedRoute isAllowed={!token} redirectPath="/" data={token}>
              <LoginIn />
            </ProtectedRoute>
          }
        />
        <Route
          path="sign"
          element={
            <ProtectedRoute isAllowed={!token} redirectPath="/" data={token}>
              <SignUp />
            </ProtectedRoute>
          }
        />
      </Route>
    </>
  )
);
export default router;
