import React from "react";
import stepsData from "./../assets/assets";
const HowWorks = () => {
  return (
    <div className="how-works-container py-16 bg-secondary text-white">
      <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-center">
        How It Works
      </h1>
      <p className="text-lg text-center text-gray-400 mb-12">
        Transform your ideas into stunning visuals in just three simple steps.
      </p>
      <div className="steps-container flex flex-col items-center gap-10">
        {stepsData.map((item, index) => (
          <div
            key={index}
            className="step flex items-center bg-primary p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 w-4/5 max-w-lg"
          >
            <img
              src={item.icon}
              alt={item.title}
              className="lg:w-10 lg:h-10 mr-4 flex-shrink-0 sm:w-6 sm:h-6" // Set fixed size and spacing
            />
            {/* Right Side - Text Content */}
            <div className="flex flex-col text-left">
              <h2 className="text-lg font-bold mb-2 lg:text-2xl">
                {item.title}
              </h2>
              <p className="text-gray-300">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowWorks;
