const tedious = require("tedious");
const Connection = tedious.Connection;
const Request = require('tedious').Request;
const TYPES = require('tedious').TYPES;
const async = require('async');


const config = {
    server: "localhost",
    authentication: {
        type: "default",
        options: {
            userName: "sa", // update me
            password: "accCBI@2020", // update me
        },
    },
    options: {
        validateBulkLoadParameters: false,
        encrypt: false,
    },
};

function handleConnection(err) {
    if (err) console.error("error connecting :-(", err);
    else console.log("successfully connected!!");
}

let connection = new Connection(config);
connection.on("connect", handleConnection);


let dbService = null;

module.exports = class MSDBService {
    static getDbServiceInstance() {
        return dbService ? dbService : new MSDBService();
    }

    connect() {
        connection.connect();
    }

    getCovidSupportOptions() {
        try {
            return new Promise(((resolve, reject) => {
                const request = new Request(
                    'select * from cbi_covid_support.support_options;;',
                    function (err, rowCount, rows) {
                        if (err) {
                            reject(new Error(err.message));

                        } else {
                            console.log(rows)
                            resolve(rows);
                        }
                    });
                connection.execSql(request);
            }));

        } catch (error) {
        }
    }

};

