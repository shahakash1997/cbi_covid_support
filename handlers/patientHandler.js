const express = require("express");
const router = express.Router();
const DBService = require("../database/databaseConfig");
const Utils = require("../utils/utils");

router.get("/getPatient/:empID", async (req, res, next) => {
  const empID = req.params.empID;
  DBService.getDbServiceInstance()
    .getAllPatientsByEmployeeID(empID)
    .then((data) => {
      res.status(200);
      res.json({ data: data });
    })
    .catch((err) => {
      res.status(400);
      res.json({ data: [] });
    });
});


router.get('/getPatientByRO/:region',async (req,res,next)=>{
  DBService.getDbServiceInstance()
    .getAllPatientsByLocation(req.params.region)
    .then((data) => {
      res.status(200);
      res.json({ data: data });
    })
    .catch((err) => {
      res.status(400);
      res.json({ err:err,errorMessage: "No data found"});
    });

});

router.get("/getRequirementsByPID/:patientID", (req, res, next) => {
  const pID = req.params.patientID;
  DBService.getDbServiceInstance()
    .getRequestedSupportByPatientID(pID)
    .then((data) => {
      res.status(200);
      res.json({ data: data });
    })
    .catch((err) => {
      res.status(400);
      res.json({ error: err, errorMessage: "No data found" });
    });
});

router.post("/addPatient", async (req, res, next) => {
  console.log(req.body)
  var check = Utils.checkForMandatoryFields(req.body, [
    "empID",
    "name",
    "age",
    "relation",
    "mobile",
    "selectedRegion",
    "selectedZone",
    "gender",
    "support_requests",
  ]);
  if (check) {
    DBService.getDbServiceInstance()
      .insertNewPatient(req.body)
      .then((data) => {
        res.status(200);
        res.json({ data: "Patient added successfully" });
      })
      .catch((err) => {
        res.status(400);
        res.json({ error: err, errorMessage: "unable to add patient" });
      });
  } else {
    res.status(400);
    res.json({ error: "Patient data is missing" });
  }
});

module.exports = router;
