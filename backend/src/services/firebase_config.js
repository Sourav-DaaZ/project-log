const admin = require("firebase-admin");

const serviceAccount = require("./yarifi-firebase-adminsdk-kp4rr-099d302f31.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

module.exports = admin