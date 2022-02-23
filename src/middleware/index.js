const admin = require("../config/firebase-config");
const {getAuth} = require('firebase-admin')

class Middleware {
  async decodeToken(req, res, next) {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    try {
      const decodeValue = await admin.auth().verifyIdToken(token);
      

      if (decodeValue) {
          req.user = decodeValue
        return next();
      }

      return res.json({ message: "Unauthorize" });
    } catch (e) {
      return res.json({
        message: e.message,
        stack: e.stack,
      });
    }
  }
}

module.exports = new Middleware();
