import { useEffect } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center relative overflow-hidden">
      {/* Background animated circles */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
      <div className="absolute bottom-32 right-16 w-24 h-24 bg-white/20 rounded-full animate-pulse delay-300"></div>
      <div className="absolute top-1/3 right-10 w-16 h-16 bg-white/15 rounded-full animate-pulse delay-500"></div>
      
      {/* Main logo container */}
      <div className="text-center">
        {/* YEGA Logo with animations */}
        <div className="relative">
          <h1 className="text-8xl font-black text-white tracking-wider animate-scale-in">
            YEGA
          </h1>
          {/* Underline animation */}
          <div className="w-0 h-1 bg-white mx-auto mt-4 animate-[slide-in-right_1s_ease-out_0.5s_forwards]"></div>
        </div>
        
        {/* Subtitle */}
        <p className="text-white/80 text-xl mt-8 animate-fade-in delay-700">
          App Repartidor
        </p>
        
        {/* Loading dots */}
        <div className="flex justify-center space-x-2 mt-12">
          <div className="w-3 h-3 bg-white/60 rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-white/60 rounded-full animate-pulse delay-200"></div>
          <div className="w-3 h-3 bg-white/60 rounded-full animate-pulse delay-400"></div>
        </div>
      </div>
      
      {/* Bottom decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="w-full h-32 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>
    </div>
  );
};

export default SplashScreen;