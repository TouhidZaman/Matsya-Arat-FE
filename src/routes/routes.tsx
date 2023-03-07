import { createBrowserRouter, Navigate } from "react-router-dom";
import AppLayout from "../layout/AppLayout";
import Login from "../pages/login/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import NotFound from "../components/NotFound";
import PrivateRoute from "../utils/PrivateRoute";
import AllBuyers from "../pages/buyers/AllBuyers";
import AllSellers from "../pages/sellers/AllSellers";
import AllSales from "../pages/AllSales";
import SellerInvoices from "../pages/seller-invoices/SellerInvoices";
import BuyerView from "../pages/buyer-view/BuyerView";
import BuyerSales from "../pages/buyer-view/BuyerSales";
import BuyerPayments from "../pages/buyer-view/BuyerPayments";
import AllPayments from "../pages/AllPayments";

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
        path: "/buyers/:buyerId",
        element: <BuyerView />,
        children: [
          {
            index: true,
            element: <Navigate to="sales" />,
          },
          {
            path: "sales",
            element: <BuyerSales />,
          },
          {
            path: "credit-payments",
            element: <BuyerPayments />,
          },
        ],
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
        path: "/all-payments",
        element: <AllPayments />,
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
