const dbConfig = {
    user: "john",
    password: "123456789",
    server: "localhost",
    database: "BS_API_Enquiries",
    options:{
        trustedconnection: true,
        enableArithAbort : true, 
        instancename :'MSI'
    },
    port: 1433,
};

module.exports = dbConfig;