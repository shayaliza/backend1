//@Global Import////////////////
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

//@Local Import/////////////////
const orderRoutes = require("./Routes/orderRouter");
const userRoutes = require("./Routes/userRouter");
const gotanRoutes = require("./Routes/gotanRouter");
//@CORS setup///////////////////
const corsOptions = {
  origin: [
    "https://digistall.in",
    "https://admin.digistall.in",
    "http://localhost:3000",
    "https://gotan.in",
    // "http://ajmer.localhost:3000",
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};
//@ENV///////////////////////////

const port = 5000;
//@Global Middleware//////////////

app.use(cors(corsOptions));
app.use(bodyParser.json());

//@MongoSetup///////////////////////////////////////////////////////
const mongoDBURL =
  "mongodb+srv://chai:chaiforlife@cluster0.hn1kv1u.mongodb.net/?retryWrites=true&w=majority";
// "mongodb+srv://hriDev:plcR3WNQn6iMETa2@hri.gb755zn.mongodb.net/?retryWrites=true&w=majority";

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
//@test//////////////////////////////////////////
// Create a customer collection and define a schema
// const customerSchema = new mongoose.Schema({
//   name: String,
//   phoneNumber: String,
//   email: String,
//   orders: {
//     type: [
//       {
//         orderId: String,
//         productId: String,
//         gst: Number,
//         productImage: String,
//         productName: String,
//         hasVariants: Boolean,
//         size: String,
//         onePiecePrice: Number,
//         orderNote: {
//           deliveryPartner: String,
//           ShippingId: String,
//           deliveryDate: String,
//           deliveryTime: String,
//         },
//         color: String,
//         shopId: String,
//         paymentMethod: String,
//         productCount: Number,
//         totalCartValue: Number,
//         orderStatus: { type: String, default: "PENDING" },
//         address: String,
//         date: { type: Date, default: Date.now },
//       },
//     ],
//     default: [],
//   },
//   address: {
//     type: Object,
//     default: {},
//   },
// });

// const Customer = mongoose.model("Customer", customerSchema);

// // API endpoint to add a new customer
// app.post("/api/customers", async (req, res) => {
//   try {
//     const { name, phoneNumber, email } = req.body;
//     const newCustomer = new Customer({ name, phoneNumber, email });
//     const savedCustomer = await newCustomer.save();
//     res.status(201).json(savedCustomer);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });
// app.post("/api/customers/byPhoneNumber", async (req, res) => {
//   try {
//     const { phoneNumber } = req.body;
//     const customer = await Customer.findOne({ phoneNumber });

//     if (customer) {
//       res.status(200).json(customer);
//     } else {
//       res.status(404).json({ error: "Customer not found" });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

//@test//////////////////////////////////////////
//@Root api////////////////////////////////////////////////////////////
app.get("/", (req, res) => {
  res.send("Welcome to the home route!");
});

//@Local Middleware///////////////////////////////
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);
app.use("/api", gotanRoutes);
//@Starting Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
