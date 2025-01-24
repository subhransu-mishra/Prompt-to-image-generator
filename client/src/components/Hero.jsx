import React from "react";
import { useNavigate } from "react-router-dom";
import { RiAiGenerate2 } from "react-icons/ri";

const Hero = () => {
  const navigate = useNavigate();
  return (
    
    <div
      className="mt-16 w-full min-h-screen bg-cover bg-center bg-fixed text-white py-16 lg:px-0 backdrop-blur-sm"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')",
      }}
    >
      <div className="bg-black/30 backdrop-blur-sm p-8 rounded-lg min-h-[calc(100vh-8rem)]  flex items-center">
        <div className="max-w-3xl mx-auto">
          {/* Text Content */}
          <div className="space-y-6 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
              Transform Text Into Stunning Images
            </h1>
            <p className="text-lg">
              Discover the magic of AI-powered creativity! Type your thoughts
              and watch them turn into captivating visuals instantly.
            </p>

            <button onClick={()=>navigate("/result")} className=" justify-center text-white bg-gradient-to-r from-gray-900 to-zinc-800 hover:from-gray-800 hover:to-zinc-700 px-10 py-3 rounded-lg text-lg font-medium transition-all duration-300 border border-zinc-600 hover:border-zinc-500 shadow-lg hover:shadow-zinc-700/50 flex items-center gap-2 mx-auto">
             Try Now<RiAiGenerate2 className="inline-block w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
