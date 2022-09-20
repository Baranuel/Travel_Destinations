//all the imports 
 import express from 'express'
 import { MongoClient } from 'mongodb'
import cors from 'cors'

 // database setup
 const uri = "mongodb+srv://m001-student:m001-mongodb-basics@sandbox.ohvc7rg.mongodb.net/admin"
 const client = new MongoClient(uri)

 //server setup
 const app = express()
 const port = 3000

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
app.post("/destination/:id", async(req, res) => {
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

app.listen(port, ()=> {
    console.log("running")
})