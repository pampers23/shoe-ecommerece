import { supabase } from "@/lib/client";
import { AuthError } from "@supabase/supabase-js";
import type { LoginSchema, SignUpSchema } from "@/zod-schema";
import { toast } from "sonner";

export async function userSignUp({ firstName, lastName, email, password }:SignUpSchema ) {
    try {
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    firstName,
                    lastName,
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
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            throw new Error(error.message);
        }
    } catch (error) {
        const err = error as AuthError;
        toast.error(err.message);
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