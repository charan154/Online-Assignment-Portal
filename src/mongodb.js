const fileUpload = require("express-fileupload");
const mongoose=require("mongoose")
const mongoURI = 'mongodb://127.0.0.1:27017/test';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
    console.log("Mongo db connected")
})
.catch(()=>{
    console.log("failed")
})

const LoginSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const facultySchema=new mongoose.Schema({
    fname:{
        type:String,
        required:true
    },
    fpassword:{
        type:String,
        required:true
    }
})

const parentSchema=new mongoose.Schema({
    pname:{
        type:String,
        required:true
    },
    ppassword:{
        type:String,
        required:true
    }
})

const assignmentSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    rollnumber:{
        type:String,
        required:true
    },
    marks:{
        type:String,
        required:true
    }

})


const uploadSchema = new mongoose.Schema({
    aname: {
        type: String,
        required: true
    },
    file: {
        type:Buffer,
        required: true
    }
});


const submissionSchema = new mongoose.Schema({

    stitle: {
        type: String,
        required: true
    },

    srollnumber: {
        type: String,
        required: true
    },
    
    sfile: {
        type:Buffer,
        required: true
    }
});

const collection=new mongoose.model("students",LoginSchema)

const collection1=new mongoose.model("faculty",facultySchema)

const collection2=new mongoose.model("parent",parentSchema)

const collection3=new mongoose.model("assignment",assignmentSchema)

const collection4=new mongoose.model("upload",uploadSchema)

const collection5=new mongoose.model("submission",submissionSchema)

module.exports={collection,collection1,collection2,collection3,collection4,collection5}


