// import Cart from "./components/cart"
// import Index from "./assets/pages"
import NotFound from "./assets/pages/not-found"
import { CartProvider } from "./hooks/use-carts"
// import Footer from "./components/footer"




function App() {
  

  return (
    <>
    <CartProvider>
      {/* <Index /> */}
      <NotFound />
    </CartProvider>
    {/* <Footer /> */}
    
    </>
  )
}

export default App
