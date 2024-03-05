const https = require("https");
const axios = require("axios");
const agent = new https.Agent({
  rejectUnauthorized: false,
});

const GoogleAPI = async (req, res) => {
  console.log("hello")
  try {
   const response = await axios.get("http://localhost:8080/api/auth/google")
  } catch (error) {
    return res.status(400).json({ message: error.message, status: false });
  }
};

module.exports = GoogleAPI;
