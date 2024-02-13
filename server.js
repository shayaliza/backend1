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
const sellerRoutes = require("./Routes/sellerRouter");
const BookRider = require("./Routes/bookRiderRouter");
const BulkParcel = require("./Routes/bulkParcelRouter");
const RuralRider = require("./Routes/ruralRiderRouter");
const GotanAdmin = require("./Routes/gotanAdminRouter");
const Img = require("./Routes/imgRouter");
//@CORS setup///////////////////
// const corsOptions = {
//   origin: [
//     "https://digistall.in",
//     "https://admin.digistall.in",
//     "http://localhost:3000",
//     "https://gotan.in",
//     // "http://ajmer.localhost:3000",
//   ],
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   credentials: true,
//   optionsSuccessStatus: 204,
// };
//@ENV///////////////////////////

const port = 5000;
//@Global Middleware//////////////

// app.use(cors(corsOptions));
app.use(cors());

app.use(bodyParser.json());

//@MongoSetup///////////////////////////////////////////////////////
const mongoDBURL =
  // "mongodb+srv://chai:chaiforlife@cluster0.hn1kv1u.mongodb.net/?retryWrites=true&w=majority";
  "mongodb+srv://hriDev:plcR3WNQn6iMETa2@hri.gb755zn.mongodb.net/?retryWrites=true&w=majority";

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
app.get("/test", (req, res) => {
  res.send({ msg: "Hello Worldd" });
});

//@test//////////////////////////////////////////
//@Root api////////////////////////////////////////////////////////////
app.get("/", (req, res) => {
  res.send("Welcome to the home route!");
});

//@Local Middleware///////////////////////////////
app.use("/api/riderOrders", orderRoutes);
app.use("/api/riders", userRoutes);
app.use("/api", gotanRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/bookrider", BookRider);
app.use("/api/bulkparcel", BulkParcel);
app.use("/api/veteran", RuralRider);
app.use("/api/admin", GotanAdmin);
app.use("/api", Img);

//@Starting Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
