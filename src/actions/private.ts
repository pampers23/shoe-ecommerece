import { supabase } from "@/lib/client";
import { type User, AuthError } from "@supabase/supabase-js";
import { toast } from "sonner";
import { uploadProfileImage } from "./upload-image";
import type { CreateOrder } from "@/type";

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
    if (error) throw new Error(error.message);
    const user = data.user;

    const authProfile = {
      id: user.id,
      email: user.email || "",
      name: `${user.user_metadata?.firstName || ""} ${user.user_metadata?.lastName || ""}`.trim() ||
            user.user_metadata?.full_name || "",
      profile_image: getUserAvatar(user),
      avatar_url: user.user_metadata?.avatar_url || null,
    };

    const { data: customer } = await supabase
      .from("customers")
      .select("firstname, lastname, phone, address, profile_image")
      .eq("id", user.id)
      .single();

    const fullName = 
      customer?.firstname || customer?.lastname
        ? `${customer.firstname || ""} ${customer.lastname || ""}`.trim()
        : authProfile.name

    return { 
      ...authProfile, 
      name: fullName,
      phone: customer?.phone || "",
      address: customer?.address || "",
      profile_image: customer?.profile_image || authProfile.profile_image
    };
  } catch (error) {
    const err = error as AuthError;
    toast.error(err.message);
    throw err;
  }
}

export function getUserAvatar(user: User) {

  const fromMetadata =
    user.user_metadata?.avatar_url ||
    user.user_metadata?.profile_image ||
    user.user_metadata?.picture ||
    null;

  const fromIdentity =
    user.identities?.[0]?.identity_data?.avatar_url ||
    user.identities?.[0]?.identity_data?.picture ||
    null;

  const fallback = "/default-avatar.png";

  return fromMetadata || fromIdentity || fallback;
}



export async function updateUserProfile(updates: { 
  userId: string; email?: string; firstName?: string; lastName?: string; phone?: string; address?: string; profile_image?: string}) {
  try {
    console.log("Updating customer w/ data: ", updates.userId);
    
    const { data, error } = await supabase
      .from('customers')
      .update({
        firstname: updates.firstName,
        lastname: updates.lastName,
        phone: updates.phone,
        address: updates.address,
        profile_image: updates.profile_image
      })
      .eq("id", updates.userId)
      .select()
      .single();

      if (error) throw new Error(error.message);
      if (!data) console.warn("No matched");

      console.log("Response: ", {data, error});
      

    return data;
  } catch (error) {
    const err = error as AuthError;
    toast.error(err.message);
    throw err;
  }
}


export async function handleGoogleLogin(){
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: "http://localhost:5173",
    },
  });

  return data;
  if (error) {
    console.error("Google sign-in error:", error);
  }
};

export async function updateUserProfileImage(file: File, userId: string) {
  try {
    const uploadImageUrl = await uploadProfileImage(file);

    const { error } = await supabase
      .from("customers")
      .update({ profile_image: uploadImageUrl })
      .eq("id", userId);

    if (error) throw new Error(error.message);

    const { error: authError } = await supabase.auth.updateUser({
      data: { profile_image: uploadImageUrl },
    })

    if (authError) throw new Error(authError.message);
    

  } catch (error) {
    const err = error as AuthError;
    toast.error(err.message);
    throw err;  
  }
}

export async function createOrder(orderData: CreateOrder) {
  try {
    const { customer_id, payment_method, total_amount, shipping_address, items } = orderData;
    
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert([
        {
          customer_id,
          payment_method,
          total_amount,
          status: payment_method === "cod" ? "pending" : "completed",
          shipping_address,
        },
      ])
      .select()
      .single();

    if (orderError) {
      console.error("❌ Supabase order insert error details:", orderError);
      throw new Error(orderError.message);
    }

    const orderItems = items.map((item) => ({
      order_id: order.id,
      product_id: item.id, // Keep as number
      quantity: item.quantity,
      price: item.price,
    }));

    console.log("🧾 Inserting order items:", orderItems);

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItems);

    if (itemsError) {
      console.error("❌ Order items insert error:", itemsError);
      throw new Error(itemsError.message);
    }

    for (const item of items) {
      const { error: stockError } = await supabase.rpc('decrease_stock', {
        product_id: item.id,
        quantity: item.quantity,
      });

      if (stockError) {
        console.error("❌ Stock update error:", stockError);
        toast.error("Failed to update stock for product ID " + item.id);
      }
    }

    toast.success("Order created successfully!");
    return order;
  } catch (error) {
    const err = error as AuthError;
    toast.error(err.message);
    throw err;
  }
}

export async function createOrderWithUser({
  paymentMethod,
  totalAmount,
  address,
  items,
}: {
  paymentMethod: string;
  totalAmount: number;
  address: string;
  items: { id: number; quantity: number; price: number }[];
}) {
  try {
    const { data, error } = await supabase.auth.getUser();

    if (error || !data?.user) {
      toast.error("Please log in to complete your order");
      return;
    }

    const orderPayload = {
      customer_id: data.user.id,
      payment_method: paymentMethod,
      total_amount: totalAmount,
      shipping_address: address?.trim() || "Not Provided",
      items: items, // Don't transform - keep as numbers
    };

    const response = await createOrder(orderPayload);
    return response;
  } catch (error) {
    const err = error as AuthError;
    toast.error(err.message || "An unexpected error occurred");
    throw err;
  }
}