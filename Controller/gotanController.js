const Gotan = require("../Models/gotanModel");

exports.GotanData = async (req, res) => {
  const { name, email, phone, subdomain, businessName, businessAddress } =
    req.body;

  const newData = new Gotan({
    name,
    email,
    phone,
    subdomain,
    businessName,
    businessAddress,
  });

  try {
    await newData.save();
    res.status(200).json({ message: "Form data saved successfully" });
  } catch (error) {
    console.error("Error saving form data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
