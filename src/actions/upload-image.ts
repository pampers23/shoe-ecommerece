import { supabase } from "@/lib/client";

export async function uploadProfileImage(file: File) {
    const filePath = `${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
        .from('profile-images')
        .upload(filePath, file);

    if (error) throw new Error(error.message);

    const { data: publicUrl } = 
        supabase.storage.from('profile-images').getPublicUrl(filePath);

    return publicUrl.publicUrl;
}