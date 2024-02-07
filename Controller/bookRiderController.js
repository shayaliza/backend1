const BookRider = require("../Models/bookRiderModel");
const BulkParcel = require("../Models/bulkParcelModel");

// const addOrder = async (req, res) => {
//   try {
//     const orderData = req.body;
//     const newOrder = new BookRider(orderData);
//     await newOrder.save();
//     res
//       .status(201)
//       .json({ message: "Order submitted successfully", orderId: newOrder._id });
//   } catch (error) {
//     console.error("Error saving order:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

getOrder = async (req, res) => {
  try {
    const orders = await BookRider.find();
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const nodemailer = require("nodemailer");

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

    // Combine data from both collections
    const responseData = {
      bookRider: bookRiderData,
      bulkParcel: bulkParcelData,
    };

    res.status(200).json(responseData);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = {
  orderDetails,
  getOrder,
  addOrder,
};
