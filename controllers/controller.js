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
        const quoteId = req.body.quoteId;
        const fileName = req.body.file.Name;
        const bytes = req.body.file.Bytes;
        const QuoteType = req.body.quoteType;
        const BatchName = quoteId + fileName;
        
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
                                                abbyycalls.GetDocumentResultsList(SessionId, BatchId, DocumentId)
                                                .then( data => {
                                                    console.log(data);
                                                    console.log("here");
                                                    const DocumentResult = data;
                                                    abbyycalls.LoadDocumentResult(SessionId, BatchId, DocumentId, fileName)
                                                    .then( data => {
                                                        console.log(data.file.Name);
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
                                        abbyycalls.GetDocumentResultsList(SessionId, BatchId, DocumentId)
                                        .then( data => {
                                            console.log(data);
                                            console.log("here");
                                            const DocumentResult = data;
                                            abbyycalls.LoadDocumentResult(SessionId, BatchId, DocumentId, fileName)
                                            .then( data => {
                                                console.log(data.file.Name);
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