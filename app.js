const express = require("express");
const cors = require("cors");
const { getContributorDGIIData } = require("./utils/dgiiCrawler");

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
    const statusCode =
      JSON.stringify(contributorData) != JSON.stringify({}) ? 200 : 404;

    res.status(statusCode).json({
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

app.all("*", (req, res) => {
  res.status(404).json({
    status: "error",
    message: `Can't find ${req.originalUrl} on this server.`,
  });
});

//Start server
const port = process.env.PORT || 8080;

app.listen(port, function () {
  console.log("App listening on port " + port + "...");
});
