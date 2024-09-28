import { createRoutesFromElements, Route } from "react-router-dom";
import Login from "../views/auth/Login";
import AddProduct from "../views/dashboard/pages/AddProduct";
import Layout from "../layout/Layout";
import ProtectedRoutes from "./ProtectedRoutes";

const routes = createRoutesFromElements(
  <>
    <Route path="/" element={<Login />} />

    <Route
      path="/dashboard"
      element={
        <ProtectedRoutes>
          <Layout />
        </ProtectedRoutes>
      }
    >
      <Route path="add-product" element={<AddProduct />} />
    </Route>
  </>
);

export default routes;

/**
 * Yahaan par ProtectedRoute ke andar Layout component ko children ki tarah pass kiya gaya hai.
 * Agar user authenticated hai, toh ProtectedRoute component Layout ko render karega. Agar nahi hai,
 * toh wo login page par redirect karega.
 */