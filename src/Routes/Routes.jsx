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
import AvailableRequests from "../Pages/Dashboard/AvailableRequests/AvailableRequests";
import Donate from "../Pages/Donate";
import PaymentSuccess from "../Pages/Payment/PaymentSuccess";
import { Search } from "lucide-react";
import SearchRequest from "../Pages/SearchRequest/SearchRequest";
import MyProfile from "../Pages/Dashboard/My Profile/MyProfile";
import AllRequests from "../Pages/Dashboard/AllRequests/AllRequests";
import RequestCard from "../Components/RequestCard";

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
           path: "/search-requests", 
           element: <SearchRequest/> 
        },
        {
           path: "/public-requests", 
           element: <RequestCard/> 
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
           path: "available-requests", 
           element: <AvailableRequests/> 
        },
        {
           path: "my-requests", 
           element: <MyRequests/> 
        },
        {
           path: "all-users", 
           element: <AllUsers/> 
        },
        {
           path: "my-profile", 
           element: <MyProfile/> 
        },
        {
           path: "all-requests", 
           element: <AllRequests/> 
        },
   ],
  }
])