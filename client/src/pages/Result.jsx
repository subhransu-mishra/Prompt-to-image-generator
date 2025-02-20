import React, { useState, useContext } from "react";
import { assets } from "./../assets/assets";
import { FaMagic, FaShare } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { toast } from "react-toastify";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Result = () => {
  const [image, setImage] = useState(assets.earth_img);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [hasGenerated, setHasGenerated] = useState(false);

  const { backendUrl, token, loadCreditsData } = useContext(AppContext);
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!input) return;

    setLoading(true);
    setIsImageLoaded(false);
    try {
      const generatedImage = await generateImage(input);
      if (generatedImage) {
        setImage(generatedImage);
        setIsImageLoaded(true);
        setInput("");
        setHasGenerated(true);
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

  const handleDownload = () => {
    if (image) {
      const link = document.createElement("a");
      link.href = image;
      link.download = "generated-image.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleShare = async () => {
    try {
      const response = await fetch(image);
      const blob = await response.blob();
      const file = new File([blob], "generated-image.png", { type: blob.type });
  
      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: "Check this out!",
          text: "Here's an amazing image!",
          files: [file],
        });
      } else {
        throw new Error("Sharing not supported");
      }
    } catch (error) {
      console.error("Sharing failed:", error);
      
      try {
        // Copy image to clipboard
        await navigator.clipboard.write([
          new ClipboardItem({ [blob.type]: blob })
        ]);
        toast.success("Image copied to clipboard!");
      } catch (clipboardError) {
        console.error("Clipboard copy failed:", clipboardError);
        toast.error("Failed to share or copy image.");
      }
    }
  };
  
  

  return (
    <div className="min-h-screen bg-primary pt-24 flex items-center justify-center">
      <div className="max-w-6xl w-full flex flex-col items-center justify-center gap-8 px-4 sm:px-6">
        {/* Image Result Section */}
        <div className="w-full flex justify-center">
          <div className="relative rounded-xl overflow-hidden shadow-2xl w-[350px] sm:w-[500px] md:w-[600px] group">
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
                <span className="loading loading-infinity loading-md"></span>
              </div>
            )}
            <img
              src={image}
              className="w-full h-auto sm:w-[500px] md:w-[600px]"
              alt="Generated Image"
              onLoad={() => setIsImageLoaded(true)}
              onError={() => setIsImageLoaded(false)}
            />

            {/* Action Buttons */}
            {isImageLoaded && image !== assets.earth_img && (
              <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 bg-black/50 rounded-lg hover:bg-black/70 transition-colors"
                  onClick={handleDownload}
                >
                  <FiDownload className="w-5 h-5 text-white" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 bg-black/50 rounded-lg hover:bg-black/70 transition-colors"
                  onClick={handleShare}
                >
                  <FaShare className="w-5 h-5 text-white" />
                </motion.button>
              </div>
            )}
          </div>
        </div>

        {/* Input Section - Always shown */}
        <div className="w-full max-w-md flex flex-col items-center gap-6 px-4 sm:px-0">
          <form
            onSubmit={onSubmitHandler}
            className="w-full flex flex-col items-center gap-4"
          >
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
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="absolute right-2 top-2/4 -translate-y-2/4 text-white bg-gradient-to-r from-gray-900 to-zinc-800 
                  hover:from-gray-800 hover:to-zinc-700 px-4 py-2 rounded-lg text-sm 
                  font-medium transition-all duration-300 border border-zinc-600 
                  hover:border-zinc-500 shadow-lg hover:shadow-zinc-700/50 flex items-center gap-1"
                type="submit"
                disabled={loading}
              >
                <FaMagic className="w-4 h-4" />
              </motion.button>
            </div>
          </form>

          {/* Action Buttons - Desktop */}
            {isImageLoaded && image !== assets.earth_img && (
              <div className="hidden sm:flex gap-4 justify-center w-full">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium rounded-full 
                    border border-zinc-600 hover:border-zinc-500 shadow-lg 
                    hover:shadow-zinc-700/50 text-white hover:text-white transition-all duration-300"
                  onClick={handleDownload}
                >
                  <FiDownload className="w-5 h-5" />
                  Download
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium rounded-full 
                    border border-zinc-600 hover:border-zinc-500 shadow-lg 
                    hover:shadow-zinc-700/50 text-white hover:text-white transition-all duration-300"
                  onClick={handleShare}
                >
                  <FaShare className="w-5 h-5" />
                  Share
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium rounded-full 
                    bg-gradient-to-r from-gray-900 to-zinc-800 hover:from-gray-800 hover:to-zinc-700 
                    border border-zinc-600 hover:border-zinc-500 shadow-lg hover:shadow-zinc-700/50 
                    text-white transition-all duration-300"
                  onClick={() => {
                    setImage(assets.earth_img);
                    setIsImageLoaded(false);
                    setHasGenerated(false);
                  }}
                >
                  Generate Another
                </motion.button>
              </div>
            )}

            {/* Action Buttons - Mobile */}
            {isImageLoaded && image !== assets.earth_img && (
              <div className="sm:hidden flex flex-col gap-4 w-full">
                <div className="flex gap-4 justify-between">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium rounded-full 
                      border border-zinc-600 hover:border-zinc-500 shadow-lg 
                      hover:shadow-zinc-700/50 text-white hover:text-white transition-all duration-300"
                    onClick={handleDownload}
                  >
                    <FiDownload className="w-5 h-5" />
                    Download
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium rounded-full 
                      border border-zinc-600 hover:border-zinc-500 shadow-lg 
                      hover:shadow-zinc-700/50 text-white hover:text-white transition-all duration-300"
                    onClick={handleShare}
                  >
                    <FaShare className="w-5 h-5" />
                    Share
                  </motion.button>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium rounded-full 
                    bg-gradient-to-r from-gray-900 to-zinc-800 hover:from-gray-800 hover:to-zinc-700 
                    border border-zinc-600 hover:border-zinc-500 shadow-lg hover:shadow-zinc-700/50 
                    text-white transition-all duration-300"
                  onClick={() => {
                    setImage(assets.earth_img);
                    setIsImageLoaded(false);
                    setHasGenerated(false);
                  }}
                >
                  Generate Another
                </motion.button>
              </div>
            )}

            <p className="text-gray-400 text-sm text-center">
              Try to be as descriptive as possible for better results
            </p>
        </div>

        
      </div>
    </div>
  );
};

export default Result;
