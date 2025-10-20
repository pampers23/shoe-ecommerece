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

export async function getUserProfile() {
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw new Error(error.message)
    const user = data.user;


    const firstName = user.user_metadata?.firstName || "";
    const lastName = user.user_metadata?.lastName || "";
    const phone = user.user_metadata?.phone || "";
    const address = user.user_metadata?.address || "";
    const profile_image = user.user_metadata?.profile_image || "";
    const email = user.email || "";
    
    return {
      id: user.id,
      name: `${firstName} ${lastName}`.trim(),
      email,
      phone,
      address,
      profile_image
    };
  } catch (error) {
    const err = error as AuthError;
    toast.error(err.message);
    throw err;
  }
}


export async function updateUserProfile(updates: { 
  email?: string; firstName?: string; lastName?: string; phone?: string; address?: string; profile_image?: string; 
}) {
  try {
    const { data, error } = await supabase
      .from('customers')
      .update({
        firstname: updates.firstName,
        lastname: updates.lastName,
        phone: updates.phone,
        address: updates.address,
        profile_image: updates.profile_image
      })
      .eq("email", updates.email)
      .select()
      .single();

      if (error) throw new Error(error.message);

    return data;
  } catch (error) {
    const err = error as AuthError;
    toast.error(err.message);
    throw err;
  }
}