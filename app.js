const express = require("express");
const cors = require("cors");
const {
  isContributorRegisteredInDGII,
  getContributorDGIIData,
} = require("./utils/dgiiCrawler");

const app = express();

//CORS
app.use(cors());

//---Routes---
app.get("/", function (req, res) {
  res.send("Hello World!!!");
});

app.get("/api/v1/rnc/:rnc", async function (req, res) {
  try {
    const contributorData = await getContributorDGIIData(req.params.rnc);

    res.status(200).json({
      status: "success",
      data: contributorData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Something went wrong",
    });
  }
});

app.get("/api/v1/rnc/:rnc/isRegistered", async function (req, res) {
  try {
    const isContributorRegistered = await isContributorRegisteredInDGII(
      req.params.rnc
    );

    res.status(200).json({
      status: "success",
      isContributorRegistered,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Something went wrong",
    });
  }
});

//Start server
const port = process.env.PORT || 8080;

app.listen(port, function () {
  console.log("App listening on port " + port + "...");
});
