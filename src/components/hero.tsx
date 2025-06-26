import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-r from-slate-900 to-slate-700 text-white flex">
      <div className="container mx-auto px-4 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              Step Into
              <span className="text-blue-400 block">Style & Comfort</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-lg">
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