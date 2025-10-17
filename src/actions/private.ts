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


export async function getProductById(id: number) {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw new Error(error.message);

    let imageUrl = data.image_url;

    // Only call getPublicUrl() if it's NOT already a full URL
    if (!imageUrl.startsWith('http')) {
      const { data: publicUrl } = supabase
        .storage
        .from('product-images')
        .getPublicUrl(imageUrl);

      imageUrl = publicUrl.publicUrl;
    }

    return { ...data, image_url: imageUrl };
  } catch (error) {
    const err = error as AuthError;
    toast.error(err.message);
    throw err;
  }
}

