import { createBrowserRouter, Navigate } from "react-router-dom";
import AppLayout from "../layout/AppLayout";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import NotFound from "../components/NotFound";
import PrivateRoute from "../utils/PrivateRoute";
import AllBuyers from "../pages/buyers/AllBuyers";
import AllSellers from "../pages/sellers/AllSellers";
import AllSales from "../pages/sales/AllSales";
import SellerInvoices from "../pages/seller-invoices/SellerInvoices";

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <AppLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/",
        element: <Navigate to="/dashboard" />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/buyers",
        element: <AllBuyers />,
      },
      {
        path: "/sellers",
        element: <AllSellers />,
      },
      {
        path: "/sellers/:sellerId",
        element: <SellerInvoices />,
      },
      {
        path: "/all-sales",
        element: <AllSales />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default routes;
