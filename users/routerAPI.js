const express = require('express')
const router = express.Router()
const fs=require('fs')

const {MongoClient, ObjectId}=require('mongodb')
const port=process.env.PORT || 8080

// Connection URL
const url='mongodb+srv://berryj7:m1NImgQ5DoAeKlKq@cluster0.9tefg.mongodb.net/mydb?retryWrites=true&w=majority'
const client= new MongoClient(url)
const database=client.db('mydb')

/* API routes */
router.get('/',(req,res)=>{
	client.connect(function(err,db){
		if(err) throw err
		console.log('Connected to database')
		database.collection('users').find({}).toArray(function(err, result){
			if (err) throw err
			console.log(result)
			res.status(200).json(result)
			db.close()
		})
	})
	
})
router.post('/',(req,res)=>{
	client.connect(function(err,db){
		if(err) throw err
		console.log('Connected to database')
		const doc = req.body
	
		database.collection('users').insertOne((doc),function(err,result){
			if (err) throw err
			console.log(result)
		})
		database.collection('users').find({}).toArray(function(err, result){
			if (err) throw err
			console.log(result)
			db.close()
		})
	})
	res.status(201).json(req.body)
})
router.get('/:id',(req,res)=>{
	client.connect(function(err,db){
		if(err) throw err
		userid = req.params.id
		console.log(userid)
		console.log('Connected to database')
		database.collection('users').find({"_id": ObjectId(`${userid}`)}).toArray(function(err, result){
			if (err) throw err
			res.status(200).json(result)
			console.log(result)
			db.close()
		})
	})
})
router.patch('/:id',(req,res)=>{
	client.connect(function(err,db){
		if(err) throw err
		console.log('Connected to database')
		const email = req.body.email
		const password = req.body.password
		const userId=req.params.id
		database.collection('users').updateOne({"_id": ObjectId(`${userId}`)},{$set:{"email":`${email}`,"password": `${password}`}},function(err,result){
			if (err) throw err
			console.log(result)
		})
		database.collection('users').find({}).toArray(function(err, result){
			if (err) throw err
			console.log(result)
			db.close()
		})
	})
})
router.delete('/:id',(req,res)=>{
	client.connect(function(err,db){
		if(err) throw err
		console.log('Connected to database')
		userId=req.params.id
		database.collection('users').deleteOne({"_id": ObjectId(`${userId}`)},function(err,result){
			if (err) throw err
			console.log(result)
		})
		database.collection('users').find({}).toArray(function(err, result){
			if (err) throw err
			console.log(result)
			db.close()
		})
	})
})
module.exports = router