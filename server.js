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
  origin: ["https://digistall.in", "http://localhost:3000", "https://gotan.in"],
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
//@Root api////////////////////////////////////////////////////////////
app.get("/", (req, res) => {
  res.send("Welcome to the home route!");
});
// app.put("/updateAcceptedOrders/:email", async (req, res) => {
//   try {
//     const { email } = req.params;
//     const { acceptedOrders } = req.body;

//     const user = await User.findOneAndUpdate(
//       { email },
//       { $push: { acceptedOrders: { $each: acceptedOrders } } },
//       { new: true }
//     );

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     res
//       .status(200)
//       .json({ message: "Accepted orders updated successfully", user });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// app.get("/getAcceptedOrders/:email", async (req, res) => {
//   try {
//     const { email } = req.params;

//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     const acceptedOrders = user.acceptedOrders || [];

//     res.status(200).json({ acceptedOrders });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

//@Local Middleware///////////////////////////////
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);
app.use("/api", gotanRoutes);
//@Starting Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
