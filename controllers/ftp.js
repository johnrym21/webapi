const ftp = require("basic-ftp")


async function ftpin(SourceFile) {

    const client = new ftp.Client()

    client.ftp.verbose = true

    try {
        await client.access({
            host: "192.168.10.14",
            user: "fidelityho\\abbyyapiusr",
            password: "@bb115Rv",
            secure: false
        })

        await client.downloadTo("./export/" + SourceFile + ".json", SourceFile + "/" + SourceFile + ".json", startAt = 0)

        return true;
    }
    catch (err) {
        console.log(err)
        return false;
    }
}

module.exports = {
    ftpin: ftpin
}