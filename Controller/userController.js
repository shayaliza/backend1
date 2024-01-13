const User = require("../Models/userModel");

async function registerUser(req, res) {
  try {
    const {
      phoneNumber,
      email,
      location,
      name,
      profileImage,
      licenseImage,
      password,
      acceptedOrders,
    } = req.body;

    const user = new User({
      phoneNumber,
      email,
      location,
      name,
      profileImage,
      licenseImage,
      password,
      acceptedOrders,
    });

    await user.save();

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.password !== password) {
      return res.status(401).json({ error: "Invalid password" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  registerUser,
  loginUser,
};
