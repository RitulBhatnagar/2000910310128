import React from 'react'
import Home from "./pages/Home/Home"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import {useEffect} from "react";
import Forgot from './pages/auth/Forgot'
import Reset from "./pages/auth/Reset"
import Layout from './components/layout/Layout'
import Dashboard from "./pages/dashboard/Dashboard"
import Sidebar from './components/sidebar/Sidebar'
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"
import { useDispatch } from 'react-redux'
import { getLoginStatus } from './services/authServices'
import EditProduct from "./pages/editProduct/EditProduct"
import { SET_LOGIN } from './redux/features/auth/authSlice'
import Contact from "./pages/contact/Contact"
import AddProduct from './pages/addProduct/AddProduct'
import ProductDetail from './components/productDetail/ProductDetail'
import EditProfile from './pages/profile/EditProfile'
import Profile from "./pages/profile/Profile"
axios.defaults.withCredentials = true;
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
     async function loginStatus(){
        const status = await getLoginStatus();
        dispatch(SET_LOGIN(status));
     }
     loginStatus();
  }, [dispatch])
  return (
    <BrowserRouter>
    <ToastContainer
  position="bottom-center"
  autoClose={2000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="dark"
    />
    <Routes>
      <Route path = "/" element = {<Home/>}/>
      <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register />}/>
        <Route path = "/forgot" element = {<Forgot/>}/>
        <Route path="/resetpassword/:resetToken" element={<Reset />} />
        <Route path = "/dashboard" element = {
          <Sidebar>
          <Layout>
            <Dashboard/>
          </Layout>
          </Sidebar>
        }/>
          <Route
          path="/add-product"
          element={
            <Sidebar>
              <Layout>
                <AddProduct />
              </Layout>
            </Sidebar>
          }
        />
        <Route
          path="/contact-us"
          element={
            <Sidebar>
              <Layout>
                <Contact />
              </Layout>
            </Sidebar>
          }
        />
           <Route
          path="/product-detail/:id"
          element={
            <Sidebar>
              <Layout>
                <ProductDetail />
              </Layout>
            </Sidebar>
          }
        />
         <Route
          path="/edit-product/:id"
          element={
            <Sidebar>
              <Layout>
                <EditProduct />
              </Layout>
            </Sidebar>
          }
        />
           <Route
          path="/profile"
          element={
            <Sidebar>
              <Layout>
                <Profile />
              </Layout>
            </Sidebar>
          }
        />
      <Route
          path="/edit-profile"
          element={
            <Sidebar>
              <Layout>
                <EditProfile />
              </Layout>
            </Sidebar>
          }
        />
    </Routes>
    </BrowserRouter>
  )
}

export default App