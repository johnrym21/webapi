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
        const QuoteType = ''; //check with rania how to determin the type of the quote
        const BatchName = '';
        const FileName = '';
        const Bytes = '';

        dboperations.checkIfIdExists(ObjectID).then(result => {
            if (result != null) {
                dboperations.checkIfDestinationExists(ObjectID).then(result => {
                    if (result != null) {
                        console.log(result)
                        res.end(result)
                    } else {
                        (async()=>{
                            let OpenSession = await abbyycalls.OpenSession();
                            SessionId = OpenSession;
                            console.log(SessionId);
                        })();
                        (async()=>{
                            let AddNewBatch = await abbyycalls.AddNewBatch(SessionId, BatchName);
                            BatchId  = AddNewBatch;
                            console.log(AddNewBatch);
                        })();
                        (async()=>{
                            let OpenBatch = await abbyycalls.OpenBatch(SessionId, BatchId);
                            console.log(OpenBatch);
                        })();
                        (async()=>{
                            let AddNewDocument = await abbyycalls.AddNewDocument(SessionId, BatchId, FileName, Bytes);
                            DocumentId = AddNewDocument;
                            console.log(AddNewDocument);
                        })();
                        (async()=>{
                            let ProcessBatch = await abbyycalls.ProcessBatch(SessionId, BatchId);
                            console.log(ProcessBatch);
                        })();
                        (async()=>{
                            let LoadDocumentResult = await abbyycalls.LoadDocumentResult(SessionId, BatchId, DocumentId, FileName);
                            DocumentResult = LoadDocumentResult;
                            console.log(LoadDocumentResult);
                        })();
                        dboperations.UpdateEnquiry(ObjectID, result, SessionId, BatchId).then( result => {
                            result.end(result);
                        })
                    }
                })
            } else {
                dboperations.addEnquiry(ObjectID, ReceivedObject, QuoteType);
                (async()=>{
                    let OpenSession = await abbyycalls.OpenSession();
                    SessionId = OpenSession;
                    console.log(SessionId);
                })();
                (async()=>{
                    let AddNewBatch = await abbyycalls.AddNewBatch(SessionId, BatchName);
                    BatchId  = AddNewBatch;
                    console.log(AddNewBatch);
                })();
                (async()=>{
                    let OpenBatch = await abbyycalls.OpenBatch(SessionId, BatchId);
                    console.log(OpenBatch);
                })();
                (async()=>{
                    let AddNewDocument = await abbyycalls.AddNewDocument(SessionId, BatchId, FileName, Bytes);
                    DocumentId = AddNewDocument;
                    console.log(AddNewDocument);
                })();
                (async()=>{
                    let ProcessBatch = await abbyycalls.ProcessBatch(SessionId, BatchId);
                    console.log(ProcessBatch);
                })();
                (async()=>{
                    let LoadDocumentResult = await abbyycalls.LoadDocumentResult(SessionId, BatchId, DocumentId, FileName);
                    DocumentResult = LoadDocumentResult;
                    console.log(LoadDocumentResult);
                })();
                dboperations.UpdateEnquiry(ObjectID, result, SessionId, BatchId).then( result => {
                    result.end(result);
                })
            }
        })
    })
}