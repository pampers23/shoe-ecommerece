import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema, type ProfileSchema } from "@/zod-schema";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import Header from "@/components/header";
import Footer from "@/components/footer";
import { toast } from "sonner"
import { User, Mail, Phone, MapPin, Camera } from "lucide-react";


const EditProfile = () => {
    const navigate = useNavigate();
    const form = useForm<ProfileSchema>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: "John Doe",
            email: "john.doe@gmail.com",
            phone: "1234567890",
            address: "123 Main St, City, Country",
        }
    });

    const onSubmit = (data: ProfileSchema) => {
        console.log(data);
        toast.success("Profile updated successfully");
        navigate("/profile");
    }

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-muted/20">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-8 animate-in fade-in slide-in-from-top duration-500">
                        <div className="relative inline-block mb-4">
                            <Avatar className="h-28 w-28 border-4 border-primary/10 shadow-lg">
                                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" alt="Profile" />
                                <AvatarFallback className="bg-primary/5">
                                    <User className="h-14 w-14 text-muted-foreground" />
                                </AvatarFallback>
                            </Avatar>
                            <Button className="absolute bottom-0 right-0 h-9 w-9 rounded-full bg-primary text-primary-foreground
                            shadow-lg hover:scale-110 transition-transform duration-200 flex items-center justify-center">
                                <Camera className="h-4 w-4" />
                            </Button>
                        </div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                            Edit Profile
                        </h1>
                        <p className="text-muted-foreground mt-2">Update your personal information</p>
                    </div>

                    <Card className="border-border/50 shadow-xl animate-in fade-in slide-in-from-bottom duration-500">
                        <CardContent className="pt-8">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem className="group">
                                                <FormLabel className="text-base flex items-center gap-2">
                                                    <User className="h-4 w-4 text-primary" />
                                                    Full Name
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="John Doe"
                                                        {...field}
                                                        className="transition-all duration-200 focus:ring-2 focus:primary/20 h-11"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem className="group">
                                                <FormLabel className="text-base flex items-center gap-2">
                                                    <Mail className="h-4 w-4 text-primary" />
                                                    Email
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="email"
                                                        placeholder="john.doe@gmail.com"
                                                        {...field}
                                                        className="transition-all duration-200 focus:ring-2 focus:primary/20 h-11"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="phone"
                                        render={({ field }) => (
                                            <FormItem className="group">
                                                <FormLabel className="text-base flex items-center gap-2">
                                                    <Phone className="h-4 w-4 text-primary" />
                                                    Phone
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="1234567890"
                                                        {...field}
                                                        className="transition-all duration-200 focus:ring-2 focus:primary/20 h-11"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="address"
                                        render={({ field }) => (
                                            <FormItem className="group">
                                                <FormLabel className="text-base flex items-center gap-2">
                                                    <MapPin className="h-4 w-4 text-primary" />
                                                    Address
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="123 Main St, City, Country"
                                                        {...field}
                                                        className="transition-all duration-200 focus:ring-2 focus:primary/20 h-11"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div className="flex flex-col sm:flex-row gap-4 pt-6">
                                        <Button
                                            type="submit"
                                            className="flex-1 h-11 hover:scale-[1.02] transition-all duration-200 shadow-md hover:shadow-lg"
                                        >
                                            Save Changes
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => navigate("/profile")}
                                            className="flex-1 h-11 hover:scale-[1.02] transition-all duration-200"
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </div>
            </main>
            <Footer />
        </div>
  )
}

export default EditProfile
