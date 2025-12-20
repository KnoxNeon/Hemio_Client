import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import MainDashboard from "../Pages/Dashboard/MainDashboard/MainDashboard";
import AddRequest from "../Pages/Dashboard/AddRequest/AddRequest";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import MyRequests from "../Pages/Dashboard/My Requests/MyRequests";
import Donate from "../Pages/Donate";
import PaymentSuccess from "../Pages/Payment/PaymentSuccess";
import { Search } from "lucide-react";
import SearchRequest from "../Pages/SearchRequest/SearchRequest";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
        {
           path: "/", 
           element: <Home/> 
        },
        {
           path: "/login", 
           element: <Login/> 
        },
        {
           path: "/register", 
           element: <Register/> 
        },
        {
           path: "/donate", 
           element: <PrivateRoute><Donate/></PrivateRoute>
        },
        {
           path: "/payment-success", 
           element: <PaymentSuccess/> 
        },
        {
           path: "/search", 
           element: <SearchRequest/> 
        },
      
    ],
  },
  {
   path:'/dashboard',
   element: <PrivateRoute><DashboardLayout/></PrivateRoute>,
   children: [
        {
           path: "main", 
           element: <MainDashboard/> 
        },
        {
           path: "add-request", 
           element: <AddRequest/> 
        },
        {
           path: "all-users", 
           element: <AllUsers/> 
        },
        {
           path: "my-requests", 
           element: <MyRequests/> 
        },
   ],
  }
])