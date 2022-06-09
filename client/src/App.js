import React from "react"
import { Routes, Route } from "react-router-dom"
import { useDispatch } from "react-redux"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import Home from "./pages/Home"
import Register from "./pages/auth/Register"
import Login from "./pages/auth/Login"
import HomeAdmin from "./pages/admin/Home"
import ManageAdmin from "./pages/admin/ManageAdmin"
import HomeUser from "./pages/user/Home"
import AdminRoute from "./routes/AdminRoute"
import UserRoute from "./routes/UserRoute"
import { currentUser } from "./api/auth"
import Navbar from "./layouts/Navbar"

const App = () => {
  const dispatch = useDispatch()
  const idToken = localStorage.token

  if (idToken) {
    currentUser(idToken)
      .then((res) => {
        dispatch({
          type: "LOGIN",
          payload: {
            token: idToken,
            username: res.data.username,
            role: res.data.role,
          },
        })
      })
      .catch((error) => console.log(error))
  }

  return (
    <div className="App">
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <HomeAdmin />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/manage-admin"
          element={
            <AdminRoute>
              <ManageAdmin />
            </AdminRoute>
          }
        />
        <Route
          path="/user"
          element={
            <UserRoute>
              <HomeUser />
            </UserRoute>
          }
        />
      </Routes>
    </div>
  )
}

export default App
