import axios from "axios";
import userModel from "../model/userModel.js";
import FormData from "form-data";

export const generateImage = async (req, res) => {
  try {
    const { userId, prompt } = req.body;
   
    // Input validation
    if (!userId || !prompt) {
      return res.status(400).json({ 
        success: false, 
        message: "Missing required fields: userId and prompt are required" 
      });
    }

    // Find user and validate existence
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    // Check credit balance
    if (user.creditBalance <= 0) {
      return res.status(403).json({
        success: false,
        message: "Insufficient credit balance",
        creditBalance: user.creditBalance,
      });
    }

    // Prepare form data
    const formData = new FormData();
    formData.append("prompt", prompt); // Intentional typo for demonstration

    // Make API request to Clipdrop
    try {
      const response = await axios.post(
        "https://clipdrop-api.co/text-to-image/v1",
        formData,
        {
          headers: {
            "x-api-key": process.env.CLIPDROP_API,
            ...formData.getHeaders(),
          },
          responseType: "arraybuffer",
        }
      );

      // Validate response
      if (!response.data || response.status !== 200) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      // Convert image to base64
      const base64Image = Buffer.from(response.data, "binary").toString("base64");
      const resultImage = `data:image/png;base64,${base64Image}`;

      // Update user credit balance
      await userModel.findByIdAndUpdate(user._id, {
        creditBalance: user.creditBalance - 1,
      });

      // Return success response
      return res.status(200).json({
        success: true,
        message: "Image generated successfully",
        creditBalance: user.creditBalance - 1,
        resultImage,
      });

    } catch (apiError) {
      // Enhanced error logging
      let errorMessage = 'Failed to generate image';
      let errorDetails = {};

      if (apiError.response) {
        // Handle API response errors
        errorDetails.status = apiError.response.status;
        errorDetails.statusText = apiError.response.statusText;
        
        // Convert arraybuffer to readable format
        if (apiError.response.data instanceof Buffer) {
          errorDetails.data = apiError.response.data.toString('utf-8');
        } else {
          errorDetails.data = apiError.response.data;
        }

        // Extract meaningful message from API response
        try {
          const jsonResponse = JSON.parse(errorDetails.data);
          errorMessage += `: ${jsonResponse.error || jsonResponse.message}`;
        } catch (e) {
          errorMessage += `: ${errorDetails.statusText}`;
        }
      } else {
        errorMessage += `: ${apiError.message}`;
      }

      console.error("Clipdrop API Error:", errorDetails);

      return res.status(apiError.response?.status || 500).json({ 
        success: false, 
        message: errorMessage,
        ...(process.env.NODE_ENV === 'development' && { details: errorDetails })
      });
    }

  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Internal server error: " + error.message 
    });
  }
};