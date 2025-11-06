
export type Product = {
    id: number;
    name: string;
    price: number;
    image_url: string;
    category: string;
    rating: number;
}

export type ProductDetail = {
    id: number;
    name: string;
    price: number;
    description: string;
    image_url: string;
    category: string;
    brand: string;
    stock: number;
    sizes: string[];
 }

export type OrderItem = {
    id: string;
    quantity: number;
    price: number;
}

export type CreateOrder = {
    customer_id: string;
    payment_method: string;
    total_amount: number;
    shipping_address: string;
    items: OrderItem[];
}