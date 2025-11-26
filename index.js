const express = require('express');
const fs = require("fs");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// GET route - list all files
app.get('/', function(req, res){
    fs.readdir('./files', function(err, files){
        if (err) return res.send("Error reading files!");
        res.render('index', { files: files });
    });
});

// POST route - create new file
app.post('/post', function(req, res){
    const data = req.body.detail;
    const filename = req.body.title.split(' ').join('') + '.txt';

    fs.writeFile(`./files/${filename}`, data, function(err){
        if (err) return res.send("Error writing file!");
        res.redirect('/');
    });
});

// GET route - read file content
app.get("/read/:filename", function (req, res) {
    const filePath = path.join(__dirname, "files", req.params.filename);

    fs.readFile(filePath, "utf8", function (err, data) {
        if (err) {
            console.log("File Read Error:", err);
            return res.send("Error reading file!");
        }

        res.render("show", {
            data: data,
            filename: req.params.filename
        });
    });
});

app.get("/delete/:filename",function(req,res){
 const filePath = path.join(__dirname, "files", req.params.filename);
    fs.unlink(filePath,function(err){
       if (err) return console.log('error in the deleting file')
        res.redirect('/');
    })
})
app.get('/edit/:filename',function(req,res){
     const filePath = path.join(__dirname, "files", req.params.filename);
    const data= fs.readFile(filePath,function(err,data){
        if(err) return console.log('error occur')
    res.render('editshow',{
        filename:req.params.filename,
        filedata:data
    })
    })

})
//so here i got problem in the update and the another thing here what i do that might beccause 


app.listen(3000, () => {
    console.log("Server running on port 3000");
});
