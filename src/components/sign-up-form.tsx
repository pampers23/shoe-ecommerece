import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link } from "react-router-dom"
import MaxWidthWrapper from "./max-width-wrapper"
import { useMutation } from "@tanstack/react-query";
import { userSignUp } from "@/actions/auth"
import { useForm } from "react-hook-form"
import { type SignUpSchema, signUpSchema } from "@/zod-schema"
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { PasswordInput } from "./ui/password-input"
import { DotPulse } from "ldrs/react";
import { useNavigate } from "react-router-dom";


function SignUpForm() {
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: userSignUp,
    onSuccess: () => {
      navigate("/index", { replace: true });
    }
  });
  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  })

  function onSubmit(values: SignUpSchema) {
    mutate({ ...values })
  }


  return (
    <MaxWidthWrapper className="h-full w-full max-w-2xl flex items-center justify-center">
      <Card className="border-none shadow-none w-full max-w-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Shoe Shop Sign Up
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-6">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your first name" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your last name" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your phone number" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />  

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your address" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email address</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your email address" autoComplete="email" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <PasswordInput placeholder="Enter your password" autoComplete="new-password" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <PasswordInput placeholder="Re-enter your password" autoComplete="new-password" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Button disabled={isPending} type="submit" className="w-full gap-2">
                  {isPending ? (
                    <>
                      Submitting
                      <DotPulse size="30" speed="1.3" color="white" />
                    </>
                  ) : (
                    "Sign Up"
                  )
                
                }
                </Button>

              </div>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="underline underline-offset-2">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </MaxWidthWrapper>
  )
}

export default SignUpForm;