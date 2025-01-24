import React from "react";

const Description = () => {
  return (
    <div className="w-full min-h-screen bg-secondary bg-cover bg-center bg-fixed text-white flex items-center justify-center px-4 py-16 lg:px-0">
      <div className=" backdrop-blur-sm p-8 rounded-lg min-h-[calc(100vh-8rem)]  flex items-center  shadow-xl  flex-col lg:flex-row justify-center gap-10 max-w-5xl">
        {/* Left side - Image with hover effect */}
        <div className="w-full md:w-1/2 overflow-hidden group">
          <img
            src="/ai-img2.jpg" // Add your image in the public folder
            alt="AI Description"
            className="w-full h-auto rounded-lg shadow-xl transition-all duration-500 ease-in-out transform 
            group-hover:scale-110 group-hover:translate-y-2 group-hover:-translate-x-2 group-hover:rotate-3"
          />
        </div>

        {/* Right side - Content */}
        <div className="w-full md:w-1/2 space-y-6">
          <h2 className="text-3xl font-bold text-white text-center md:text-left">
            Why Choose Our AI Image Generator?
          </h2>

          <p className="text-gray-400 text-center md:text-left">
            Experience the next generation of AI-powered image creation with our
            cutting-edge technology.
          </p>

          <ul className="space-y-4">
            {/* Bullet points */}
            <li className="flex items-start gap-3">
              <div className="mt-1 bg-blue-500 rounded-full p-1 shrink-0">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-400">
                  High Quality Output
                </h3>
                <p className="text-gray-400">
                  Generate stunning, high-resolution images that exceed
                  expectations
                </p>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <div className="mt-1 bg-blue-500 rounded-full p-1 shrink-0">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-400">Fast Processing</h3>
                <p className="text-gray-400">
                  Get your results in seconds with our optimized AI algorithms
                </p>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <div className="mt-1 bg-blue-500 rounded-full p-1 shrink-0">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-400">Style Variety</h3>
                <p className="text-gray-400">
                  Choose from multiple artistic styles and customization options
                </p>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <div className="mt-1 bg-blue-500 rounded-full p-1 shrink-0">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-400">Easy to Use</h3>
                <p className="text-gray-400">
                  Simple interface designed for both beginners and professionals
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Description;
