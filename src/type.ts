
export type Product = {
    id: number;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    category: string;
    isOnSale?: boolean;
    rating: number;
    colors: string;
}