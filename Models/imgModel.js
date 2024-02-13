// const cloudinary = require("cloudinary").v2;
// const fs = require("fs").promises;
// const path = require("path");

// cloudinary.config({
//   cloud_name: "dd3wcupnb",
//   api_key: "264666928844822",
//   api_secret: "cHWQ7Ih22Xd8XL6opBUhLwfkJHI",
// });

// async function uploadImage(fileBuffer) {
//   try {
//     console.log("Uploading image to Cloudinary...");

//     // Specify the directory where you want to save the temporary file
//     const tempDir = path.join(__dirname, "tmp");

//     // Ensure that the directory exists, create it if it doesn't
//     await fs.mkdir(tempDir, { recursive: true });

//     // Construct the path for the temporary file
//     const tempFilePath = path.join(tempDir, "tempImage.jpg");

//     // Write the file buffer to the temporary file
//     await fs.writeFile(tempFilePath, fileBuffer);
//     const result = await cloudinary.uploader.upload(tempFilePath, {
//       resource_type: "auto",
//     });

//     console.log("Image uploaded successfully:", result.secure_url);

//     // Delete the temporary file
//     await fs.unlink(tempFilePath);

//     return result.secure_url;
//   } catch (error) {
//     console.error("Error saving order:", error);
//     throw error;
//   }
// }

// module.exports = { uploadImage };
// const cloudinary = require("cloudinary").v2;

// cloudinary.config({
//   cloud_name: "dd3wcupnb",
//   api_key: "264666928844822",
//   api_secret: "cHWQ7Ih22Xd8XL6opBUhLwfkJHI",
// });

// async function uploadImage(fileBuffer) {
//   try {
//     console.log("Uploading image to Cloudinary...");

//     const result = await cloudinary.uploader.upload(fileBuffer, {
//       resource_type: "auto",
//     });

//     console.log("Image uploaded successfully:", result.secure_url);

//     return result.secure_url;
//   } catch (error) {
//     console.error("Error uploading image to Cloudinary:", error);
//     throw error;
//   }
// }

// module.exports = { uploadImage };
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dd3wcupnb",
  api_key: "264666928844822",
  api_secret: "cHWQ7Ih22Xd8XL6opBUhLwfkJHI",
});

async function uploadImage(fileBuffer) {
  try {
    console.log("Uploading image to Cloudinary...");

    // Convert buffer to Data URL
    const dataUrl = `data:image/jpeg;base64,${fileBuffer.toString("base64")}`;

    // Upload Data URL to Cloudinary
    const result = await cloudinary.uploader.upload(dataUrl, {
      resource_type: "auto",
    });

    console.log("Image uploaded successfully:", result.secure_url);

    return result.secure_url;
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw error;
  }
}

module.exports = { uploadImage };
