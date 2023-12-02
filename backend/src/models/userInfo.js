const mongoose = require("mongoose");
const { errorCode } = require("../config/codeConfig");

const Schema = mongoose.Schema;

const userInfoSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "UserCred",
    },
    name: {
      type: String,
      trim: true,
    },
    enlistedCategory: [{
      type: Schema.Types.ObjectId,
      ref: "CategoryInfo",
    }],
    profession: {
      type: String,
    },
    subProfession: {
      type: String,
    },
    contactNumber: {
      type: String,
    },
    contactAddress: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    age: {
      type: Number,
      default: 0
    },
    userVisibility: {
      type: Boolean,
      default: true
    },
    categoryPreference: [{
      type: Schema.Types.ObjectId,
      ref: "CategoryInfo",
    }],
    gender: {
      type: String,
    },
    rating: {
      totalRating: {
        type: Number,
        default: 0
      },
      numberOfUser: {
        type: Number,
        default: 0
      }
    },
    referrals: [
      {
        id: {
          type: Schema.Types.ObjectId,
          ref: "UserCred",
        },
        date: { type: Date, default: Date.now }
      }
    ],
    user_socials: {
      fb_link: {
        type: String,
        trim: true,
      },
      insta_link: {
        type: String,
        trim: true,
      },
    },
    images: {
      type: String,
    },
  },
  { timestamps: true }
);

const UserInfo = mongoose.model("UserInfo", userInfoSchema);

module.exports = UserInfo;
