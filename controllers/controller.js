const { json } = require('body-parser');
const dboperations = require('./dboperations.js');
const abbyycalls = require('./abbyycalls.js')
const token = 'rW9QmS6XrEdfCNRFY28zfz';
const fs = require('fs');
const { database } = require('../DataBase/settings.js');

module.exports = function (app) {

    app.post('/uploadImage', (req, res) => {

        if (req.query.token !== token) {
            return res.sendStatus(401);
        }

        const ReceivedObject = JSON.stringify(req.body, null, 2);
        const quoteId = req.body.requestId;
        const sourceName = req.body.file.Name;
        const ext = req.body.file.Ext;
        const bytes = req.body.file.Bytes;
        const QuoteType = req.body.Type;
        const BatchName = QuoteType + quoteId + sourceName;
        const fileName = QuoteType + quoteId + sourceName + ext;
        
        dboperations.checkIfIdExists(quoteId).then(result => {
            if (result != null) {
                dboperations.checkIfDestinationExists(quoteId).then(result => {
                    if (result != null) {
                        console.log(result)
                        res.end(result)
                    } else {
                        abbyycalls.OpenSession()
                        .then(data => {
                            const SessionId = data.sessionId;
                            console.log(SessionId);
                            abbyycalls.AddNewBatch(SessionId, BatchName)
                            .then(data =>{
                                const BatchId = data.batchId;
                                console.log(BatchId);
                                dboperations.UpdateEnquiry(quoteId, null, SessionId, BatchId);
                                abbyycalls.OpenBatch(SessionId, BatchId)
                                .then(data => {
                                    console.log(data.result);
                                    abbyycalls.AddNewDocument(SessionId, BatchId, fileName, bytes)
                                    .then(data => {
                                        const DocumentId = data.documentId;
                                        console.log(DocumentId);
                                        abbyycalls.ProcessBatch(SessionId, BatchId)
                                        .then(data => {
                                            console.log("batch processed");
                                            abbyycalls.CloseBatch(SessionId, BatchId)
                                            .then(data => {
                                                console.log("batch closed");
                                                for(let x = 1; x < 6; x++){
                                                    setTimeout(() => {
                                                        abbyycalls.GetDocumentResultsList(SessionId, BatchId, DocumentId)
                                                        .then( data => {
                                                            console.log(data.fileNames);
                                                            console.log("here");
                                                            if(data.fileNames == null){
                                                                continue;
                                                            }
                                                            const DocumentResult = data.fileNames;
                                                            abbyycalls.LoadDocumentResult(SessionId, BatchId, DocumentId, DocumentResult)
                                                            .then( data => {
                                                                console.log(data.file.Name);
                                                                const returnObject = data.file.bytes;
                                                                dboperations.UpdateEnquiry(quoteId, returnObject, SessionId, BatchId);
                                                                res.end(data);
                                                            })
                                                            .catch(function (error) {
                                                                res.end(error);
                                                                console.log(error);
                                                            });
                                                        })
                                                        .catch(function (error) {
                                                            res.end(error);
                                                            console.log(error);
                                                        });
                                                    }, 20000);
                                                }
                                            })
                                            .catch(function (error) {
                                                res.end(error);
                                                console.log(error);
                                            });
                                        })
                                        .catch(function (error) {
                                            res.end(error);
                                            console.log(error);
                                        });
                                    })
                                    .catch(function (error) {
                                        res.end(error);
                                        console.log(error);
                                    });
                                })
                                .catch(function (error) {
                                    res.end(error);
                                    console.log(error);
                                });
                            })
                            .catch(function (error) {
                                res.end(error);
                                console.log(error);
                            });
                        })
                        .catch(function (error) {
                            res.end(error);
                            console.log(error);
                        });
                    }
                })
            } else {
                dboperations.addEnquiry(quoteId, ReceivedObject, QuoteType);
                abbyycalls.OpenSession()
                .then(data => {
                    const SessionId = data.sessionId;
                    console.log(SessionId);
                    abbyycalls.AddNewBatch(SessionId, BatchName)
                    .then(data =>{
                        const BatchId = data.batchId;
                        console.log(BatchId);
                        dboperations.UpdateEnquiry(quoteId, null, SessionId, BatchId);
                        abbyycalls.OpenBatch(SessionId, BatchId)
                        .then(data => {
                            console.log(data.result);
                            abbyycalls.AddNewDocument(SessionId, BatchId, fileName, bytes)
                            .then(data => {
                                const DocumentId = data.documentId;
                                console.log(DocumentId);
                                abbyycalls.ProcessBatch(SessionId, BatchId)
                                .then(data => {
                                    console.log("batch processed");
                                    abbyycalls.CloseBatch(SessionId, BatchId)
                                    .then(data => {
                                        console.log("batch closed");
                                        for(let x = 1; x < 6; x++){
                                            setTimeout(() => {
                                                abbyycalls.GetDocumentResultsList(SessionId, BatchId, DocumentId)
                                                .then( data => {
                                                    console.log(data.fileNames);
                                                    console.log("here");
                                                    if(data.fileNames == null){
                                                        continue;
                                                    }
                                                    const DocumentResult = data.fileNames;
                                                    abbyycalls.LoadDocumentResult(SessionId, BatchId, DocumentId, DocumentResult)
                                                    .then( data => {
                                                        console.log(data.file.Name);
                                                        const returnObject = data.file.bytes;
                                                        dboperations.UpdateEnquiry(quoteId, returnObject, SessionId, BatchId);
                                                        res.end(data);
                                                    })
                                                    .catch(function (error) {
                                                        res.end(error);
                                                        console.log(error);
                                                    });
                                                })
                                                .catch(function (error) {
                                                    res.end(error);
                                                    console.log(error);
                                                });
                                            }, 20000);
                                        }
                                    })
                                    .catch(function (error) {
                                        res.end(error);
                                        console.log(error);
                                    });
                                })
                                .catch(function (error) {
                                    res.end(error);
                                    console.log(error);
                                });
                            })
                            .catch(function (error) {
                                res.end(error);
                                console.log(error);
                            });
                        })
                        .catch(function (error) {
                            res.end(error);
                            console.log(error);
                        });
                    })
                    .catch(function (error) {
                        res.end(error);
                        console.log(error);
                    });
                })
                .catch(function (error) {
                    res.end(error);
                    console.log(error);
                });
            }
        })
    })


    app.post('/test', (req, res) => {

        if (req.query.token !== token) {
            return res.sendStatus(401);
        }

        const ReceivedObject = JSON.stringify(req.body, null, 2);
        const quoteId = req.body.quoteId;
        const fileName = req.body.file.Name;
        const bytes = req.body.file.Bytes;
        const QuoteType = req.body.quoteType;
        const BatchName = quoteId + fileName;
        const dir = 'cora-' + quoteId + '-' + fileName;
        const SessionId = 123;
        const BatchId = 123;
        
        dboperations.checkIfIdExists(quoteId).then( result => {
            if (result != null) {
                dboperations.checkIfDestinationExists(quoteId).then(result => {
                    if (result != null) {
                        console.log(result)
                        res.end(result)
                    } else {
                        fs.mkdirSync('../import/' + dir, { recursive: true});

                        fs.writeFileSync('../import/' + dir + '/' + fileName+'.jpg', base64String, {encoding: 'base64'});

                        const returnJson = fs.readFileSync('../export/' + fileName+'.json', {encoding: 'base64'});

                        dboperations.UpdateEnquiry(quoteId, returnJson, SessionId, BatchId);

                        res.end(returnJson);
                    }
                })
            } else {
                dboperations.addEnquiry(quoteId, ReceivedObject, QuoteType);

                fs.mkdirSync('../import/' + dir, { recursive: true});

                fs.writeFileSync('../import/' + dir + '/' + fileName+'.jpg', bytes, {encoding: 'base64'});

                const returnJson = fs.readFileSync('../export/' + fileName+'.json', {encoding: 'base64'});

                dboperations.UpdateEnquiry(quoteId, returnJson, SessionId, BatchId);

                res.end(returnJson);

            }
        })

    })
}