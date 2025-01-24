import React, { useState } from "react";
import { assets } from "../assets/assets";
import { FaMagic } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";

const Result = () => {
  const [image, setImage] = useState(assets.sample_img_1);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [loading,setLoading] = useState(false)
  return (
    <div className="min-h-screen bg-primary pt-24 flex items-center justify-center">
      <div className="max-w-4xl w-full flex flex-col items-center justify-center gap-8 px-4 sm:px-6">
        {/* Image Result Section */}
        <div className="w-full flex justify-center">
          <div className="relative rounded-xl overflow-hidden shadow-2xl w-[280px] sm:w-[400px] md:w-[450px] group">
            <img src={image} className="w-full h-auto" alt="Generated Image" />

            {/* Download Button */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Loading Progress Bar */}
            <div className="absolute bottom-0 left-0 w-full">
              <div className="h-1 bg-blue-500 bg-opacity-50 backdrop-blur-sm">
                <div className="h-full w-3/4 bg-blue-500 animate-pulse"></div>
              </div>
              <div className="text-white text-sm absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm px-4 py-1 rounded-full">
                <p className={!loading ? "hidden" : ""}>Generating...</p>
              </div>
            </div>
          </div>
        </div>

        {/* Input Section */}
        <div className="w-full max-w-md flex flex-col items-center gap-6 px-4 sm:px-0">
          <form className="w-full flex flex-col items-center gap-4">
            {!isImageLoaded && (
              <div className="w-full relative">
                <input
                  type="text"
                  placeholder="Describe your imagination here..."
                  className="w-full px-6 py-4 pr-14 bg-gray-900/50 backdrop-blur-sm rounded-xl 
                border border-gray-700 focus:border-blue-500 outline-none text-white 
                placeholder:text-gray-400 transition-all duration-300"
                />
                <button
                  className="absolute right-2 top-2/4 -translate-y-2/4 text-white bg-gradient-to-r from-gray-900 to-zinc-800 
                hover:from-gray-800 hover:to-zinc-700 px-4 py-2 rounded-lg text-sm 
                font-medium transition-all duration-300 border border-zinc-600 
                hover:border-zinc-500 shadow-lg hover:shadow-zinc-700/50 flex items-center gap-1"
                  type="submit"
                >
                  <FaMagic className="w-4 h-4" />
                </button>
              </div>
            )}
          </form>

          {/* Action Buttons */}
          {isImageLoaded && (
            <div className="flex gap-4 justify-center">
              <a
                href={image}
                className="flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-full 
              border border-zinc-600 hover:border-zinc-500 shadow-lg 
              hover:shadow-zinc-700/50 text-white hover:text-white transition-all duration-300"
                onClick={() => {
                  /* Add download logic */
                }}
                download
              >
                <FiDownload className="w-5 h-5" />
                Download
              </a>

              <button
                className="text-white bg-gradient-to-r from-gray-900 to-zinc-800 
              hover:from-gray-800 hover:to-zinc-700 px-6 py-3 rounded-lg text-sm 
              font-medium transition-all duration-300 border border-zinc-600 
              hover:border-zinc-500 shadow-lg hover:shadow-zinc-700/50 flex items-center gap-2"
                onClick={() => {
                 setIsImageLoaded(false)
                }}
              >
                Generate Another
              </button>
            </div>
          )}
          {/* Instructions */}
          <p className="text-gray-400 text-sm text-center">
            Try to be as descriptive as possible for better results
          </p>
        </div>
      </div>
    </div>
  );
};

export default Result;
