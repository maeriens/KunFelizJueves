const { TwitterApi } = require('twitter-api-v2');
require('dotenv').config();

const { API_KEY, API_SECRET, ACCESS_TOKEN, ACCESS_SECRET } = process.env;

const client = new TwitterApi({
  appKey: API_KEY,
  appSecret: API_SECRET,
  accessToken: ACCESS_TOKEN,
  accessSecret: ACCESS_SECRET
});

const twittear = async (texto, sinVideo) => {
  try {
    if (sinVideo) {
      await client.v1.tweet(`${texto}, @AgueroSergioKun!`);
    } else {
      const mediaId = await client.v1.uploadMedia('felizJueves.mp4');
      await client.v1.tweet(`${texto}, @AgueroSergioKun!`, { media_ids: false && [mediaId] });
    }
  } catch (error) {
    console.log(error);
  }
}

const hoy = new Date();

const cumple = hoy.getMonth() === 5 && hoy.getDate == 2;
const esJueves = hoy.getDay() === 4;
if (esJueves && cumple) {
  twittear('Feliz jueves y feliz cumpleaños')
} else if (esJueves) {
  twittear('Feliz jueves');
} else if (cumple) {
  twittear('Feliz cumpleaños', true);
}