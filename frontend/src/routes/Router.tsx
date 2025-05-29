import Home from "@/pages";
import  About  from "@/pages/About";
import Products from "@/pages/Products";
import Layout from "@/pages/Layout";
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import ProductDetails from "@/pages/ProductDetails";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="products" element={<Products />} />
        <Route path="product/:slug" element={<ProductDetails />} />
      </Route>
    </>
  )
);
export default router;
