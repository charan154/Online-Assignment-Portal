const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const fs = require("fs");
const {collection,collection1,collection2,collection3,collection4,collection5}=require("./mongodb");
const { title } = require("process");
const mongodb=require("mongodb")
const templatePath = path.join(__dirname, "../templates");
const uploadFolder = path.join(__dirname,"../uploads");
const submitFolder=path.join(__dirname,"../submissions")
const binary=mongodb.Binary
const multer = require('multer');
const upload = multer();

app.use(express.json());
app.set("view engine", "hbs");
app.set("views", templatePath);
app.use(express.urlencoded({ extended: false }));
app.use(express.static('../public'));


app.get("/", (req, res) => {
    res.render("index");
});

app.get("/student", (req, res) => {
    res.render("student");
});

app.get("/faculty", (req, res) => {
    res.render("faculty");
});

app.get("/parent", (req, res) => {
    res.render("parent");
});

app.get("/assignment", (req, res) => {
    res.render("assignment");
});

app.get("/upload", (req, res) => {
    res.render("upload");
});
app.get("/index", (req, res) => {
    res.render("index");
});





app.post('/upload', upload.single('file'), async (req, res) => {
    try {
      const aname = req.body.aname;
      const fileData = req.file.buffer;
  
     
      const assignment = new collection4({
        aname,
        file: fileData
      });
  
      await assignment.save();
  
     
      console.log("File uploaded successfully")
      res.redirect('upload');
    } catch (error) {
      console.error('Error uploading assignment:', error);
      res.status(500).send('Error uploading assignment');
    }
  });


  app.post('/assignment', upload.single('sfile'), async (req, res) => {
    try {
      const stitle = req.body.stitle;
      const srollnumber=req.body.srollnumber
      const fileData = req.file.buffer;
  
      const assignment = new collection5({
        stitle,
        srollnumber,
        sfile: fileData
      });
  
      await assignment.save();
  
      console.log("File uploaded successfully")
      res.redirect('assignment');
    } catch (error) {
      console.error('Error uploading assignment:', error);
      res.status(500).send('Error uploading assignment');
    }
  });

  app.get('/download', async (req, res) => {
    try {
      const assignments = await collection4.find();
  
      res.render('studentview', { assignments });
    } catch (error) {
      console.error('Error fetching assignments:', error);
      res.status(500).send('Error fetching assignments');
    }
  });


  app.get('/downloads', async (req, res) => {
    try {
      const assignments = await collection5.find();
  
      res.render('facultyview', { assignments });
    } catch (error) {
      console.error('Error fetching assignments:', error);
      res.status(500).send('Error fetching assignments');
    }
  });



app.get('/download/:id', async (req, res) => {
    try {
      const fileId = req.params.id;
  
      const assignment = await collection4.findById(fileId);
  
      if (!assignment) {
        return res.status(404).send('Assignment not found');
      }
  
      res.set({
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename=${assignment.aname}`,
      });
  
      res.send(assignment.file);
    } catch (error) {
      console.error('Error downloading assignment:', error);
      res.status(500).send('Error downloading assignment');
    }
  });
  
  

  app.get('/downloads/:id', async (req, res) => {
    try {
      const fileId = req.params.id;
  
      const assignment = await collection5.findById(fileId);
  
      if (!assignment) {
        return res.status(404).send('Assignment not found');
      }
  
      res.set({
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename=${assignment.stitle}`,
      });
  
      res.send(assignment.sfile);
    } catch (error) {
      console.error('Error downloading assignment:', error);
      res.status(500).send('Error downloading assignment');
    }
  });



app.get("/marksview",(req,res)=>{
  res.render("marksview")
})

app.get("/marks",(req,res)=>{
    res.render("marks")
})

app.post("/marks", async (req, res) => {
    const data = {
      title: req.body.title,
      rollnumber: req.body.rollnumber,
      marks: req.body.marks
    };
  
    await collection3.create(data); 
  
    res.render("marks")
  });

app.post('/marksview', async (req, res) => {
    const rollNumber=req.body.rollnumber;
    const assignments=await collection3.find({rollnumber:rollNumber},'title marks');
    res.render("marksview",{assignments});
  });
  


app.post("/student", async (req, res) => {
    try {
        const student = await collection.findOne({ name: req.body.name });
        if (student.password === req.body.password) {
            res.render("studentac");
        } else {
            res.redirect('student');
        }
    } catch {
        res.send("Invalid Student User");
    }
});

app.post("/faculty", async (req, res) => {
    try {
        const check = await collection1.findOne({ fname: req.body.fname });
        if (check.fpassword === req.body.fpassword) {
            res.render("facultyac");
        } else {
            res.redirect(faculty);
        }
    } catch {
        res.send("Invalid Faculty User");
    }
});

app.post("/parent", async (req, res) => {
    try {
        const parent = await collection2.findOne({ pname: req.body.pname });
        if (parent.ppassword === req.body.ppassword) {
            res.render("marksview");
        } else {
            res.redirect('parent');
        }
    } catch {
        res.send("Invalid Parent User");
    }
});

app.listen(3000, () => {
    console.log("Port connected");
});

