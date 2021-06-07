const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid');
uuidv4();

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/todo';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const User = require('./models/User.js')
const port = 3000

//dont need bodyparser. it has been deprecated. json and urlencoded are add to express
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors())

app.get('/todo/:username', async (req, res) => {
  // res.send('Hello World! : '+req.params.username)
  console.log(req.params.username)
  const user = await User.find({"username": req.params.username})
  // console.log(user[0].todos)
  if (user.length==0){
    res.send("empty")
  }
  res.send(user[0].todos)
  
})

app.post('/todo/:username',async (req, res)=>{
  
  // console.log(req.body.username, req.body.task, 'post request')
  //updateOne is used because I had to use $push to insert inside the todos array in the record.
  //To insert data inside an array withing the record, $pusszzhjxh is used
  
  const user = User.updateOne({username: req.body.username}, 
                                {
                                  $push: 
                                    { 
                                        todos:
                                          {
                                            id:uuidv4(), 
                                            todo:req.body.task
                                          }
                                    }
                              },
                              function (error, success) {
                                if (error) {
                                    console.log(error);
                                } else {
                                    console.log(success);
                                }
                            });
                            
                            
  // const saved = await user.save()
  res.send(user.data)
  // const user = new User({
  //   username: req.body.username,
  // })
  // user.save();
})

app.put('/todo/:username/:id', async (req, res)=>{
  console.log(req.params.id, req.params.username,req.body.task,'put')
  // res.send(req.params.id, req.params.username,'put')
  const user =await User.updateOne({"username": req.params.username, "todos.id":req.params.id} ,
                          {
                              $set: {
                                "todos.$.todo": req.body.task
                              }
                          });
  res.send(user.data)
})

app.delete('/todo/:username', async (req,res)=>{
  const user = User.updateOne({username:req.params.username},
                                {$unset: {todos: []}},
                                function (error, success) {
                                  if (error) {
                                      console.log(error);
                                  } else {
                                      console.log(success);
                                  }
                              });
  res.send(user.data)
})

app.delete('/todo/:username/:id',async (req,res)=>{
  // res.send(req.params.id+'delete')

  const user = await User.updateOne({"username": req.params.username},
                                {
                                  $pull: 
                                    {
                                      todos : {
                                        "id": req.params.id
                                      }
                                    }
                                },
                                  function (error, success) {
                                    if (error) {
                                        console.log(error);
                                    } else {
                                        console.log(success);
                                    }
                                });
                             
  res.send(user.data)
})



app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})