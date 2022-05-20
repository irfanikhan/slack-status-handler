const express = require("express");
const { WebClient } = require("@slack/web-api");

const app = express();
app.use(express.json());

const web = new WebClient(
  "xoxb-3138624757526-3138757148166-tXHoIVQhGBgyxCxDamQ05fIu"
);

app.get("/", (req, res) => {
  res.json("Post your status by navigating to /api/post-status");
});

app.post("/api/post-status", (req, res) => {
  if (!req.body.message || !req.body.name) {
    res.status(400);
    res.json({ message: "Name and message are required." });
  } else {
    web.chat
      .postMessage({
        channel: req.body.channel || "#general",
        text: req.body.message,
        username: req.body.name,
        icon_url: req.body.icon_url,
      })
      .then((response) => {
        res.send(response);
      })
      .catch((e) => {
        res.send(e);
      });
  }
});

app.listen(process.env.PORT || 3000)