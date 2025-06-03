import Home from "@/pages";
import About from "@/pages/About";
import Products from "@/pages/Products";
import AppLayout from "@/pages/Layout";
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import ProductDetails from "@/pages/ProductDetails";
import LoginIn from "@/pages/Login";
import SignUp from "@/pages/SignUp";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import CookieService from "@/services/CookieService";
import AdminDashboard from "@/pages/dashboard";
import DashboardLayout from "@/pages/dashboard/Layout";
import DashboardProductsTable from "@/pages/dashboard/DashboardProducts";
import ErrorHandler from "@/components/errors/ErrorHandler";
import PageNotFound from "@/pages/PageNotFound";

const token = CookieService.get("jwt");
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<AppLayout />} errorElement={<ErrorHandler />}>
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

      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="products" element={<DashboardProductsTable />} />
        <Route path="categories" element={<h1>Categories</h1>} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </>
  )
);
export default router;
