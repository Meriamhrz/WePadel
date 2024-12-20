const cloudinary = require("./cloudinary");
const images = [
    "../assets/menu/burger-11.jpg",
    "../assets/menu/burger-12.jpg",
    "../assets/menu/burger-13.jpg",
    "../assets/menu/burger-14.jpg",
    "../assets/menu/burger-15.jpg",
    "../assets/menu/burger-16.jpg",
    "../assets/menu/burger-17.jpg",
    "../assets/menu/burger-18.jpg",
    "../assets/menu/bag1.jpg",
    "../assets/menu/bag3.jpg",
    "../assets/menu/bag4.jpg",
    "../assets/menu/bag5.jpg",
    "../assets/menu/bag6.jpg",
    "../assets/menu/shoes1.jpg",
    "../assets/menu/shoes5.jpg",
    "../assets/menu/shoes3.jpg",
    "../assets/menu/shoes6.jpg",
  ];
  
  const uploadImages = async (imagePaths) => {
    try {
      const uploadPromises = imagePaths.map((path) =>
        cloudinary.uploader.upload(path, { folder: "products" })
      );
  
      const results = await Promise.all(uploadPromises);
      console.log("All images uploaded successfully:", results.map((r) => r.secure_url));
      return results.map((r) => r.secure_url);
    } catch (err) {
      console.error("Error uploading images:", err);
      throw err;
    }
  };
  
  uploadImages(images)
    .then((urls) => console.log("Uploaded Image URLs:", urls))
    .catch((err) => console.error("Batch upload failed:", err));
  
