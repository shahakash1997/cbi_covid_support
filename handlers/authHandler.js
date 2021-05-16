const express = require('express');
const router = express.Router();
const DBService = require("../database/databaseConfig");



router.get('/employee/:empID',(req,res,next)=>{
    DBService.getDbServiceInstance()
    .getEmployeeByID(req.params.empID)
    .then(data=>{
        res.status(200);
        res.json({data : data});
    }).catch(err=>{
        res.status(400);
        res.json({err: err,errorMessage : "Unable to find Employees"})
    })

});

router.post('/employee/updateDetails',(req,res,next)=>{
    DBService.getDbServiceInstance()
    .updateEmailAndPhone(req.body)
    .then(data=>{
        res.status(200);
        res.json({success : true,message : "data updated successfully"});
    }).catch(err=>{
        res.status(400);
        res.json({err: err,errorMessage : "Unable to update"})
    })

});

module.exports = router;
