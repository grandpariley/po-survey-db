import { MongoClient } from 'mongodb';

export async function main(args) {
    let client = new MongoClient(process.env['DATABASE_URL']);
    try {
        const insert = {
            risk: args.risk,
            short: args.short,
            long: args.long,
        }
        await client.connect();
        await client.db("posurvey")
            .collection("posurvey")
            .insertOne(insert);
        console.log(`added ${JSON.stringify(insert)} to database.`);
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
