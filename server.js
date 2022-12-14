//all the imports 
 import express from 'express'
 import { MongoClient, ObjectId } from 'mongodb'
import cors from 'cors'
import Travel from "./models/travel-scheme.js"
import bodyParser from 'body-parser'
import mongoose from 'mongoose'


//importing controllers
import { createUser, getUser } from "./controllers/User_controller.js"

 // database setup
 const uri = "mongodb+srv://m001-student:m001-mongodb-basics@sandbox.ohvc7rg.mongodb.net/mongoose_travel_destinations"
//  const client = new MongoClient(uri)
mongoose.connect(uri);

 //server setup
 const app = express();
 const port = 3000;

 //server configuration so our requests accept JSON format
app.use(express.json())
app.use(cors())

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

app.post("/auth/signup", createUser)
app.post("/auth/login", getUser)


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