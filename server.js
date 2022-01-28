const express = require('express');
const path = require('path');
const dbjson = require('./db/db.json')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid');
//const { clog } = require('./middleware/clog');


const PORT = process.env.port || 3001;

const app = express();

// Import custom middleware, "cLog"
//app.use(clog);

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use('/api', api);

app.use(express.static('public'));

// GET Route for homepage
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);



// Wildcard route to direct users to a 404 page

app.get('/api/notes', (req,res) =>{
  fs.readFile('./db/db.json','utf8',(err, data) => {
    if (err) throw err;
    console.log(data);

    res.json (JSON.parse(data))
  }) 
app.post('/api/notes', (req,res) =>{
  console.log(req.body)
   fs.readFile('./db/db.json','utf8',(err, data) => {
    if (err) throw err;
    
    const notes = JSON.parse(data)
    const newNote = {
      "title": req.body.title,
      "text": req.body.text,
      "id": uuidv4()
    };
    notes.push(newNote);
    const noteStringify = JSON.stringify(notes)
    fs.writeFile('./db/db.json',noteStringify,'utf8',(err,data)=>{
      if (err) throw err;
    console.log(data);
    res.json (notes)
    })
    
  });
 
});

});
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
