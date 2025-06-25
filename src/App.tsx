// import Cart from "./components/cart"
import { CartProvider } from "./hooks/use-carts"
// import Footer from "./components/footer"
import Header from "./components/header"



function App() {
  

  return (
    <>
    <CartProvider>
    {/* <Cart /> */}
    <Header />
    </CartProvider>
    {/* <Footer /> */}
    
    </>
  )
}

export default App
