import { MongoClient } from 'mongodb';

export async function main(args) {
    console.log(args);
    let client = new MongoClient(process.env['DATABASE_URL']);
    try {
        await client.connect();
        await client.db("posurvey")
            .collection("posurvey")
            .insertOne(args);
        console.log(`added ${JSON.stringify(args)} to database.`);
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
