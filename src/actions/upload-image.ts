import { supabase } from "@/lib/client";

export async function uploadProfileImage(file: File) {
  const filePath = `${Date.now()}-${file.name}`;

  const { error: uploadError } = await supabase.storage
    .from("profile-images")
    .upload(filePath, file, { upsert: true });

  if (uploadError) throw new Error(uploadError.message);

  const { data } = supabase.storage
    .from("profile-images")
    .getPublicUrl(filePath);

  return data.publicUrl;
}
