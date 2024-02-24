// const Shop = require("../Models/shopModel");

// const product = async (req, res) => {
//   try {
//     const { shopId } = req.params;

//     if (!shopId) {
//       return res.status(404).json({ error: "Order not found" });
//     }
//     const product = await Shop.findOne({ shopId: shopId });

//     if (!product) {
//       return res.status(404).json({ error: "Order not found" });
//     }

//     return res.status(200).json({ product });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// module.exports = {
//   product,
// };
const Shop = require("../Models/shopModel");

const product = async (req, res) => {
  try {
    const { shopId } = req.params;

    if (!shopId) {
      return res.status(404).json({ error: "Order not found" });
    }
    const shop = await Shop.findOne({ shopId: shopId });

    if (!shop) {
      return res.status(404).json({ error: "Order not found" });
    }
    // Assuming "product" is an array field within the shop document
    const products = shop.products.map((product) => ({
      productName: product.productName,
      productdiscountPrice: product.productdiscountPrice,
      productImages: product.productImages,
    }));

    return res.status(200).json({ products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  product,
};
