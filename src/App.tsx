// import Cart from "./components/cart"
import { CartProvider } from "./hooks/use-carts"
// import Footer from "./components/footer"
import Header from "./components/header"
import Hero from "./components/hero"



function App() {
  

  return (
    <>
    <CartProvider>
    {/* <Cart /> */}
      <Header />
      <Hero />
    </CartProvider>
    {/* <Footer /> */}
    
    </>
  )
}

export default App
