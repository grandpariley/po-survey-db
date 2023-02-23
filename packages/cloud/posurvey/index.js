const MongoClient = require('mongodb').MongoClient;

async function main(args) {
    const uri = process.env['DATABASE_URL'];
    console.log(args);
    let client = new MongoClient(uri);
    try {
        await client.connect();
        await client.db("posurvey")
            .collection("posurvey")
            .insertOne(args);
        console.log(`added ${args} to database.`);
        return { ok: true };
    } catch (e) {
        console.error(e);
        return {
            "body": { "error": "There was a problem adding the email address to the database." },
            "statusCode": 500
        };
    } finally {
        await client.close();
    }
}