const express = require("express");
const app = express();
const dbService = require("./database/databaseConfig");
const patientGHandler = require("./handlers/patientHandler");
const covidSupport = require("./handlers/covidSupport");
const authSupport = require('./handlers/authHandler');
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
app.use(morgan())
dotenv.config();


const dbConfig = {
  host: process.env.HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

dbService.getDbServiceInstance().connect(dbConfig);


app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use("/patient", patientGHandler);
app.use("/covidSupport", covidSupport);
app.use("/auth",authSupport);

app.listen(process.env.PORT, () => {
  console.log("Listening on Port " + process.env.PORT);
});
