const express = require('express');
const router = express.Router();
const DBService = require("../database/databaseConfig");



router.get('/getHelpRequests/:patientID',(req,res,next)=>{
    DBService.getDbServiceInstance()
    .getRequestedSupportByPatientID(req.params.patientID)
    .then(data=>{
        res.status(200);
        res.json({data : data});
    }).catch(err=>{
        res.status(400);
        res.json({err: err,errorMessage : "Unable to find Requests"})
    })

});


router.get('/getComments/:helpReqID',(req,res,next)=>{

    DBService.getDbServiceInstance()
    .getCommentsByReqID(req.params.helpReqID)
    .then(data=>{
        res.status(200);
        res.json({data : data});
    }).catch(err=>{
        res.status(400);
        res.json({err: err,errorMessage : "Unable to find Requests"})
    })


});


router.post('/addComment/',(req,res,next)=>{
    console.log(req.body);
    DBService.getDbServiceInstance()
    .addNewComment(req.body)
    .then(data=>{
        res.status(200);
        res.json({data : 'Comment added successfully'});
    }).catch(err=>{
        res.status(400);
        res.json({err: err.message,errorMessage : "Unable to add comment"})
    })


});




router.get('/getSupportOptions',(req,res)=>{
    DBService.getDbServiceInstance()
    .getCovidSupportOptions()
    .then(data=>{res.status(200);
    res.json({data : data});
})
.catch(err=>{
    res.status(400);
    res.json({errorMessage : "Data Not found"})
})


});

module.exports = router;
