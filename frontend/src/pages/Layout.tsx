import CartDrawer from "@/components/CartDrawer";
import Navbar from "@/components/layout/Navbar";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <>
      <Navbar />
      <CartDrawer />
      <Outlet />
    </>
  );
};

export default AppLayout;
