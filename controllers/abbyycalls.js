const axios = require('axios');

const url = 'http://192.168.10.14/FlexiCapture12/Server/API/v1/Json'

const roleType = 12;
const stationType = 10;
const projectId = 5;

async function OpenSession(){
    try{
        const response = await axios.post(url,
            {
                "MethodName":"OpenSession",
                "Params": {
                    "roleType" : roleType,
                    "stationType" : stationType
                }
            }, {
            headers: { 
              'Authorization' : 'Basic ' + 'ZmlkZWxpdHlob1xhYmJ5eWFwaXVzcjpAYmIxMTVSdg==',
              'Content-Type' : 'application/json' }
            })
            return response.data;
        }
    catch (err){
        console.log(err);
        console.log("open session");
    }
}

async function AddNewBatch(SessionId, BatchName){
    try{
        const response = await axios.post(url,
            {
                "MethodName":"AddNewBatch",
                "Params": {
                    "sessionId" :SessionId,
                    "projectId" : projectId,
                    "batch" : {
                        "Id": 0,
                        "Name": BatchName,
                        "ProjectId": 5,
                        "BatchTypeId": 0,
                        "Priority": 0,
                        "Description": "",
                        "HasAttachments": false,
                        "Properties": [],
                        "CreationDate": 132581107800000000,
                        "DocumentsCount": 2,
                        "PagesCount": 2,
                        "RecognizedSymbolsCount": 9,
                        "VerificationSymbolsCount": 0,
                        "UncertainSymbolsCount": 0,
                        "AssembledDocumentsCount": 2,
                        "RecognizedDocumentsCount": 2,
                        "VerifiedDocumentsCount": 0,
                        "ExportedDocumentsCount": 0,
                        "StageExternalId": 700,
                        "ErrorText": "",
                        "OwnerId": 0,
                        "CreatorId": 5,
                        "SLAStartDate": 132581107800000000,
                        "SLAExpirationDate": 0,
                        "ElapsedProcessingSeconds": 22
                    },
                    "ownerId": 0
                }
            }, {
            headers: { 
              'Authorization' : 'Basic ' + 'ZmlkZWxpdHlob1xhYmJ5eWFwaXVzcjpAYmIxMTVSdg==',
              'Content-Type' : 'application/json' }
            })
            return response.data;
        }
    catch (err){
        console.log(err);
        console.log("addnewbatch");
    }
}

async function OpenBatch(SessionId, BatchId){
    try{
        const response = await axios.post(url,
            {
                "MethodName":"OpenBatch",
                "Params": {
                    "sessionId" : SessionId,
                    "batchId" : BatchId
                }
            }, {
            headers: { 
              'Authorization' : 'Basic ' + 'ZmlkZWxpdHlob1xhYmJ5eWFwaXVzcjpAYmIxMTVSdg==',
              'Content-Type' : 'application/json' }
            })
            return response.data;
        }
    catch (err){
        console.log(err);
        console.log("OpenBatch");
    }
}

async function AddNewDocument(SessionId, BatchId, fileName, bytes){
    try{
        const response = await axios.post(url,
            {
                "MethodName":"AddNewDocument",
                "Params": {
                        "sessionId" : SessionId,
                        "document": {
                                "Id": 1,
                                "BatchId": BatchId,
                                "ParentId": 0,
                                "DocIndex": 0,
                                "TemplateName": "",
                                "ProcessingStageType": 0,
                                "Comment": "",
                                "Pages": [],
                                "IsProcessed": false,
                                "HasProcessingErrors": false,
                                "HasDocumentErrors": false,
                                "ErrorText": "",
                                "ExternalId": "",
                                "Properties": [],
                                "Priority": 0,
                                "FileVersion": 0,
                                "OwnerId": 0,
                                "StageExternalId": 0,
                                "TaskId": 0,
                                "UncertainSymbols": 0,
                                "VerificationSymbols": 0,
                                "TotalSymbols": 0,
                                "HasErrors": false,
                                "HasWarnings": false,
                                "HasAssemblingErrors": false,
                                "HasAttachments": false,
                                "Flags": 0,
                                "ChildrenOrder": []
                            },
                        "file" : {
                            "Name" : fileName,
                            "Bytes" : bytes
                            },
                            "excludeFromAutomaticAssembling" : false,
                            "previousItemId" : 0
                        }    
                    }, {
            headers: { 
              'Authorization' : 'Basic ' + 'ZmlkZWxpdHlob1xhYmJ5eWFwaXVzcjpAYmIxMTVSdg==',
              'Content-Type' : 'application/json' }
            })
            return response.data;
        }
    catch (err){
        console.log(err);
        console.log("Addnewdocument");
    }
}

async function ProcessBatch(SessionId, BatchId){
    try{
        const response = await axios.post(url,
            {
                "MethodName":"ProcessBatch",
                "Params": {
                    "sessionId" : SessionId,
                    "batchId" : BatchId
                }
            }, {
            headers: { 
              'Authorization' : 'Basic ' + 'ZmlkZWxpdHlob1xhYmJ5eWFwaXVzcjpAYmIxMTVSdg==',
              'Content-Type' : 'application/json' }
            })
            return response.data;
        }
    catch (err){
        console.log(err);
        console.log("processbatch");
    }
}

async function LoadDocumentResult(SessionId, BatchId, DocumentId, fileName){
    try{
        const response = await axios.post(url,
            {
                "MethodName":"LoadDocumentResult",
                "Params": {
                    "sessionId" : SessionId,
                    "batchId" : BatchId,
                    "documentId" : DocumentId,
                    "fileName" : fileName,
                    }
            }, {
            headers: { 
              'Authorization' : 'Basic ' + 'ZmlkZWxpdHlob1xhYmJ5eWFwaXVzcjpAYmIxMTVSdg==',
              'Content-Type' : 'application/json' }
            })
            return response.data;
        }
    catch (err){
        console.log(err);
        console.log("LoadDocumentresult");
    }
}



module.exports = {
    OpenSession : OpenSession,
    AddNewBatch : AddNewBatch,
    OpenBatch : OpenBatch,
    AddNewDocument : AddNewDocument,
    ProcessBatch : ProcessBatch,
    LoadDocumentResult : LoadDocumentResult
}