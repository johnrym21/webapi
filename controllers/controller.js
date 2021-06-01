const { json } = require('body-parser');
const dboperations = require('./dboperations.js');
const abbyycalls = require('./abbyycalls.js')
const token = 'rW9QmS6XrEdfCNRFY28zfz';


module.exports = function (app) {

    app.post('/uploadImage', (req, res) => {

        if (req.query.token !== token) {
            return res.sendStatus(401);
        }

        const ReceivedObject = JSON.stringify(req.body, null, 2);
        const ObjectID = req.body.quoteId;
        const fileName = req.body.file.Name;
        const bytes = req.body.file.Bytes;
        const QuoteType = ''; //check with rania how to determin the type of the quote
        const BatchName = 'batch test 3';
        //const FileName = 'image.jpg';
        //const Bytes = "111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111101111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111100001111111111111111111111111111111111000000011111111111111111111111111111111100111101111111111111111111111111111111110001000111111111111111111110111111111111000000011111111111111111111111111111111100000001111111111111111111111111111111110000010111111111111111111111111111111111100000011111111111111111111111111111111110000001111111111111111111111111111111111000000111111111111111111111111111111111000000100111111111111111111111111111110000000110011111111111111111111111111111000010111001111111111111100000010111111111111111111111111111110100000001101111111111111111111111111111111111111111111111111111111111111111111111111111111111";
        
        dboperations.checkIfIdExists(ObjectID).then(result => {
            if (result != null) {
                dboperations.checkIfDestinationExists(ObjectID).then(result => {
                    if (result != null) {
                        console.log(result)
                        res.end(result)
                    } else {
                        const GetSessionId = async()=>{
                            let OpenSession = await abbyycalls.OpenSession();
                            let data = await OpenSession.sessionId;
                            return data;
                        };
                        GetSessionId()
                        .then(data => {
                            const SessionId = data;
                            console.log(SessionId);
                            const GetBatchId = async()=>{
                                let AddNewBatch = await abbyycalls.AddNewBatch(SessionId, BatchName);
                                let data  = await AddNewBatch.batchId;
                                return data;
                            };
                            GetBatchId()
                            .then(data =>{
                                const BatchId = data;
                                console.log(BatchId);
                                const OpenBatch = async()=>{
                                    let OpenBatch = await abbyycalls.OpenBatch(SessionId, BatchId);
                                    let data  = await OpenBatch.result;
                                    return data;
                                };
                                OpenBatch()
                                .then(data => {
                                    console.log("open batch true");
                                    const AddNewDocument = async()=>{
                                        let AddNewDocument = await abbyycalls.AddNewDocument(SessionId, BatchId, fileName, bytes);
                                        let data  = await AddNewDocument.documentId;
                                        return data;
                                    };
                                    AddNewDocument()
                                    .then(data => {
                                        const DocumentId = data;
                                        console.log(DocumentId);
                                        const ProcessBatch = async()=>{
                                            let ProcessBatch = await abbyycalls.ProcessBatch(SessionId, BatchId);
                                        };
                                        ProcessBatch()
                                        .then(data => {
                                            console.log("batch processed");
                                            const LoadDocumentResult = async()=>{
                                                let LoadDocumentResult = await abbyycalls.LoadDocumentResult(SessionId, BatchId, DocumentId, fileName);
                                                let data = LoadDocumentResult.file;
                                                return data;
                                            }
                                            LoadDocumentResult()
                                            .then(data => {
                                                console.log(data.Name);
                                                dboperations.UpdateEnquiry(ObjectID, data, SessionId, BatchId).then(
                                                    dboperations.checkIfDestinationExists(ObjectID).then(result => {
                                                        console.log(result)
                                                        res.end(result)
                                                    })
                                                )
                                            })
                                            .catch(function (error) {
                                                console.log(error);
                                            });
                                        })
                                        .catch(function (error) {
                                            console.log(error);
                                        });
                                    })
                                    .catch(function (error) {
                                        console.log(error);
                                    });
                                })
                                .catch(function (error) {
                                    console.log(error);
                                });
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                        })
                        .catch(function (error) {
                                console.log(error);
                        });
                    }
                })
            } else {
                dboperations.addEnquiry(ObjectID, ReceivedObject, QuoteType);
                const GetSessionId = async()=>{
                    let OpenSession = await abbyycalls.OpenSession();
                    let data = await OpenSession.sessionId;
                    return data;
                };
                GetSessionId()
                .then(data => {
                    const SessionId = data;
                    console.log(SessionId);
                    const GetBatchId = async()=>{
                        let AddNewBatch = await abbyycalls.AddNewBatch(SessionId, BatchName);
                        let data  = await AddNewBatch.batchId;
                        return data;
                    };
                    GetBatchId()
                    .then(data =>{
                        const BatchId = data;
                        console.log(BatchId);
                        const OpenBatch = async()=>{
                            let OpenBatch = await abbyycalls.OpenBatch(SessionId, BatchId);
                            let data  = await OpenBatch.result;
                            return data;
                        };
                        OpenBatch()
                        .then(data => {
                            console.log(data);
                            const AddNewDocument = async()=>{
                                let AddNewDocument = await abbyycalls.AddNewDocument(SessionId, BatchId, FileName, Bytes);
                                let data  = await AddNewDocument.documentId;
                                return data;
                            };
                            AddNewDocument()
                            .then(data => {
                                const DocumentId = data;
                                console.log(DocumentId);
                                const ProcessBatch = async()=>{
                                    let ProcessBatch = await abbyycalls.ProcessBatch(SessionId, BatchId);
                                };
                                ProcessBatch()
                                .then(data => {
                                    console.log("batch processed");
                                    const LoadDocumentResult = async()=>{
                                        let LoadDocumentResult = await abbyycalls.LoadDocumentResult(SessionId, BatchId, DocumentId, FileName);
                                        let data = LoadDocumentResult.file;
                                        return data;
                                    }
                                    LoadDocumentResult()
                                    .then(data => {
                                        console.log(data);
                                        dboperations.UpdateEnquiry(ObjectID, result, SessionId, BatchId).then(
                                            dboperations.checkIfDestinationExists(ObjectID).then(result => {
                                                console.log(result)
                                                res.end(result)
                                            })
                                        )
                                    })
                                    .catch(function (error) {
                                        console.log(error);
                                    });
                                })
                                .catch(function (error) {
                                    console.log(error);
                                });
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                })
                .catch(function (error) {
                        console.log(error);
                });
            }
        })
    })
}