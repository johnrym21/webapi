const { json } = require('body-parser')
const dboperations = require('./dboperations.js')
const abbyycalls = require('./abbyycalls.js')
const ftp = require('./ftp.js')
const token = 'rW9QmS6XrEdfCNRFY28zfz';

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
                        dboperations.addEnquiry(quoteId, ReceivedObject, QuoteType);
                        abbyycalls.OpenSession()
                            .then(data => {
                                const SessionId = data.sessionId;
                                console.log(SessionId);
                                abbyycalls.AddNewBatch(SessionId, BatchName)
                                    .then(data => {
                                        const BatchId = data.batchId;
                                        console.log(BatchId);
                                        dboperations.UpdateEnquiry(quoteId, null, SessionId, BatchId, null);
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
                                                                        const interval = function (i) {
                                                                            console.log(i);
                                                                            return function () {
                                                                                if (i === 6) {
                                                                                    res.json({ "status": "failed", "status description": "failed to OCR" });
                                                                                }
                                                                                else {
                                                                                    abbyycalls.GetDocument(SessionId, BatchId, DocumentId)
                                                                                        .then(data => {
                                                                                            console.log(data);
                                                                                            const ftpFileName = data;
                                                                                            ftp.ftpin(ftpFileName)
                                                                                                .then(data => {
                                                                                                    if (data == true) {
                                                                                                        const returnObject = require("./export/" + ftpFileName + ".json");
                                                                                                        const DataBaseJson = JSON.stringify(returnObject, null, 2);
                                                                                                        dboperations.UpdateEnquiry(quoteId, DataBaseJson, SessionId, BatchId, ftpFileName);
                                                                                                        res.json(returnObject);
                                                                                                    } else {
                                                                                                        setTimeout(interval(++i), 20000);
                                                                                                    }
                                                                                                })
                                                                                                .catch(function (error) {
                                                                                                    console.log(error);
                                                                                                });
                                                                                        })
                                                                                        .catch(function (error) {
                                                                                            res.end(error);
                                                                                            console.log(error);
                                                                                        });
                                                                                }
                                                                            }
                                                                        }
                                                                        setTimeout(interval(0), 20000)
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
                            .then(data => {
                                const BatchId = data.batchId;
                                console.log(BatchId);
                                dboperations.UpdateEnquiry(quoteId, null, SessionId, BatchId, null);
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
                                                                setTimeout(() => {
                                                                    console.log("small timeout");
                                                                }, 5000);
                                                                const interval = function (i) {
                                                                    console.log(i);
                                                                    return function () {
                                                                        if (i === 6) {
                                                                            res.json({ "status": "failed", "status description": "failed to OCR" });
                                                                        }
                                                                        else {
                                                                            abbyycalls.GetDocument(SessionId, BatchId, DocumentId)
                                                                                .then(data => {
                                                                                    console.log(data);
                                                                                    const ftpFileName = data;
                                                                                    if (typeof (ftpFileName) != 'undefined') {
                                                                                        ftp.ftpin(ftpFileName)
                                                                                            .then(data => {
                                                                                                if (data == true) {
                                                                                                    const returnObject = require("../export/" + ftpFileName + ".json");
                                                                                                    const DataBaseJson = JSON.stringify(returnObject, null, 2);
                                                                                                    dboperations.UpdateEnquiry(quoteId, DataBaseJson, SessionId, BatchId, ftpFileName);
                                                                                                    res.json(returnObject);
                                                                                                } else {
                                                                                                    setTimeout(interval(++i), 20000);
                                                                                                }
                                                                                            })
                                                                                            .catch(function (error) {
                                                                                                console.log(error);
                                                                                            });
                                                                                    } else {
                                                                                        setTimeout(interval(++i), 20000);
                                                                                    }
                                                                                })
                                                                                .catch(function (error) {
                                                                                    res.end(error);
                                                                                    console.log(error);
                                                                                });
                                                                        }
                                                                    }
                                                                }
                                                                setTimeout(interval(0), 20000)
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


    app.get('/GetOCRDocument', (req, res) => {

        if (req.query.token !== token) {
            return res.sendStatus(401);
        }

        const ReceivedObject = JSON.stringify(req.body, null, 2);
        const quoteId = req.body.requestId;
        const DocumentId = 1;

        dboperations.checkIfDestinationExists(quoteId).then( result => {
            if (result != null) {
                res.json(result);
            } else {
                dboperations.GetEnqBatchID(quoteId).then( result => {
                    const BatchId = result;
                    abbyycalls.OpenSession().then( data => {
                        const SessionId = data.sessionId;
                        const interval = function (i) {
                            console.log(i);
                            return function () {
                                if (i === 6) {
                                    res.json({ "status": "failed", "status description": "failed to OCR" });
                                }
                                else {
                                    abbyycalls.GetDocument(SessionId, BatchId, DocumentId)
                                        .then(data => {
                                            console.log(data);
                                            const ftpFileName = data;
                                            if (typeof (ftpFileName) != 'undefined') {
                                                ftp.ftpin(ftpFileName)
                                                    .then(data => {
                                                        if (data == true) {
                                                            const returnObject = require("../export/" + ftpFileName + ".json");
                                                            const DataBaseJson = JSON.stringify(returnObject, null, 2);
                                                            dboperations.UpdateEnquiry(quoteId, DataBaseJson, SessionId, BatchId, ftpFileName);
                                                            res.json(returnObject);
                                                        } else {
                                                            setTimeout(interval(++i), 20000);
                                                        }
                                                    })
                                                    .catch(function (error) {
                                                        console.log(error);
                                                    });
                                            } else {
                                                setTimeout(interval(++i), 20000);
                                            }
                                        })
                                        .catch(function (error) {
                                            res.end(error);
                                            console.log(error);
                                        });
                                }
                            }
                        }
                        setTimeout(interval(0), 20000)
                    })
                    .catch(function (error) {
                        res.end(error);
                        console.log(error);
                    });
                })
            }
        })
    })
}