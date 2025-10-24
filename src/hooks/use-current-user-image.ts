import { useEffect, useState } from "react"
import { supabase } from "@/lib/client"

export const useCurrentUserImage = () => {
  const [image, setImage] = useState<string | null>(null)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setImage(user?.user_metadata?.avatar_url ?? null)
    }
    getUser()
  }, [])

  return image
}