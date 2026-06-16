import { useState } from 'react'
import Login from "./pages/login"
import Signup from './pages/signup'
import Landing from './pages/landing'
import Home from './pages/Home'
import Navbar from './components/navbar'
import Dashboard from './pages/Dashboard'
import BlogDetails from './pages/blogDetails'
import Write from './pages/Write'
import GetUserProfile from './pages/getUserProfile'
import Filter from './pages/filter'
import SearchUser from './pages/searchUser'
import UpdateProfile from './pages/UpdateProfile'
import About from './pages/About'
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate
} from 'react-router-dom'

function PublicLayout() {
  return (
    <>
      <Outlet />
    </>
  )
}

function AuthLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Signup /> },
      { path: "landing", element: <Landing /> }
    ]
  },
  {
    element: <AuthLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "home", element: <Home /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "blog/:blogId", element: <BlogDetails /> },
      { path: "write", element: <Write /> },
      { path: "user/:userid", element: <GetUserProfile /> },
      { path: "filter", element: <Filter /> },
      { path: "search_user", element: <SearchUser /> },
      { path: "update", element: <UpdateProfile /> },
      { path: "about", element: <About /> },
      { path: "*", element: <Navigate to="/" replace /> }
    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App