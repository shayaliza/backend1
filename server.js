const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import the cors middleware
const app = express();
const port = 5000;

app.use(bodyParser.json()); // Parse JSON requests
// app.use(cors());

// app.use(cors(corsOptions));
const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

const mongoDBURL =
  "mongodb+srv://chai:chaiforlife@cluster0.hn1kv1u.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(mongoDBURL, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Connected to MongoDB");
});

db.on("error", (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

db.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log("MongoDB connection closed through app termination");
    process.exit(0);
  });
});

// Define your MongoDB Schema and Models here if you're using mongoose schemas and models
const OrderSchema = new mongoose.Schema({
  shopId: String,
  orderId: String,
  address: String,
  date: String,
  gst: String,
  onePiecePrice: String,
  paymentMethod: String,
  productCount: String,
  productId: String,
  productImage: String,
  productName: String,
  totalCartValue: String,
  transactionId: String,
  // variant: String,
});

const Order = mongoose.model("Order", OrderSchema);

// POST route to handle orders
app.post("/order", async (req, res) => {
  try {
    const {
      email,
      shopId,
      orderId,
      address,
      date,
      gst,
      onePiecePrice,
      paymentMethod,
      productCount,
      productId,
      productImage,
      productName,
      totalCartValue,
      transactionId,
      // variant,
    } = req.body;

    const order = new Order({
      email,
      shopId,
      orderId,
      address,
      date,
      gst,
      onePiecePrice,
      paymentMethod,
      productCount,
      productId,
      productImage,
      productName,
      totalCartValue,
      transactionId,
      // variant,
    });

    await order.save();

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add a new GET route to retrieve all orders
app.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find(); // Retrieve all orders from the database

    res.status(200).json({ orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/", (req, res) => {
  res.send("Welcome to the home route!");
});
//user

const UserSchema = new mongoose.Schema({
  phoneNumber: String,
  email: String,
  location: String,
  name: String,
  profileImage: String, // Assuming the profile image is stored as a URL or file path
  licenseImage: String, // Assuming the license image is stored as a URL or file path
  password: String, // Assuming the password is stored as plain text (Note: In production, you should hash and salt passwords)
});

const User = mongoose.model("User", UserSchema);
app.post("/authenticate", async (req, res) => {
  try {
    const {
      phoneNumber,
      email,
      location,
      name,
      profileImage,
      licenseImage,
      password,
    } = req.body;

    // const existingUser = await User.findOne({
    //   $or: [{ email }, { phoneNumber }],
    // });

    // if (existingUser) {
    //   return res.status(409).json({ error: "User already exists" });
    // }

    const user = new User({
      phoneNumber,
      email,
      location,
      name,
      profileImage,
      licenseImage,
      password, // Note: In production, make sure to hash and salt the password before storing it
    });

    await user.save();

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/login", async (req, res) => {
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
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
