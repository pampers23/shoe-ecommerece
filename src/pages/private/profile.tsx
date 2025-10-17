import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, MapPin, Phone, Mail, Calendar, Package, CreditCard } from 'lucide-react';
import { useNavigate } from "react-router-dom"
import Header from "@/components/header"


const Profile = () => {
    const navigate = useNavigate();

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
                            <AvatarImage src="https://github.com/shadcn.png" alt="profile" />
                            <AvatarFallback className="text-2xl">LM</AvatarFallback>
                        </Avatar>
                    </div>
                    <CardTitle>Lance Mendoza</CardTitle>
                    <CardDescription>Premium Member</CardDescription>
                    <Badge variant="secondary" className="mt-2">
                        Member since 2023
                    </Badge>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">lance.mendoza@gmail.com</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">+639876453210</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">New York, NY</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Joined March 2023</span>
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

            {/* payment methonds */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <CreditCard className="h-5 w-5" />
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center">
                                    <span className="text-white text-xs font-bold">VISA</span>
                                </div>
                                <div>
                                    <p className="font-medium">•••• •••• •••• 4242</p>
                                    <p className="text-xs text-muted-foreground">Expires 12/26</p>
                                </div>
                            </div>
                            <Badge variant="secondary">
                                Default
                            </Badge>

                            <div className="flex items-center justify-between p-4 rounded-lg">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-8 bg-red-600 rounded flex items-center justify-center">
                                        <span className="text-white text-xs font-bold">MC</span>
                                    </div>
                                    <div>
                                        <p className="font-medium">•••• •••• •••• 8888</p>
                                        <p className="text-xs text-muted-foreground">Expires 08/25</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Button variant="outline" className="w-full mt-4">
                        Add Payment Method
                    </Button>
                </CardContent>
            </Card>

            {/* account settings */}
            <Card>
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
