import Home from "@/pages";
import { About } from "@/pages/About";
import Layout from "@/pages/Layout";
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
      </Route>
    </>
  )
);
export default router;
