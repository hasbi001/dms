const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

const app = express();

app.use(cors());

const db = require("./app/models");

db.sequelize.sync().then(() => {
  console.log("DB synced");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "dms",
    keys: ["DMS_KEY"],
    httpOnly: true,
  })
);

const apiRoutes = require("./app/routes/api.route");
app.use("/api", apiRoutes);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
