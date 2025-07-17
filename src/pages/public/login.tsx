import LoginForm from "@/components/login-form"
import basketball1 from "@/assets/basketball1.jpg"

export default function Login() {
  return (
    <div className="min-h-screen flex">
      <div className="w-full grid lg:grid-cols-2">
        <div className="flex items-center justify-center">
          <LoginForm />
        </div>

        {/* Background Image Section */}
        <div className="hidden lg:block relative overflow-hidden">
          <img 
            src={basketball1} 
            alt="Basketball Background"
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          />
        </div>
      </div>
    </div>
  )
}
