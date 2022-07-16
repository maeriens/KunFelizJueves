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
      await client.v1.tweet(`${texto}, @AgueroSergioKun!`, { media_ids: [mediaId] });
    }
  } catch (error) {
    console.log('######## PUM ########');
    console.log(error);
    console.log('######## PUM ########');
  }
}

const hoy = new Date();

const cumple = hoy.getMonth() === 5 && hoy.getDate == 2;
const esJueves = hoy.getDay() === 4;

if (esJueves && cumple) {
  console.log('Es jueves y es el cumple del Kun!');
  twittear('Feliz jueves y feliz cumpleaños');
} else if (esJueves) {
  console.log('Es jueves!');
  twittear('Feliz jueves');
} else if (cumple) {
  console.log('Es el cumple del Kun!');
  twittear('Feliz cumpleaños', true);
} else {
  console.log('Nada importante pasa hoy');
}
