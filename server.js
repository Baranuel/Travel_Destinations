//all the imports 
 import express from 'express'
 import { MongoClient, ObjectId } from 'mongodb'
import cors from 'cors'
import bodyParser from 'body-parser'

//makes the __dirname work
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//importing controllers
import { createUser, getUser } from "./controllers/User_controller.js"

 // database setup
 const uri = "mongodb+srv://m001-student:m001-mongodb-basics@sandbox.ohvc7rg.mongodb.net/admin"
 const client = new MongoClient(uri)

 //server setup
 const app = express();
 const port = 3000;

 //server configuration so our requests accept JSON format
app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));

// API routes 
app.get('/', async (req, res) => {
    //we declare an asynchronous function so we can await changes from database
        try {
            //we open a connection to database
           await client.connect()
            //we create our query, assign it to a variable and await it
           const destinations = await client.db("travel_destinations").collection("destinations").find().toArray()
           console.log(destinations)
        res.send(destinations)
        res.status(201)
         
        }
        catch(err) {
            console.log(err)
        }
        finally{
            await client.close()
        }
})
app.post("/", async(req, res) => {
        //we declare an asynchronous function so we can await changes from database
        try {
            //we open a connection to database
           await client.connect()
            //we create our query, assign it to a variable and await it
           const destinations = await client.db("travel_destinations").collection("destinations").insertOne(req.body)
        res.send(destinations)
         
        }
        catch(err) {
            console.log(err)
        }
        finally {
            client.close()
        }
})

//authentication routes

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html');
//   });

// app.get("/login", async(req, res) => {
//     res.sendFile(__dirname + '/login.html');
// })

app.post("/auth/signup", createUser)
app.get("/auth/login", getUser)

app.post("/login", async(req, res) => {
    let username = req.body.username;
  let password = req.body.password;
  res.send(`Username: ${username} Password: ${password}`)
})

app.put("/destination/:id", async(req, res) => {
    //we declare an asynchronous function so we can await changes from database
    try {
        //we open a connection to database
       await client.connect()
       const paramsId = req.params.id
       const updatedDestination = req.body
       console.log(updatedDestination)
       console.log(paramsId)
        //we create our query, assign it to a variable and await it
       const destination = await client.db("travel_destinations").collection("destinations").updateOne({_id:ObjectId(paramsId)}, {$set:updatedDestination})
    res.send(destination)
     
    }
    catch(err) {
        console.log(err)
    }
    finally {
        client.close()
    }
})
app.get('/destination/:id', async (req, res) => {
    //we declare an asynchronous function so we can await changes from database
        try {
            //we open a connection to database
           await client.connect()
            //we create our query, assign it to a variable and await it
           const destinations = await client.db("travel_destinations").collection("destinations").find({_id:ObjectId(req.params.id)}).toArray()
           console.log(destinations)
        res.json(destinations)
        res.status(201)
         
        }
        catch(err) {
            console.log(err)
        }
        finally{
            await client.close()
        }
})

app.listen(port, ()=> {
    console.log("running")
})