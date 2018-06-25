
const mysql = require("mysql2");
const cfgData = require("./configLoader");

const _ = {
    requestList: {
        listSi:
            "SELECT * FROM `mfm`.`si`;",
        infoSI:
            "SELECT si.name AS name, "
                + "(SELECT COUNT(*) FROM `mfm`.`domain` d WHERE d.`id_si` = si.`id`) AS nbDomain "
            + "FROM `mfm`.`si` AS si "
            + "WHERE si.`id` = ?;",
        listDomainBySI:
            "SELECT do.*, "
                + "(SELECT COUNT(*) FROM dysfunction d "
                    + "LEFT JOIN `service` AS s ON s.`id` = d.`id_service` "
                    + "WHERE do.id = s.id_domain AND d.resolveDate IS NULL) AS nbDysfunction, "
                + "(SELECT d.impact_gravity FROM dysfunction d "
                    + "LEFT JOIN `service` AS s ON s.`id` = d.`id_service` "
                    + "WHERE do.id = s.id_domain AND d.resolveDate IS NULL "
                    + "ORDER BY d.impact_gravity DESC LIMIT 1) AS maxGravityImpact "
            + "FROM mfm.domain do "
            + "WHERE do.id_si = ?;",
        listDysfunctionByService:
            "SELECT * FROM dysfunction WHERE id_service = ? AND resolveDate IS NULL;"
    }
};

class DataBaseAccess{

    constructor(){
        this.pool = mysql.createPool(cfgData.connectionData);
    }

    _dbrequest(queryData, callback){
        this.pool.getConnection((err, connection) => {
            if(err){
                console.error("[DataBaseAccess]Connexion on DB error : ", err);
            }else{
                connection.execute(
                    ...queryData,
                    (error, results, fields) => {
                        connection.release();
                        if (error){
                            console.error("[DataBaseAccess]", error);
                            return;
                        }
                        return callback({fields: fields, results: results});
                    }
                );
            }
        });
    }

    dbRequest(dataRequest, callback){
        const keyword = dataRequest.keyword;
        const request = _.requestList[keyword];
        const typeofRequest = typeof request;
        if(typeofRequest === "undefined"){
            const error = "[DataBaseAccess] '" + keyword
                + "' not exist. Available list is : " + Object.keys(_.requestList) + Object.keys(_.requestSecureList);
            console.error(error);
        }else{
            const requestParam = dataRequest.requestParam;
            const superCallback = (dataSupplied) => {
                return callback(dataSupplied);
            };
            this._dbrequest([request, requestParam], superCallback);
        }
    }

}

module.exports = DataBaseAccess;