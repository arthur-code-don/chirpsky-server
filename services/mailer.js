

const Mailjet = require('node-mailjet');
const dotenv = require("dotenv");

dotenv.config({ path: "../.env" });

const mailjet = Mailjet.apiConnect(
  process.env.MJ_APIKEY_PUBLIC,
  process.env.MJ_APIKEY_PRIVATE,
);

const request = mailjet
  .post('send', { version: 'v3.1' });

exports.sendEmail = async (args) => {
  if (process.env.NODE_ENV === "development") {
    return Promise.resolve();
  } else {
    try {
      const result = await request.request(args);
      console.log(result.body);
      return result.body;
    } catch (err) {
      console.log(err.statusCode);
      throw err;
    }
  }
};
