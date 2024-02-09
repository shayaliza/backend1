const GotanAdmin = require("../Models/gotanAdminModel");
const BookRider = require("../Models/bookRiderModel");
const BulkParcel = require("../Models/bulkParcelModel");
const Veteran = require("../Models/ruralRiderModel");

const Login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await GotanAdmin.findOne({ username, password });
    if (user) {
      res.status(200).json({ success: true, message: "Login successful" });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
const SearchUnacceptedData = async (req, res) => {
  try {
    // Search for data where sellerAccepted is false or doesn't exist in BookRider
    const bookRiderData = await BookRider.find({
      $or: [{ sellerAccepted: false }, { sellerAccepted: { $exists: false } }],
    });

    // Search for data where sellerAccepted is false or doesn't exist in BulkParcel
    const bulkParcelData = await BulkParcel.find({
      $or: [{ sellerAccepted: false }, { sellerAccepted: { $exists: false } }],
    });

    // Search for data where sellerAccepted is false or doesn't exist in Veteran
    const veteranData = await Veteran.find({
      $or: [{ sellerAccepted: false }, { sellerAccepted: { $exists: false } }],
    });

    const unacceptedData = {
      bookRider: bookRiderData,
      bulkParcel: bulkParcelData,
      veteran: veteranData,
    };

    res.status(200).json({ success: true, data: unacceptedData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
const EditDeliverBy = async (req, res) => {
  try {
    const { model, id, deliverBy } = req.body;
    let document;
    switch (model) {
      case "BookRider":
        document = await BookRider.findByIdAndUpdate(
          id,
          { deliverBy },
          { new: true }
        );
        break;
      case "BulkParcel":
        document = await BulkParcel.findByIdAndUpdate(
          id,
          { deliverBy },
          { new: true }
        );
        break;
      case "Veteran":
        document = await Veteran.findByIdAndUpdate(
          id,
          { deliverBy },
          { new: true }
        );
        break;
      default:
        return res
          .status(400)
          .json({ success: false, message: "Invalid model specified" });
    }

    res.status(200).json({ success: true, data: document });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = {
  SearchUnacceptedData,
  EditDeliverBy,

  Login,
};
