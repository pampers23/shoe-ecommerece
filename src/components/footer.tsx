import { Separator } from "@/components/ui/separator"
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <div className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-8">
          {/* brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Shoe Ecommerce</h3>
            <p className="text-slate-300">
              Premium footwear for every step of your journey. Quality, comfort and style in every pair.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-slate-400 hover:text-white cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-slate-400 hover:text-white cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-slate-400 hover:text-white cursor-pointer transition-colors"/>
              <Youtube className="h-5 w-5 text-slate-400 hover:text-white cursor-pointer transition-colors"/>
            </div>
          </div>

          {/* shop */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Shop</h4>
            <ul className="space-y-2 text-slate-300">
              <li><a href="#" className="hover:text-white transition-colors">Men's Shoes</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Women's Shoes</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Kids' Shoes</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Sale</a></li>
              <li><a href="#" className="hover:text-white transition-colors">New Arrivals</a></li>
            </ul>
          </div>

          {/* support */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Support</h4>
            <ul className="space-y-2 text-slate-300">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* company */}
          <Separator className="my-8 bg-slate-700"/>

          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-slate-400 text-sm">
               © 2024 Shoe Ecommerce. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-slate-400">
              <span>🔒 Secure Checkout</span>
              <span>🚚 Free Shipping</span>
              <span>↩️ Easy Returns</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
