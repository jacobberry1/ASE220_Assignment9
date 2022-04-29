const open = require('open')
const fs=require('fs')
const express=require('express')
const bodyParser = require('body-parser')
const app=express()
const {MongoClient}=require('mongodb')
const port=process.env.PORT || 8080

// Connection URL
const url='mongodb+srv://berryj7:m1NImgQ5DoAeKlKq@cluster0.9tefg.mongodb.net/mydb?retryWrites=true&w=majority'
const client= new MongoClient(url)

/* Middleware */
app.use(express.static('assets'))
app.use(bodyParser.json())

client.connect(function(err,db){
	if(err) throw err
	console.log('Connected to database')
})

const users=require('./users/routerWeb')
const usersAPI=require('./users/routerAPI')

app.use('/users',users)
app.use('/api/users',usersAPI)

/* WEB routes */
app.get('/',(req, res)=>{
	res.status(200).send(fs.readFileSync('./users/index.html','utf-8'))
})

app.listen(port,async() => {
	await open(`http://localhost:${port}`)
  })