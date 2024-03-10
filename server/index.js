const express = require('express')
const mongoose = require('mongoose')
const UserModel = require('./User')
const cors = require('cors')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })//upload folder will get created 

const app = express()
const port = 3001

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/')
.then(()=>console.log("DB is Connected"))
.catch((err)=>console.log(err))

app.post('/upload', upload.single('myfile'), function (req, res, next) {
    return res.json({msg:'upload successful'})
  })

app.post('/create',(req,res)=>{
    UserModel.create(req.body)
    .then(result=>res.json(result))
    .catch((err)=>console.log(err))
})

app.get('/',(req,res)=>{
    UserModel.find()
    .then(result=>res.json(result))
    .catch((err)=>console.log(err))
})

app.get('/get/:id',(req,res)=>{
    const id = req.params.id;
    UserModel.findById({'_id':id})
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
})

app.delete('/delete/:id',(req,res)=>{
    const id = req.params.id;
    UserModel.findByIdAndDelete({'_id':id})
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
})

app.put('/update/:id',(req,res)=>{
    const id = req.params.id;
    UserModel.findByIdAndUpdate({'_id':id},{name:req.body.name, email:req.body.email})
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
})

app.listen(port,()=>{
    console.log("Server is created");
})