import AuthGuard from "@/components/auth/auth-guard";
import UnauthenticatedGuard from "@/components/auth/unauthenticated-guard";
import Cart from "@/components/cart";
import Index from "@/pages/private";
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

        {/* Customer Side */}
          <Route
            path="/index"
            element={
              <AuthGuard>
                <Index />
              </AuthGuard>
            }
          />

          <Route
            path="/cart"
            element={
              <AuthGuard>
                <Cart />
              </AuthGuard>
            }
          />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
