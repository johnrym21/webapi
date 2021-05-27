const db = require("../DataBase/settings.js");
const sql = require('mssql/msnodesqlv8');
const { json } = require('body-parser');

async function checkIfIdExists(ObjectID){
    try{
        let pool = await sql.connect(db);
        let result = await pool.request()
            .input('Enquiry_ID', sql.NVarChar, ObjectID)
            .output('returnObject', sql.Int)
            .execute('IDCheck')
        return result.output.returnObject
    }     
    catch (err){
        console.log(error);
    }
}

async function checkIfDestinationExists(OjectID){
    try {
        let pool = await sql.connect(db)
        let result = await pool.request()
            .input('Enquiry_ID', sql.NVarChar, OjectID)
            .output('returnObject', sql.NVarChar)
            .execute('Destination')
        return result.output.returnObject
    }
    catch (err){
        console.log(error);
    }
}

async function addJson(ReceivedObject) {
    try {
        let pool = await sql.connect(db);
        let insertJson = await pool.request()
            .input('RawObject', sql.NVarChar, ReceivedObject)
            .execute('insertJson')
        return insertJson.recordsets;
    }
    catch (err) {
        console.log(err);
    }
}

async function addEnquiry(Enquiry_ID, Enquiry_Json, Enquiry_Type) {
    try {
        let pool = await sql.connect(db);
        let insertData = await pool.request()
            .input('Enquiry_ID', sql.NVarChar, Enquiry_ID)
            .input('Enquiry_Json', sql.NVarChar, Enquiry_Json)
            .input('Type', sql.NVarChar, Enquiry_Type)
            .execute('insertEnquiry')
        return insertData.recordsets;
    }
    catch (err) {
        console.log(err);
    }
}

async function UpdateEnquiry(Enquiry_ID, DestinationJson, Session_ID, Batch_ID) {
    try {
        let pool = await sql.connect(db);
        let updateData = await pool.request()   
            .input('Enquiry_ID', sql.NVarChar, Enquiry_ID)
            .input('DestinationJson', sql.NVarChar, DestinationJson)
            .input('Session_ID', sql.NVarChar, Session_ID)
            .input('Batch_ID', sql.NVarChar, Batch_ID)
            .execute('updateEnquiry')
        return updateData.recordsets;
    } 
    catch (err) {
        console.log(error);
    }
}



module.exports = {
    addJson : addJson,
    addEnquiry : addEnquiry,
    checkIfIdExists : checkIfIdExists,
    UpdateEnquiry : UpdateEnquiry,
    checkIfDestinationExists : checkIfDestinationExists,
}