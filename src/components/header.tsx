import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu, ShoppingCart, Search, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { UseCarts } from '@/hooks/use-carts';
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { items } = UseCarts();
    const navigate = useNavigate();
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);


  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            {/* logo */}
            <div className="flex items-center space-x-4">
                <h1 className="text-2xl font-bold text-primary cursor-pointer" onClick={() => navigate('/')}>
                    Shoe Ecommerce
                </h1>
            </div>

            {/* desktop nav */}
            <nav className="hidden md:flex items-center space-x-6">
                <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Men</a>
                <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Women</a>
                <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Kids</a>
                <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Sale</a>
            </nav>

            {/* search bar */}
            <div className="hidden md:flex items-center space-x-2 flex-1 max-w-sm mx-8">
                <div className="relative w-full">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search"
                        className="pl-10"
                    />
                </div>
            </div>

            {/* actions */}
            <div className="flex items-center space-x-4">
                <Button
                    variant="ghost"
                    size="icon"
                    className="hidden md:flex"
                    onClick={() => navigate('/profile')}
                >
                    <User className="h-5 w-5" />
                </Button>

                <Button
                    variant="ghost"
                    size="icon"
                    className="relative"
                    onClick={() => navigate('/cart')}
                >
                    <ShoppingCart className="h-5 w-5" />
                    {itemCount > 0 && (
                        <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center text-xs">
                            {itemCount}
                        </Badge>
                    )}
                </Button>


                {/* mobile menu */}
                <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="md:hidden">
                            <Menu className="h-5 w-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <SheetHeader>
                            <SheetTitle>Menu</SheetTitle>
                        </SheetHeader>
                        <nav className="flex flex-col space-y-4 mt-6">
                            <a href="#" className="text-lg font-medium hover:text-primary transition-colors">Men</a>
                            <a href="#" className="text-lg font-medium hover:text-primary transition-colors">Women</a>
                            <a href="#" className="text-lg font-medium hover:text-primary transition-colors">Kids</a>
                            <a href="#" className="text-lg font-medium hover:text-primary transition-colors">Sale</a>
                            <Button
                                variant="ghost"
                                className="justify-start p-0 h-auto text-lg font-medium hover:text-primary"
                                onClick={() => {
                                    navigate('/profile');
                                    setIsMenuOpen(false);
                                }}
                            >
                              Profile  
                            </Button>
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    </header>
  )
}

export default Header
