import { supabase } from "@/lib/client";
import { AuthError } from "@supabase/supabase-js";
import type { loginSchema, SignupSchema } from "@/zod-schema";
import { toast } from "sonner";

export async function userSignUp({ firstName, lastName, email, password }:SignupSchema ) {
    try {
        const { error } = await supabase.auth.signUp({
            options: {
                data: {
                    firstName,
                    lastName,
                },
            },
            email,
            password
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

export async function userLogin({ email, password }: loginSchema) {
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