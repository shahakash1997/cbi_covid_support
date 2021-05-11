const mysql = require("mysql");
const logger = require("../utils/logger");
const utils = require("../utils/utils");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "2020",
  database: "cbi_covid_support",
});

let dbService = null;

module.exports = class DBService {
  static getDbServiceInstance() {
    return dbService ? dbService : new DBService();
  }
  connect() {
    connection.connect(function (err) {
      if (err) {
        logger.log("error connecting: " + err.stack);
      }
      logger.debug("connected as id " + connection.threadId);
    });
  }

  endConnection() {
    connection.end();
  }

  async getAllPatientsByEmployeeID(empID) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "select  * from patient where empID = ?";
        connection.query(query, [empID], (err, results) => {
          if (err) {
            reject(new Error(err.message));
          } else resolve(results);
        });
      });

      return response;
    } catch (err) {
      logger.debug(err);
    }
  }

  async getCovidSupportOptions() {
    try {
      return new Promise((resolve, reject) => {
        const query = "select * from support_options;";
        connection.query(query, (err, results) => {
          if (err) {
            reject(new Error(err.message));
          } else {
            resolve(results);
          }
        });
      });
    } catch (error) {
      logger.log(error);
    }
  }

  async insertNewPatient(patient) {
    try {
      return new Promise((resolve, reject) => {
        const query =
          "INSERT INTO patient (empID, name, age, relation, mobile, location, locationZO, locationRO, gender)\
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

        connection.query(
          query,
          [
            patient.empID,
            patient.name,
            patient.age,
            patient.relation,
            patient.mobile,
            patient.location,
            patient.zo,
            patient.ro,
            patient.gender,
          ],
          (err, results) => {
            if (err) {
              reject(new Error(err));
            } else {
              var patientID = results.insertId;
              var responseResults = [];
              responseResults.push(results);
              if (
                patient.support_requests &&
                patient.support_requests.length > 0
              ) {
                for (let i = 0; i < patient.support_requests.length; i++) {
                  const query =
                    "INSERT INTO requested_covid_supports (patient_id, support)\
                  VALUES (?, ?)";
                  connection.query(
                    query,
                    [patientID, patient.support_requests[i]],
                    (err, rs) => {
                      if (err) {
                      } else {
                        responseResults.push(rs);
                      }
                    }
                  );
                }
              }
              resolve(responseResults);
            }
          }
        );
      });
    } catch (error) {
      logger.debug(error);
    }
  }

  getCommentsByReqID(reqID) {
    try {
      return new Promise((resolve, reject) => {
        const query =
          "select * from help_comments where requested_support_id = ?";
        connection.query(query, [reqID], (err, results) => {
          if (err) reject(new Error(err.message));
          else resolve(results);
        });
      });
    } catch (error) {}
  }

  addNewComment(commentData) {
    try {
      return new Promise((resolve, reject) => {
        if (!commentData || !utils.checkForMandatoryFields(commentData,['id','comments','empName','empID'])) reject(new Error("Empty comment body"));
        else {
          const query ='INSERT INTO cbi_covid_support.help_comments (requested_support_id, comments, updateByName, updatedBy, datetime)\
          VALUES (?, ?, ?, ?, ?)'

          connection.query(query, [commentData.id, commentData.comments,commentData.empName,commentData.empID,new Date()],(err,results)=>{
            if(err) reject(new Error(err.message));
            else resolve(results);
          });
        }
      });
    } catch (error) {}
  }

  getRequestedSupportByPatientID(patientID) {
    try {
      return new Promise((resolve, reject) => {
        const query =
          "select  * from requested_covid_supports where patient_id=?";
          console.log(patientID);
        connection.query(query, [patientID], (err, results) => {
          console.log(err);
          console.log(results);
          if (err) reject(new Error(err.message));
          else resolve(results);
        });
      });
    } catch (error) {
      logger.debug(error);
    }
  }
};
