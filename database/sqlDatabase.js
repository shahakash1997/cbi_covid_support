const sql = require('mssql');
const dotenv = require("dotenv");
dotenv.config();

const sqlConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.SERVER,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: false, // for azure
        trustServerCertificate: true // change to true for local dev / self-signed certs
    }
}
sql.on('error', err => {
    console.log(err)
})


let dbService = null;

module.exports = class MSSQLService {
    static getDbServiceInstance() {
        return dbService ? dbService : new MSSQLService();
    }

    getCovidSupportOptions() {
        return new Promise((resolve, reject) => {
            sql.connect(sqlConfig).then(pool => {
                return pool.request().query('select * from '+process.env.SUPPORT_OPTION_TABLE)
            }).then(result => {
                resolve(result);
            }).catch(err => {
                reject(err);
            });

        });
    }

    getAllPatientsByEmployeeID(empID) {
        return new Promise((resolve, reject) => {
            const queryStr = `select * from Tbl_Patient where StaffEmpNo=${empID}`;
            sql.connect(sqlConfig).then(pool => {
                return pool.request().query(queryStr)
            }).then(result => {
                resolve(result.recordsets[0]);
            }).catch(err => {
                reject(err.message);
            });
        });
    }

}

