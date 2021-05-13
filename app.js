const express = require("express");
const app = express();
const dbService = require("./database/databaseConfig");
const patientGHandler = require("./handlers/patientHandler");
const covidSupport = require("./handlers/covidSupport");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");


app.use(morgan())


dotenv.config();

dbService.getDbServiceInstance().connect();


app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use("/patient", patientGHandler);
app.use("/covidSupport", covidSupport);

app.listen(process.env.PORT, () => {
  console.log("Listening on Port " + process.env.PORT);
});
