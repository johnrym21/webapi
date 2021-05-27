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
                        abbyycalls.OpenSession().then(result => {
                            const SessionId = result;
                            abbyycalls.AddNewBatch(SessionId, BatchName).then(result => {
                                const BatchId = result;
                                abbyycalls.OpenBatch(SessionId, BatchId)
                                abbyycalls.AddNewDocument(SessionId, BatchId, FileName, Bytes).then(result => {
                                    const DocumentId = result;
                                    abbyycalls.ProcessBatch(SessionId, BatchId)
                                    abbyycalls.LoadDocumentResult(SessionId, BatchId, DocumentId, FileName).then(result => {
                                        dboperations.UpdateEnquiry(ObjectID, result, SessionId, BatchId);
                                        res.end(result);
                                    })
                                })
                            })
                        })
                    }
                })
            } else {
                dboperations.addEnquiry(ObjectID, ReceivedObject, QuoteType).then(
                    abbyycalls.OpenSession().then(result => {
                        const SessionId = result;
                        abbyycalls.AddNewBatch(SessionId, BatchName).then(result => {
                            const BatchId = result;
                            abbyycalls.OpenBatch(SessionId, BatchId)
                            abbyycalls.AddNewDocument(SessionId, BatchId, FileName, Bytes).then(result => {
                                const DocumentId = result;
                                abbyycalls.ProcessBatch(SessionId, BatchId)
                                abbyycalls.LoadDocumentResult(SessionId, BatchId, DocumentId, FileName).then(result => {
                                    dboperations.UpdateEnquiry(ObjectID, result, SessionId, BatchId);
                                    res.end(result);
                                })
                            })
                        })
                    })
                )
            }
        })
    })
}