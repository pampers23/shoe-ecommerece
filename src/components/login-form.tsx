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
import { Separator } from "@radix-ui/react-dropdown-menu"


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

              <Button disabled={isPending} className="w-full gap-2 cursor-pointer" type="submit">
                {isPending ? (
                  <>
                    Logging in...
                    <DotPulse size="30" speed="1.3" color="white" />
                  </>
                ) : (
                  "Login"
                )}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>
            
              <Button className="w-full cursor-pointer">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </Button>

            </form>
          </Form>



          <div className="mt-4 text-center text- cursor-pointer">
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
