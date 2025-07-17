import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import MaxWidthWrapper from "./max-width-wrapper"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form"
import { PasswordInput } from "./ui/password-input"
import { userLogin } from "@/actions/auth"
import { useForm } from "react-hook-form"
import { loginSchema, type LoginSchema } from "@/zod-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import { DotPulse } from "ldrs/react"
import { useNavigate } from "react-router-dom";


function LoginForm(){
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: userLogin,
    onSuccess: (data) => {
      console.log('Login successful', data?.session);
      navigate("/", { replace: true });
    }
  });

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  function onSubmit(values: LoginSchema) {
    mutate({ ...values })
  }

  return (
    <MaxWidthWrapper className="h-full w-full max-w-2xl flex items-center justify-center">
      <Card className="border-none shadow-none w-full max-w-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Shoe Shop Login
          </CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel htmlFor="email">Email Address</FormLabel>
                    <FormControl>
                      <Input 
                        id="email"
                        placeholder="Enter your email"
                        type="email"
                        autoComplete="email"
                        autoFocus
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <div className="flex justify-between items-center">
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <Link to="/forgot-password" className="text-sm underline underline-offset-2">
                        Forgot Password?
                      </Link>
                    </div>
                    <FormControl>
                      <PasswordInput
                        id="password"
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button disabled={isPending} className="w-full gap-2" type="submit">
                {isPending ? (
                  <>
                    Logging in...
                    <DotPulse size="30" speed="1.3" color="white" />
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </form>
          </Form>

          <div className="mt-4 text-center text-sm">
            Don't have an account?{" "}
            <Link to="/sign-up" className="underline underline-offset-2">
              Sign Up
            </Link>
          </div>
        </CardContent>
      </Card>
    </MaxWidthWrapper>
  )
}

export default LoginForm;
