const Veteran = require("../Models/ruralRiderModel");
const nodemailer = require("nodemailer");
const { uploadImage } = require("../Models/imgModel");

getOrder = async (req, res) => {
  try {
    const orders = await Veteran.find();
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addOrder = async (req, res) => {
  try {
    const orderData = req.body;
    if (req.file) {
      // console.log("hello");
      orderData.photoUrl = await uploadImage(req.file.buffer);
    }

    const newOrder = new Veteran(orderData);

    await newOrder.save();
    // sendEmailNotification(
    //   orderData.sellerEmail,
    //   "Order Confirmation",
    //   `Hi ${orderData.sellerName},\n\n` +
    //     `We have received your order. Thank you for choosing us!\n\n` +
    //     `To track your order, click on the following link: https://Goton.in/orders/${newOrder._id}\n\n` +
    //     `Your Order ID is: ${newOrder._id}\n\n` +
    //     `If you have any questions or concerns, feel free to reach out to us.\n\n` +
    //     `Best regards,\nGotan.in`
    // );

    res
      .status(201)
      .json({ message: "Order submitted successfully", orderId: newOrder._id });
  } catch (error) {
    console.error("Error saving order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

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
sellerAccept = async (req, res) => {
  const { id } = req.params;
  try {
    const veteran = await Veteran.findById(id);
    if (!veteran) {
      return res.status(404).json({ error: "Veteran not found" });
    }
    veteran.sellerAccepted = true;
    await veteran.save();
    return res
      .status(200)
      .json({ message: "Seller accepted updated successfully" });
  } catch (error) {
    console.error("Error updating sellerAccepted:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
const orderDetails = async (req, res) => {
  try {
    const id = req.params.id;

    const bookVeteran = await Veteran.findById(id);

    const responseData = bookVeteran;

    res.status(200).json(responseData);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getUnacceptedVetOrders = async (req, res) => {
  try {
    const unacceptedOrders = await Veteran.find({
      $or: [{ sellerAccepted: false }, { sellerAccepted: { $exists: false } }],
    });
    res.status(200).json(unacceptedOrders);
  } catch (error) {
    console.error("Error fetching unaccepted orders:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const editVetiderOrder = async (req, res) => {
  const { id } = req.params;
  const { deliverBy, expectedPrice, riderDetails } = req.body;
  try {
    const veteran = await Veteran.findById(id);
    if (!veteran) {
      return res.status(404).json({ error: "BookRider not found" });
    }
    if (deliverBy) {
      veteran.deliverBy = deliverBy;
    }
    if (expectedPrice) {
      veteran.expectedPrice = expectedPrice;
    }
    if (
      riderDetails &&
      Array.isArray(riderDetails) &&
      riderDetails.length >= 2
    ) {
      // Update riderDetails[0] and riderDetails[1] if they exist
      if (riderDetails[0]) {
        veteran.riderDetails[0] = riderDetails[0];
      }
      if (riderDetails[1]) {
        veteran.riderDetails[1] = riderDetails[1];
      }
    }
    await veteran.save();
    return res
      .status(200)
      .json({ message: "BookRider order updated successfully" });
  } catch (error) {
    console.error("Error updating BookRider order:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = {
  getUnacceptedVetOrders,
  editVetiderOrder,
  orderDetails,
  sellerAccept,
  getOrder,
  addOrder,
};
