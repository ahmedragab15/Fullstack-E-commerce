import Home from "@/pages";
import About from "@/pages/About";
import Products from "@/pages/Products";
import AppLayout from "@/pages/Layout";
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import ProductDetails from "@/pages/ProductDetails";
import LoginIn from "@/pages/Login";
import Register from "@/pages/Register";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import CookieService from "@/services/CookieService";
import AdminDashboard from "@/pages/dashboard";
import DashboardLayout from "@/pages/dashboard/Layout";
import DashboardProductsTable from "@/pages/dashboard/DashboardProducts";
import ErrorHandler from "@/components/errors/ErrorHandler";
import PageNotFound from "@/pages/PageNotFound";
import DashboardCategories from "@/pages/dashboard/DashboardCategories";

const token = CookieService.get("jwt");
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} errorElement={<ErrorHandler />} />
        <Route path="about" element={<About />} errorElement={<ErrorHandler />} />
        <Route path="products" element={<Products />} errorElement={<ErrorHandler />} />
        <Route path="product/:slug" element={<ProductDetails />} errorElement={<ErrorHandler />} />
        <Route
          path="login"
          element={
            <ProtectedRoute isAllowed={!token} redirectPath="/" data={token}>
              <LoginIn />
            </ProtectedRoute>
          }
          errorElement={<ErrorHandler />}
        />
        <Route
          path="register"
          element={
            <ProtectedRoute isAllowed={!token} redirectPath="/" data={token}>
              <Register />
            </ProtectedRoute>
          }
          errorElement={<ErrorHandler />}
        />
      </Route>

      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<AdminDashboard />} errorElement={<ErrorHandler />} />
        <Route path="products" element={<DashboardProductsTable />} errorElement={<ErrorHandler />} />
        <Route path="categories" element={<DashboardCategories />} errorElement={<ErrorHandler />} />
      </Route>
      <Route path="*" element={<PageNotFound />} errorElement={<ErrorHandler />} />
    </>
  )
);
export default router;
