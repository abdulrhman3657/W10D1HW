import { createBrowserRouter, RouterProvider, Outlet } from "react-router"
import Home from "../pages/Home"
import Navbar from "../components/Navbar"
import Signin from "../pages/Signin"
import Signup from "../pages/Signup"

const LayOut = () => {
  return(
    <>
        <Navbar/>
        <Outlet/>
    </>
  )
}

const router = createBrowserRouter([
  {
    path: "/", element: <LayOut/>,
      children: [
        {path: "/", element: <Home/>},
        {path: "signin", element: <Signin/>},
        {path: "signup", element: <Signup/>}
      ]
  }
])

function Router() {
  return (
    <RouterProvider router={router}/>
  )
}

export default Router