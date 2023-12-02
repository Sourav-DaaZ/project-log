import { API } from './apiConstant';

const defaultValue = {
    env: API.currentEnv,
    debuggingMode: false,
    otpLength: 6,
    paginationLength: 5,
    paginationChatLength: 3,
    channelID: 'secret123',
    bookingStatus: ["requested", "confirmed", "rejected", "cancelled"],
    imageUploadOptions: {
        includeBase64: true,
        maxWidth: 500,
        maxHeight: 500,
        quality: .5,
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
    },
    maxImageSize: 1000000,
    verifyUserOption: {
        pending: 'pending',
        rejected: 'rejected',
        accepted: 'accepted'
    },
    reportType: {
        bug: 'bug',
        post: 'post',
        code: 'code',
    },
    reportAction: {
        pending: "pending",
        accepted: "accepted",
        deleted: "deleted"
    },
    dev: {
        googleClientID: '594622207776-d55nisfp22flretlovod9iuhtii707s9.apps.googleusercontent.com',
        apiEncryptionSecret: 'secret',
        apiEncryption: false,
    },
    prod: {
        googleClientID: '594622207776-ahev4umk18f6llojcal8v8tbdkoe5jv3.apps.googleusercontent.com',
        apiEncryptionSecret: '60d05lI1Lide30v3rthe#DmI1g*h8yg0dq*$q2fj(_8b9',
        apiEncryption: true,
    },
    qa: {
        googleClientID: '594622207776-ahev4umk18f6llojcal8v8tbdkoe5jv3.apps.googleusercontent.com',
        apiEncryptionSecret: '60d05lI1Lide30v3rthe#DmI1g*h8yg0dq*$q2fj(_8b9',
        apiEncryption: true,
    },
    appVersion: {
        android: 1.0,
        ios: 1.0
    }
}

export default defaultValue;