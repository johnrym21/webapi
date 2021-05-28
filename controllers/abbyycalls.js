const axios = require('axios');

const url = 'http://192.168.10.14/FlexiCapture12/Server/API/v1/Json'

//steps to ocr an image
async function OpenSession(){
    try{
        const response = await axios.post(url,
            {
                "MethodName":"OpenSession",
                "Params": {
                    "roleType" : 12,
                    "stationType" : 10
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

async function GetProjects(){
    try{
        const resp = await axios.post(url,
            {
                "MethodName":"GetProjects",
                "Params": {
                }
            }, {
            headers: { 
              'Authorization' : 'Basic ' + 'ZmlkZWxpdHlob1xhYmJ5eWFwaXVzcjpAYmIxMTVSdg==',
              'Content-Type' : 'application/json' }
            })
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    catch (err){
        console.log(err);
    }
}

async function AddNewBatch(SessionId, BatchName){
    try{
        const response = await axios.post(url,
            {
                "MethodName":"AddNewBatch",
                "Params": {
                    "sessionId" :SessionId,
                    "projectId" : 5,
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

async function AddNewImage(){
    try{
        const resp = await axios.post(url,
            {
                "MethodName":"AddNewImage",
                "Params": {
                    "sessionId" : 16822,
                    "batchId" : 33,
                    "file" : {
                        "Name" : "testimage",
                        "Bytes" : "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"
                    }
                }    
            }, {
            headers: { 
              'Authorization' : 'Basic ' + 'ZmlkZWxpdHlob1xhYmJ5eWFwaXVzcjpAYmIxMTVSdg==',
              'Content-Type' : 'application/json' }
            })
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    catch (err){
        console.log(err);
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

async function GetDocuments(){
    try{
        const resp = await axios.post(url,
            {
                "MethodName":"GetDocument",
                "Params": {
                    "sessionId" : 16822,
                    "batchId" : 33,
                    }
            }, {
            headers: { 
              'Authorization' : 'Basic ' + 'ZmlkZWxpdHlob1xhYmJ5eWFwaXVzcjpAYmIxMTVSdg==',
              'Content-Type' : 'application/json' }
            })
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    catch (err){
        console.log(err);
    }
}

async function LoadDocumentResult(){
    try{
        const response = await axios.post(url,
            {
                "MethodName":"LoadDocumentResult",
                "Params": {
                    "sessionId" : 16822,
                    "batchId" : 33,
                    "documentId" : 1,
                    "fileName" : "",
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

async function CloseBatch(){
    try{
        const resp = await axios.post(url,
            {
                "MethodName":"CloseBatch",
                "Params": {
                    "sessionId" : 1,
                    "batchId" : 1
                }
            }, {
            headers: { 
              'Authorization' : 'Basic ' + 'ZmlkZWxpdHlob1xhYmJ5eWFwaXVzcjpAYmIxMTVSdg==',
              'Content-Type' : 'application/json' }
            })
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    catch (err){
        console.log(err);
    }
}

async function AddNewDocument(SessionId, BatchId, FileName, Bytes){
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
                            "Name" : FileName,
                            "Bytes" : Bytes
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

//methods might be needed

async function GetBatch(){
    try{
        const resp = await axios.post(url,
            {
                "MethodName":"GetBatch",
                "Params": {
                    "batchId" : 0
                    }
            }, {
            headers: { 
              'Authorization' : 'Basic ' + 'ZmlkZWxpdHlob1xhYmJ5eWFwaXVzcjpAYmIxMTVSdg==',
              'Content-Type' : 'application/json' }
            })
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    catch (err){
        console.log(err);
    }
}

async function GetDocument(){
    try{
        const resp = await axios.post(url,
            {
                "MethodName":"GetDocument",
                "Params": {
                    "sessionId" : 16822,
                    "batchId" : 33,
                    "documentId" : 0
                    }
            }, {
            headers: { 
              'Authorization' : 'Basic ' + 'ZmlkZWxpdHlob1xhYmJ5eWFwaXVzcjpAYmIxMTVSdg==',
              'Content-Type' : 'application/json' }
            })
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    catch (err){
        console.log(err);
    }
}


module.exports = {
    OpenSession : OpenSession,
    GetProjects : GetProjects,
    AddNewBatch : AddNewBatch,
    OpenBatch : OpenBatch,
    AddNewDocument : AddNewDocument,
    ProcessBatch : ProcessBatch,
    LoadDocumentResult : LoadDocumentResult
}