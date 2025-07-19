import { supabase } from "@/lib/client";
import { AuthError } from "@supabase/supabase-js";
import { toast } from "sonner";

export async function getProductsShoes() {
    try {
        const { data, error } = await supabase
            .from('products')
            .select('*')

        if (error) {
            throw new Error(error.message);
        }

        return data;
    } catch (error) {
        const err = error as AuthError;
        toast.error(err.message);
        throw err;
    }
}