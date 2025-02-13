import React, { useState, useContext } from 'react';
import { assets } from "../assets/assets";
import { FaMagic } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { toast } from "react-toastify";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Result = () => {
  const [image, setImage] = useState("/earth-pic.jpg");
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  
  const { backendUrl, token, loadCreditsData } = useContext(AppContext);
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!input) return;
    
    setLoading(true);
    try {
      const generatedImage = await generateImage(input);
      if (generatedImage) {
        setImage(generatedImage);
        setIsImageLoaded(true);
        setInput("");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const generateImage = async (prompt) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/image/generate-image`,
        { prompt },
        { headers: { token } }
      );
      
      if (!data.success) {
        toast.error(data.message);
        if (data.credits <= 0) navigate("/buy");
        return null;
      }
      
      loadCreditsData();
      return data.resultImage;
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      return null;
    }
  };

  return (
    <div className="min-h-screen bg-primary pt-24 flex items-center justify-center">
      <div className="max-w-4xl w-full flex flex-col items-center justify-center gap-8 px-4 sm:px-6">
        {/* Image Result Section */}
        <div className="w-full flex justify-center">
          <div className="relative rounded-xl overflow-hidden shadow-2xl w-[280px] sm:w-[400px] md:w-[450px] group">
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
                <span className="loading loading-infinity loading-md"></span> 
              </div>
            )}
            <img 
              src={image} 
              className="w-full h-auto sm:w-96" 
              alt="Generated Image" 
              onLoad={() => setIsImageLoaded(true)}
              onError={() => setIsImageLoaded(false)}
            />
            
            {/* Download Button */}
            {isImageLoaded && image !== assets.earth_img && (
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <a
                  href={image}
                  download
                  className="p-2 bg-black/50 rounded-lg hover:bg-black/70 transition-colors"
                >
                  <FiDownload className="w-5 h-5 text-white" />
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Input Section */}
        <div className="w-full max-w-md flex flex-col items-center gap-6 px-4 sm:px-0">
          <form onSubmit={onSubmitHandler} className="w-full flex flex-col items-center gap-4">
            <div className="w-full relative">
              <input
                onChange={(e) => setInput(e.target.value)}
                value={input}
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
                disabled={loading}
              >
                <FaMagic className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Action Buttons */}
          {isImageLoaded && image !== assets.earth_img && (
            <div className="flex gap-4 justify-center">
              <a
                href={image}
                className="flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-full 
                  border border-zinc-600 hover:border-zinc-500 shadow-lg 
                  hover:shadow-zinc-700/50 text-white hover:text-white transition-all duration-300"
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
                  setImage(assets.earth_img);
                  setIsImageLoaded(false);
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
