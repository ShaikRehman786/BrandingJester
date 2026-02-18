const admin = require("firebase-admin");
const serviceAccount = require("../firebase-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


const sendPushNotification = async (phone) => {

    if (!global.adminToken) return;

    const message = {
        notification: {
        title: "🚀 New User",
        body: `📞 ${phone}`
        },
        token: global.adminToken
    };

    await admin.messaging().send(message);
    };

module.exports = sendPushNotification;
