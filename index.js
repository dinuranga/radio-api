const express = require("express");
const axios = require("axios");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

const GOOGLE_SHEET_API = "https://sheets.googleapis.com/v4/spreadsheets";
const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID;
const GOOGLE_SHEET_NAME = process.env.GOOGLE_SHEET_NAME;
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

const googleSheetUrl = `${GOOGLE_SHEET_API}/${GOOGLE_SHEET_ID}/values/${GOOGLE_SHEET_NAME}?key=${GOOGLE_API_KEY}`;

// Define a function to fetch and process data
async function fetchData() {
  try {
    const response = await axios.get(googleSheetUrl);
    const data = response.data.values;

    // Remove the first item (header row) if needed
    data.shift();

    const channels = data.map((channelData, id) => ({
      channelName: channelData[0],
      streamUrl: channelData[1],
      isGoogleAdsEnabled: channelData[2] === "YES",
      language: channelData[3],
      genre: channelData[4],
    }));

    return channels;
  } catch (error) {
    throw error;
  }
}

app.get("/", (req, res) => {
  res
    .status(200)
    .send(
      "<h2>Radio API</h2><p>End-Point : <code><a href='/api'>/api</a></code></p>"
    );
});

app.get("/api", async (req, res) => {
  try {
    channels = await fetchData();
    res.status(200).json(channels);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "An error occurred." });
  }
});

app.get("/api/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10); // Parse the 'id' parameter as an integer

    try {
      channels = await fetchData();
      if (!isNaN(id) && id < channels.length) {
        res.status(200).json(channels[id]);
      } else {
        res.status(404).json({ error: "No records found !" });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).json({ error: "An error occurred." });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "An error occurred." });
  }
});

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
