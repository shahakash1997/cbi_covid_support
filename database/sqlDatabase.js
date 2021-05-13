const sql = require('mssql')
const sqlConfig = {
    user: 'sa',
    password: 'accCBI@2020',
    database: process.env.DB_NAME,
    server: 'localhost',
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

class MSSQLService {
    static getDbServiceInstance() {
        return dbService ? dbService : new MSSQLService();
    }

    connect() {
        sql.connect(sqlConfig).then()
        sql.connect(sqlConfig).then(pool => {
            return pool.request()
                .query('select * from cbi_covid_support.support_options')
        }).then(result => {
            console.dir(result.recordsets)
        }).catch(err => {
            console.log(err)
        });
    }


}MSSQLService.getDbServiceInstance().connect();


