
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