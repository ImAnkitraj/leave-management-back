require("dotenv").config()
const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const bodyparser = require('body-parser');
const app = express();
app.use(cors());

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(require('./routes/Auth'));
app.use(require('./routes/index'));

mongoose.connect("mongodb://localhost:27017/aiPortal?readPreference=primary&appname=MongoDB%20Compass&ssl=false",{ useNewUrlParser: true,useUnifiedTopology: true  })
.then(()=>console.log('connected'))
.catch(e=>console.log(e))

app.get('/',(req, res)=>{
    res.send("hi")
})

app.listen(process.env.PORT || 5000, () => console.log(`Server has started.`));