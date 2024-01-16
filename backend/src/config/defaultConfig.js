const envConfig = require('./appConfig');
const config = {
  env: envConfig.env,
  postStatusOption: ['open', "closed"],
  applicationStatusOption: ["selected", 'not selected'],
  verifyUserOption: {
    pending: 'pending',
    rejected: 'rejected',
    accepted: 'accepted'
  },
  reportStatusOption: {
    pending: "pending",
    accepted: "accepted",
    deleted: "deleted"
  },
  reportStatusOption: ["pending", 'accepted', 'deleted'],
  genderOption: ["male", "female"],
  defaultDistance: 800000,
  pageDataCount: 10,
  pageChatCount: 10,
  maxCreatedPost: 5,
  maxImgUploadCount: 3,
  bookingStatus: ["requested", "confirmed", "rejected", "cancelled"],
  dev: {
    port: 443,
    nPort: 80,
    mongoUri:
      //"mongodb://root:root@ac-2awylsx-shard-00-00.ggkevot.mongodb.net:27017,ac-2awylsx-shard-00-01.ggkevot.mongodb.net:27017,ac-2awylsx-shard-00-02.ggkevot.mongodb.net:27017/?replicaSet=atlas-xnzvou-shard-0&ssl=true&authSource=admin",
      "mongodb://localhost:27017/project",
    s3ServerHost: "https://yarifi.s3.ap-south-1.amazonaws.com/",
    s3DelsteServerHost: "https://yarifi.s3.amazonaws.com/",
    gmailId: "",
    gmailPassword: "",
    optTime: 60 * 15,
    expTime: 60 * 60 * 24 * 365, //365days
    tempExpTime: 60 * 60 * 24 * 30, //30days
    saltRound: 10,
    accessTokenSecret: '43bbdb701e3e9d343ace43ff9df842451109039c3b75df25d9b883ded0512d336bdcaeae5b68ccf763279d9ea0aa739db668d7ef2adc9c92b3ceb19de9621ce7',
    accessTokenTime: '3000m',
    refressTokenSecret: '6ad5e0898ed3fff0b0c48a2b9231ba60d0a55b2b5d4bfda8a173b9616cfc686ccd3009306c8425d981fcbebd1e4dade2ea0a2b95bd3104161ad0b998f7f9703c',
    refreshTokenTime: '60d',
    jwtSecret: "efrtergfdfgfs#dfssdsdfcjfyretfds",
    cryptoSecret: "sdrtergfdfgfs#dfssdsdfcjfyret@dd",
    resetPasswordUrl: 'http://project-s.com/check/',
    resetPasswordValidity: 15,
    otpLimit: 5,
    chatLength: 30,
    apiEncryption: false,
    apiEncryptionSecret: 'secret',
    AWS_S3_BUCKET_NAME: 'yarifi',
    AWS_S3_ACCESS_KEY_ID: 'AKIAZ2ZZNCSLSWE6IARW',
    AWS_S3_SECRET_ACCESS_KEY: '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'
  },
  prod: {
    port: 443,
    nPort: 80,
    mongoUri:
      'mongodb://root:root@ac-2awylsx-shard-00-00.ggkevot.mongodb.net:27017,ac-2awylsx-shard-00-01.ggkevot.mongodb.net:27017,ac-2awylsx-shard-00-02.ggkevot.mongodb.net:27017/?replicaSet=atlas-xnzvou-shard-0&ssl=true&authSource=admin',
    s3ServerHost: "https://yarifi.s3.ap-south-1.amazonaws.com/",
    s3DelsteServerHost: "https://yarifi.s3.amazonaws.com/",
    gmailId: "help.yarifi@gmail.com",
    gmailPassword: "hihlfdxccsahfplo",
    optTime: 60 * 15,
    expTime: 60 * 60 * 24 * 365, //365day
    tempExpTime: 60 * 60 * 24 * 30, //30day
    saltRound: 10,
    accessTokenSecret: '43bbdb701e3e9d343ace43ff9df84245a_Sw33_3et.redf(ox)jumP[s4nd!5lI1Lide30v3rthe#DmI1g*h8yg0dq*$q2fj(_8d7ef2adc9c92b3ceb19de9621ce7',
    accessTokenTime: '1d',
    refressTokenSecret: '6ad5e0898ed3fff0b0c48a2b9231ba60d05lI1Lide30v3rthe#DmI1g*h8yg0dq*$q2fj(_8b95bd3104161ad0b998f7f9703c',
    refreshTokenTime: '180d',
    jwtSecret: "5lI1Lide30v3rthe#DmI1g*h8yg0dq45a_Sw33_3et.*$q2fj(_8",
    cryptoSecret: "5lI1Lide089830v3rthe#6ad5ea_Sw33_3et.*$q2f089wdj(_8",
    resetPasswordUrl: 'http://project-s.com/check/',
    resetPasswordValidity: 15,
    otpLimit: 5,
    chatLength: 200,
    apiEncryption: true,
    apiEncryptionSecret: '60d05lI1Lide30v3rthe#DmI1g*h8yg0dq*$q2fj(_8b9',
    AWS_S3_BUCKET_NAME: 'yarifi',
    AWS_S3_ACCESS_KEY_ID: 'AKIAZ2ZZNCSLSWE6IARW',
    AWS_S3_SECRET_ACCESS_KEY: '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'
  },
};

module.exports = config;
