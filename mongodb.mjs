
import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = "mongodb+srv://dbuser801:dbpassword@cluster0.hswflja.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


// Connect to your Atlas cluster
export const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        console.log("Successfully connected to Atlas");
    } catch (err) {
        console.log(err.stack);
        await client.close();
        process.exit(1)
    }
  
}
run().catch(console.dir);

process.on('SIGINT', async function() {/////this function will run jst before app is closing
  console.log("app is terminating");
  await client.close();

  
});