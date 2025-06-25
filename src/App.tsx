// import Cart from "./components/cart"
import Index from "./assets/pages"
import { CartProvider } from "./hooks/use-carts"
// import Footer from "./components/footer"




function App() {
  

  return (
    <>
    <CartProvider>
      <Index />
    </CartProvider>
    {/* <Footer /> */}
    
    </>
  )
}

export default App
