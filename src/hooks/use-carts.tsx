import { createContext, useContext, useState, useEffect } from "react"

interface CartItem {
    id: number;
    name: string;
    price: number;
    image: string;
    color: string;
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    addItem: (item: Omit<CartItem, 'quantity'>) => void;
    removeItem: (id: number, color: string) => void;
    updateQuantity: (id: number, color: string, quantity: number) => void;
    getTotalPrice: () => number;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<CartItem[]>([]);


    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setItems(JSON.parse(savedCart));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(items));
    }, [items]);


    const addItem = (newItem: Omit<CartItem, 'quantity'>) => {
        setItems(prevItems => {
            const existingItem = prevItems.find(
                item => item.id === newItem.id && item.color === newItem.color
            );

            if (existingItem) {
                return prevItems.map(item => 
                    item.id === newItem.id && item.color === newItem.color
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevItems, { ...newItem, quantity: 1 }];
            }
        });
    };


    const removeItem = (id: number, color: string) => {
        setItems(prevItems => 
            prevItems.filter(item => !(item.id === id && item.color === color))
        );
    };

    const updateQuantity = (id: number, color: string, quantity: number) => {
        if (quantity <= 0) {
            removeItem(id, color);
            return
        }

        setItems(prevItems => 
            prevItems.map(item => 
                item.id === id && item.color === color
                    ? { ...item, quantity }
                    : item
            )
        );
    };

    const getTotalPrice = () => {
        return items.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const clearCart = () => {
        setItems([]);
    }
    
    return (
        <CartContext.Provider value={{
            items,
            addItem,
            removeItem,
            updateQuantity,
            getTotalPrice,
            clearCart
        }}
        >
            {children}
        </CartContext.Provider>
    )
}

export const UseCarts = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be within a CartProvider')
    }
    return context;
}
