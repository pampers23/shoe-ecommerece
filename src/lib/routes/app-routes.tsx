import UnauthenticatedGuard from "@/components/auth/unauthenticated-guard";
import Login from "@/pages/public/login";
import SignUp from "@/pages/public/sign-up";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <UnauthenticatedGuard>
              <Navigate to={"/login"} />
            </UnauthenticatedGuard>
          }
        />
        <Route
          path="/login"
          element={
            <UnauthenticatedGuard>
              <Login />
            </UnauthenticatedGuard>
          }
        />
        <Route
          path="/sign-up"
          element={
            <UnauthenticatedGuard>
              <SignUp />
            </UnauthenticatedGuard>
          }        
        />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
