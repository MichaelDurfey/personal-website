require('dotenv').config();
const axios = require('axios');

const { EMAIL_TOKEN } = process.env;
exports.handler = async event => {
  const { email } = JSON.parse(event.body).payload;
  console.log(`Recieved a submission: ${email}`);
  return axios({
    method: 'post',
    headers: {
      Authorization: `Token ${EMAIL_TOKEN}`,
      'Content-Type': 'application/json',
    },
    url: 'https://api.buttondown.email/v1/subscribers',
    data: JSON.stringify({ email }),
  })
    .then(data => {
      console.log(`Submitted to Buttondown:\n ${data}`);
    })
    .catch(error => {
      console.log('Error!:', error);
      return { statusCode: 422, body: String(error) };
    });
};
