import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, MapPin, Phone, Mail, Package } from 'lucide-react';
import { useNavigate } from "react-router-dom"
import Header from "@/components/header"
import { useQuery } from "@tanstack/react-query"
import { getUserProfile } from "@/actions/private"


const Profile = () => {
    const navigate = useNavigate();
    const { data: user, isPending } = useQuery({
        queryKey: ["userProfile"],
        queryFn: getUserProfile,
    })

    if (isPending) return <p>Loading...</p>

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
            <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/')}
                className="h-10 w-10"
            >
                <ArrowLeft />
            </Button>
            <h1 className="text-3xl font-bold">My Profile</h1>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* profile info */}
        <div className="lg:col-span-1">
            <Card>
                <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                        <Avatar className="h-24 w-24">
                            <AvatarImage src={user?.profile_image} alt="profile" />
                            <AvatarFallback className="text-2xl">
                                {user?.name?.split(" ")[0]?.[0]}{user?.name?.split(" ")[1]?.[0] || ""}
                            </AvatarFallback>
                        </Avatar>
                    </div>
                    <CardTitle>{user?.name}</CardTitle>
                    {/* <CardDescription>Premium Member</CardDescription>
                    <Badge variant="secondary" className="mt-2">
                        Member since 2023
                    </Badge> */}
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{user?.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{user?.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{user?.address}</span>
                    </div>
                    <Separator />
                    <Button className="w-full cursor-pointer" onClick={() => navigate("/profile/edit-profile")}>Edit Profile</Button>
                </CardContent>
            </Card>
        </div>

        {/* account details */}
        <div className="lg:col-span-2 space-y-6">
            {/* order history */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-">
                        <Package className="h-5 w-5" />
                        Recent Orders
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">👟</div>
                      <div>
                        <h4 className="font-medium">Nike Air Max 270</h4>
                        <p className="text-sm text-muted-foreground">Order #12345 • March 15, 2024</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">$150.00</p>
                      <Badge variant="outline" className="mt-1">Delivered</Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">🥾</div>
                      <div>
                        <h4 className="font-medium">Adidas Ultraboost 22</h4>
                        <p className="text-sm text-muted-foreground">Order #12344 • March 10, 2024</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">$180.00</p>
                      <Badge variant="outline" className="mt-1">Delivered</Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">👠</div>
                      <div>
                        <h4 className="font-medium">Puma RS-X</h4>
                        <p className="text-sm text-muted-foreground">Order #12343 • March 5, 2024</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">$120.00</p>
                      <Badge variant="outline" className="mt-1">Delivered</Badge>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4">
                    View All Orders
                </Button>
                </CardContent>
            </Card>



            {/* account settings */}
            <Card className="mb-10">
                <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Button variant="outline">Change Password</Button>
                        <Button variant="outline">Notification Settings</Button>
                        <Button variant="outline">Privacy Policy</Button>
                        <Button variant="outline">Shipping Addresses</Button>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Need help?</span>
                        <Button variant="link" size="sm">Contact Support</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  )
}

export default Profile
