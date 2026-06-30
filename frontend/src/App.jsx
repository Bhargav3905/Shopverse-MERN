import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Contact from './pages/Contact'
import About from './pages/About'
import Layout from '../src/layouts/Layout'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import Shop from './pages/Shop'
import ManageProducts from './admin/ManageProducts'
import ProtectedRoute from './components/ProtectedRoute'
import UserRoute from './components/UserRoute'
import ProductDetail from './pages/ProductDetail'
import ManageCategories from './admin/ManageCategories'
import AddToCart from './pages/AddToCart'
import Profile from './pages/Profile'
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Orders from "./pages/Orders";
import Dashboard from "./admin/Dashboard";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <BrowserRouter>

      <Routes>
        <Route element={<Layout />} >
          <Route index element={<Home />} />

          <Route path="/about" element={
            <UserRoute>
              <About />
            </UserRoute>
          } />
          <Route path="/contact" element={
            <UserRoute>
              <Contact />
            </UserRoute>
          } />
          <Route path="/shop" element={
            <UserRoute>
              <Shop />
            </UserRoute>
          } />

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/shop/:id" element={<ProductDetail />} />

          <Route path="/add-to-cart" element={
            <UserRoute>
              <AddToCart />
            </UserRoute>
          } />
          <Route path="/orders" element={
            <UserRoute>
              <Orders />
            </UserRoute>
          } />

          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          <Route path="/manage-products" element={
            <ProtectedRoute allowedRoles={["admin"]} >
              <ManageProducts />
            </ProtectedRoute>
          } />

          <Route path="/manage-categories" element={
            <ProtectedRoute allowedRoles={["admin"]} >
              <ManageCategories />
            </ProtectedRoute>
          } />

          <Route path="/admin-dashboard" element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Dashboard />
            </ProtectedRoute>
          } />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>

    </BrowserRouter>
  )
}

export default App
