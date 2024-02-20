const mongoose = require("mongoose");

const ShopSchema = new mongoose.Schema({
  count: {
    type: Number,
    default: 0,
  },
  shopId: {
    type: String,
    required: true,
  },
  shopName: {
    type: String,
    required: true,
  },
  shopLogo: {
    type: String,
  },
  shopOwnerId: {
    type: String,
    required: true,
  },
  shopCategory: {
    type: String,
  },
  settings: {
    type: {
      header: {
        logo: String,
        shopName: String,
        isShopNameVisible: Boolean,
        tagline: String,
        isTaglineVisible: Boolean,
        email: String,
        emailVisibility: Boolean,
        phoneNumber: String,
        phoneNumberVisibility: Boolean,
      },
      welcomeBanner: { welcomeTitle: String, bannerImages: Array },
      footer: {
        address: String,
        isAddressVisible: Boolean,
        copyrightMessage: String,
        isSocialSitesVisible: Boolean,
        facebookUrl: String,
        instgramUrl: String,
        youtubeUrl: String,
        about: String,
      },
      team: [
        {
          imgUrl: String,
          memberVisibility: Boolean,
          name: String,
          role: String,
          instaUrl: String,
          instaVisibility: Boolean,
          facebookUrl: String,
          facebookVisibility: Boolean,
          linkdinUrl: String,
          linkdinVisibility: Boolean,
        },
      ],
      buttonsImg: String,
      buttonsDiscription: {
        type: String,
        default:
          "We are a small brand dedicated to get the quality you deserve. From Our Sustainable Supply Chain, To Your Sustainable Wardrobe, We will Create Your Environmental Designs With Care.",
      },
      buttons: [
        {
          id: String,
          buttonIcon: String,
          buttonText: String,
          buttonVisibility: Boolean,
          buttonUrl: String,
        },
      ],
      termsAndConditions: {
        termsAndConditions: String,
        msmeCertificate: String,
      },
    },
    default: {
      header: {
        logo: "https://res.cloudinary.com/aguruprasad/image/upload/v1669717427/woodline/product-images/Logo_2_xastkj.png",
        shopName: "HRI",
        isShopNameVisible: true,
        tagline: "We Provide The Best Service",
        isTaglineVisible: true,
        email: "support@hri.com",
        emailVisibility: true,
        phoneNumber: "+919999999999",
        phoneNumberVisibility: true,
      },
      welcomeBanner: {
        welcomeTitle: "Welcome To Our Store",
        bannerImages: [
          "https://res.cloudinary.com/aguruprasad/image/upload/v1670315929/woodline/product-images/Rectangle_35_f4ki6o.png",
        ],
      },
      footer: {
        address: "7 , Siyag House Gotan Tehsil Merta 342902",
        isAddressVisible: true,
        copyrightMessage: "(c) ALL RIGHTS RESERVED | HRI",
        isSocialSitesVisible: true,
        facebookUrl: "https://facebook.com",
        instgramUrl: "https://instagram.com",
        youtubeUrl: "https://youtube.com",
        about:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus.",
      },
      team: [],
      buttons: [],
      termsAndConditions: {
        termsAndConditions: "NO Terms & Cunditions.",
        msmeCertificate: "www.blankpage.com",
      },
    },
  },
  categorys: {
    type: [
      {
        categoryId: String,
        categoryImg: String,
        categoryName: String,
        gst: Number,
        categoryVisibility: { type: Boolean, default: true },
      },
    ],
    default: [
      {
        categoryId: "jshg726uweho28",
        categoryImg:
          "https://res.cloudinary.com/aguruprasad/image/upload/v1669871942/woodline/product-images/allProducts_fyituv.png",
        categoryName: "All Categorys",
        gst: 0,
        categoryVisibility: true,
      },
    ],
  },
  products: [
    {
      productId: String,
      productName: String,
      productImages: Array,
      productPrice: Number,
      productRibbon: String,
      productVisibility: { type: Boolean, default: true },
      productDescription: String,
      productdiscountPrice: Number,
      productCategory: String,
      hasVariants: { type: Boolean, default: false },
      variants: Object,
      productUnits: Number,
      productHSN: String,
      productGST: String,
      productUnitType: String,
    },
  ],
  upiId: {
    type: String,
  },
  QRCode: {
    type: String,
  },
  paymentMethod: {
    type: String,
    default: "PAY ON DELIVERY ONLY",
  },
  gstNumber: String,
  validTill: {
    type: String,
  },
  shopStamp: String,
  planType: {
    type: String,
    default: "1 days trial",
  },
  ReferralId: String,
  cod: { type: Boolean, default: false },
  emitra: { type: Boolean, default: false },
});

module.exports = mongoose.model("Shop", ShopSchema);
