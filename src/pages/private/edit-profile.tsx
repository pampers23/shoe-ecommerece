import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema, type ProfileSchema } from "@/zod-schema";
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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserProfile, updateUserProfile, updateUserProfileImage } from "@/actions/private";
import { Tailspin } from "ldrs/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRef, useState } from "react";


const EditProfile = () => {
    const navigate = useNavigate(); 
    const queryClient = useQueryClient();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectImage, setSelectImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    
    const { data: user, isLoading } = useQuery({
        queryKey: ["user-profile"],
        queryFn: getUserProfile,
    });

    const form = useForm<ProfileSchema>({
        resolver: zodResolver(profileSchema),
        values: user
            ? {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                profile_image: user.profile_image,
            }
            : { 
                name: "",
                email: "",
                phone: "",
                address: "",
                profile_image: "",
            }
    });

    const { mutate: changeAvatar, isPending } = useMutation({
        mutationFn: async (file: File) => {
            if (!user?.id) throw new Error("User not found");
            return await updateUserProfileImage(file, user.id)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user-profile"] });
            toast.success("Profile Image Uploaded!");
        },
        onError: (error) => {
            toast.error("Failed to upload image.");
            console.error(error);
        }
    })

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectImage(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const onSubmit = async (data: ProfileSchema) => {
        console.log("Triggered: ", data);
        
        try {
            if (selectImage && user?.id) {
                await updateUserProfileImage(selectImage, user.id)
                changeAvatar(selectImage)
                toast.success("Profile image update!")
            }
            await updateUserProfile({
                userId: user!.id,
                email: data.email,
                firstName: data.name.split(" ")[0] || "",
                lastName: data.name.split(" ")[1] || "",
                phone: data.phone,
                address: data.address,
            });
            toast.success("Profile updated successfully!");
            queryClient.invalidateQueries({ queryKey: ["user-profile"] });
            navigate("/profile")
        } catch (error) {
            console.error(error);
            toast.error("Failed to update profile!")
        }
    }

    const getInitials = (name: string) => {
        const parts = name.trim().split(" ");
        const initials = parts.map((p) => p[0].toUpperCase()).join("");
        return initials.slice(0, 2);
    }

    if (isPending || isLoading) {
            return (
                <div className="h-96 w-full flex flex-col gap-4 items-center justify-center my-7 md:my-14">
                    <p className="text-sm text-muted-foreground animate-pulse">Loading products...</p>
                    <Tailspin size="30" stroke="3" speed="0.9" color="#262E40" />
                </div>
            )
        }

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-muted/20">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-8 animate-in fade-in slide-in-from-top duration-500">
                        <div className="relative inline-block mb-4">
                            <Avatar className="h-28 w-28 border-4 border-primary/10 shadow-lg">
                                {user?.profile_image || user?.avatar_url ? (
                                    <AvatarImage
                                    src={previewUrl || user.profile_image || user.avatar_url}
                                    alt={user.name}
                                    />
                                ) : (
                                    <AvatarFallback className="text-3xl bg-gray-300 text-gray-700 font-semibold">
                                    {getInitials(user?.name || "U N")}
                                    </AvatarFallback>
                                )}
                            </Avatar>
                            <Button 
                                className="absolute bottom-0 right-0 h-9 w-9 rounded-full bg-primary text-primary-foreground
                                shadow-lg hover:scale-110 transition-transform duration-200 flex items-center justify-center cursor-pointer"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <Camera className="h-4 w-4" />
                            </Button>

                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                hidden
                                onChange={handleFileChange}
                            />
                        </div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                            Edit Profile
                        </h1>
                        <p className="text-muted-foreground mt-2">Update your personal information</p>
                    </div>

                    <Card className="border-border/50 shadow-xl animate-in fade-in slide-in-from-bottom duration-500">
                        <CardContent className="pt-8">
                            <Form key={user?.id || "new-user"} {...form}>
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
                                            className="flex-1 h-11 hover:scale-[1.02] transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
                                        >
                                            {isPending ? "Saving..." : "Save"}
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => navigate("/profile")}
                                            className="flex-1 h-11 hover:scale-[1.02] transition-all duration-200 cursor-pointer"
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
