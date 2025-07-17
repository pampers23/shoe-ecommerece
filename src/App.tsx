
import UserSessionContextProvider from "./context/user-session-context";
import { CartProvider } from "./hooks/use-carts";
import AppRoutes from "./lib/routes/app-routes";


const App = () => (
  <>
    <UserSessionContextProvider>
      <CartProvider>
        <AppRoutes />
      </CartProvider>
    </UserSessionContextProvider>
  </>
);

export default App;