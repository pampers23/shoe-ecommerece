import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-r from-slate-900 to-slate-700 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-24 xl:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center justify-items-center">
          <div className="space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8 text-center lg:text-left w-full max-w-2xl">
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-primary-foreground">
              Step Into
              <span className="text-blue-400 block mt-1 sm:mt-2">Style & Comfort</span>
            </h1>
            <p className="text-sm xs:text-base sm:text-lg md:text-xl text-slate-300 mx-auto lg:mx-9 max-w-lg">
              Discover our premium collection of shoes designed for every occasion. 
              From casual sneakers to elegant dress shoes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 cursor-pointer">
                Shop Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" className="border-white text-black hover:bg-white hover:text-slate-900 cursor-pointer">
                View Collection
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-400 to-purple-600 rounded-full w-96 h-96 mx-auto opacity-20 animate-pulse"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-6xl">👟</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;