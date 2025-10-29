import { supabase } from "@/lib/client";
import { AuthError } from "@supabase/supabase-js";
import type { LoginSchema, SignUpSchema } from "@/zod-schema";
import { toast } from "sonner";

export async function userSignUp({ firstName, lastName, phone, address, email, password }:SignUpSchema ) {
    try {
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    firstName,
                    lastName,
                    phone,
                    address
                },
            },
        });

        if (error) {
            throw new Error(error.message);
        }

        toast.success("Email verification has been sent!", {
            description: "Please check your email to confirm your account"
        })
    } catch (error) {
        const err = error as AuthError;
        toast.error(err.message)
    }
}

export async function userLogin({ email, password }: LoginSchema) {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

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

export async function userLogout() {
    try {
        const { error } = await supabase.auth.signOut();

        if (error) {
            throw new Error(error.message)
        }
    } catch (error) {
        const err = error as AuthError;
        toast.error(err.message)
    }
}

export async function sendPasswordResetLink({ email }: { email: string }) {
  try {
    const { data, error: fetchUserError } = await supabase
      .from("registered_users")
      .select("email")
      .eq("email", email)
      .limit(1);

    if (fetchUserError) {
      throw new Error(fetchUserError.message);
    }

    if (!data || !data.length) {
      throw new Error("No account found with that email");
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
      throw new Error(error.message);
    }

    toast.success("Password reset link has been sent!", {
      description: "Please check your email to continue",
    });
  } catch (error) {
    const err = error as AuthError;
    toast.error(err.message);
  }
}

export async function LoginwithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
            redirectTo: "http://localhost:5173"
        },
    });

    return data;        
    if (error) {
        const err = error as AuthError;
        toast.error(err.message)
    }
}