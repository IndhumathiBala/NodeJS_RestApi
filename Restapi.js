const express = require('express');
const fs=require('fs');
const server=express();


server.use((req,res,next)=>{
    if(req.query.key==="1234")
    {
    next();
    }
    else
    {
        res.status(401).json('UNAUTHORIZED');
    }
});
server.get('/',express.static('public'));

// GET request
server.get('/',(req,res)=>{  
    fs.readFile("movie.json",'utf8',(err,data)=>{
        if(err)
        {   
            res.status(500).json({
                message:'ERROR',
            });
        }
        else{
            res.status(200).json({
                message:'SUCCESS',
                data:JSON.parse(data),
            })
        }
    })
})


//post is used to add movie
server.post('/',(req,res)=>{    //post is a method
    fs.readFile('movie.json','utf8',(err,data)=>{
    const parsedData=JSON.parse(data)
    parsedData.push({
        name:req.query.name,
        year:req.query.year,
    });
    fs.writeFile('movie.json',JSON.stringify(parsedData),(err)=>{
        res.status(201).json({
            message:'SUCCESS!!! HAVE CREATED A MOVIE',
        })
    })
})
})

//make post req by adding key and name and year and send
// make get req by adding key you will get updated list


// Update a movie
server.put('/', (req, res) => {
    fs.readFile('movie.json', 'utf8', (err, data) => {
      const parsedData = JSON.parse(data);
      const movieIndex = parsedData.findIndex(movie => movie.name === req.query.name);
      if (movieIndex === -1) {
        res.status(404).json({ message: 'Movie not found' });
        return;
      }
      parsedData[movieIndex].year = req.query.year;
      fs.writeFile('movie.json', JSON.stringify(parsedData), (err) => {
        res.status(200).json({ message: 'SUCCESS!!! HAVE UPDATED A MOVIE' });
      });
    });
  });
  
  // Delete a movie
  server.delete('/', (req, res) => {
    fs.readFile('movie.json', 'utf8', (err, data) => {
      const parsedData = JSON.parse(data);
      const movieIndex = parsedData.findIndex(movie => movie.name === req.query.name);
      if (movieIndex === -1) {
        res.status(404).json({ message: 'Movie not found' });
        return;
      }
      parsedData.splice(movieIndex, 1);
      fs.writeFile('movie.json', JSON.stringify(parsedData), (err) => {
        res.status(200).json({ message: 'SUCCESS!!! HAVE DELETED A MOVIE' });
      });
    });
  });
  
  server.listen(3000,()=>{            //listen is a method    
    console.log("server is running");
})


// http://localhost:3000/?key=1234  to use get request
// nodemon for automatically restart node js application while making changes