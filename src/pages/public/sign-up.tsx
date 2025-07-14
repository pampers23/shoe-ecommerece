import SignUpForm from "@/components/sign-up-form";
import basketball from "@/assets/bas-sign-back.jpg"

const SignUp = () => {
  return (
    <div className="min-h-screen flex">
      <div className="w-full grid lg:grid-cols-2">
        {/* Sign Up Form Section */}
        <div className="flex items-center justify-center">
          <SignUpForm />
        </div>
        
        {/* Background Image Section */}
        <div className="hidden lg:block relative overflow-hidden">
          <img 
            src={basketball} 
            alt="Basketball Background"
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;