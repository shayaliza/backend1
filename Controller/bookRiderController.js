const BookRider = require("../Models/bookRiderModel");
const BulkParcel = require("../Models/bulkParcelModel");
const Veteran = require("../Models/ruralRiderModel");
const nodemailer = require("nodemailer");

getOrder = async (req, res) => {
  try {
    const orders = await BookRider.find();
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addOrder = async (req, res) => {
  try {
    const orderData = req.body;
    const newOrder = new BookRider(orderData);
    await newOrder.save();

    // Send email notification to the seller
    sendEmailNotification(
      orderData.sellerEmail,
      "Order Confirmation",
      `Hi ${orderData.sellerName},\n\n` +
        `We have received your order. Thank you for choosing us!\n\n` +
        `To track your order, click on the following link: https://Goton.in/orders/${newOrder._id}\n\n` +
        `Your Order ID is: ${newOrder._id}\n\n` +
        `If you have any questions or concerns, feel free to reach out to us.\n\n` +
        `Best regards,\nGotan.in`
    );

    res
      .status(201)
      .json({ message: "Order submitted successfully", orderId: newOrder._id });
  } catch (error) {
    console.error("Error saving order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to send email notification
const sendEmailNotification = (recipientEmail, subject, message) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "digistall.otp@gmail.com",
      pass: "pevkxuqeqaggfhkp",
    },
  });

  const mailOptions = {
    from: "digistall.otp@gmail.com",
    to: recipientEmail,
    subject: subject,
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email notification:", error);
    } else {
      console.log("Email notification sent:", info.response);
    }
  });
};
// Endpoint to fetch data by _id from both BookRider and BulkParcel collections
const orderDetails = async (req, res) => {
  try {
    const id = req.params.id;

    const bookRiderData = await BookRider.findById(id);
    const bulkParcelData = await BulkParcel.findById(id);
    const VeteranData = await Veteran.findById(id);

    // Combine data from both collections
    const responseData = {
      bookRider: bookRiderData,
      bulkParcel: bulkParcelData,
      veteran: VeteranData,
    };

    res.status(200).json(responseData);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
getSellerAcceptedTrue = async (req, res) => {
  try {
    const orders = await BookRider.find({ sellerAccepted: true });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders with sellerAccept true:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
sellerAccept = async (req, res) => {
  const { id } = req.params;
  try {
    const bookRider = await BookRider.findById(id);
    if (!bookRider) {
      return res.status(404).json({ error: "BookRider not found" });
    }
    bookRider.sellerAccepted = true;
    await bookRider.save();
    return res
      .status(200)
      .json({ message: "Seller accepted updated successfully" });
  } catch (error) {
    console.error("Error updating sellerAccepted:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
const getUnacceptedBookRiderOrders = async (req, res) => {
  try {
    const unacceptedOrders = await BookRider.find({
      $or: [{ sellerAccepted: false }, { sellerAccepted: { $exists: false } }],
    });
    res.status(200).json(unacceptedOrders);
  } catch (error) {
    console.error("Error fetching unaccepted orders:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const editBookRiderOrder = async (req, res) => {
  const { id } = req.params;
  const { deliverBy, expectedPrice, riderDetails } = req.body;
  try {
    const bookRider = await BookRider.findById(id);
    if (!bookRider) {
      return res.status(404).json({ error: "BookRider not found" });
    }
    if (deliverBy) {
      bookRider.deliverBy = deliverBy;
    }
    if (expectedPrice) {
      bookRider.expectedPrice = expectedPrice;
    }
    // Update riderDetails if present in the request body
    if (
      riderDetails &&
      Array.isArray(riderDetails) &&
      riderDetails.length >= 2
    ) {
      // Update riderDetails[0] and riderDetails[1] if they exist
      if (riderDetails[0]) {
        bookRider.riderDetails[0] = riderDetails[0];
      }
      if (riderDetails[1]) {
        bookRider.riderDetails[1] = riderDetails[1];
      }
    }

    await bookRider.save();
    return res
      .status(200)
      .json({ message: "BookRider order updated successfully" });
  } catch (error) {
    console.error("Error updating BookRider order:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = {
  editBookRiderOrder,
  getUnacceptedBookRiderOrders,
  sellerAccept,
  orderDetails,
  getOrder,
  addOrder,
  getSellerAcceptedTrue,
};
