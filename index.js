require("dotenv").config();

const Twit = require("twit");
const fetch = require("node-fetch");
const cron = require("cron");

const T = new Twit({
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_API_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

const dadJoke = new cron.CronJob("00 00 */4 * * *", async () => {
  try {
    const resp = await fetch("https://icanhazdadjoke.com/", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
    const data = await resp.json();
    T.post("statuses/update", { status: data.joke }, tweeted);
  } catch (e) {
    console.log(e);
  }
});

const tweeted = (err, data, response) => {
  if (err) return console.log(err);
};

dadJoke.start();
