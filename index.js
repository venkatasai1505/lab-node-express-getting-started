const express = require('express')
const app = express()

app.use(express.json()); //parsing
const port = 8001
const students = [];

app.get('/', function(req, res){
    res.json(students)
})

//create get request
app.get('/:id', function(req, res){
    //fetch particular data
    if(students[req.params.id-1])
    {
        res.json({
            data: students[req.params.id-1],
            message: "Record Available"
        })
    }
    else {
        res.json(students)
    }
    
})
// app.listen(8001, () => console.log("server is up and running"))

//post request
app.post('/student', (req,res) => {
    console.log(req.body)
    students.push({
        id:students.length + 1,
        name:req.body.name
    })
    // students.push({name:`Student-${students.length+1}`}) //es6
    res.json({
        message:`${students[students.length-1].name}-Inserted`
    })
})

app.put("/update/:id", function(req, res) {
    if(students[req.params.id-1])
    {   
        students[req.params.id-1].name = req.body.name
        res.json({
            updated_data: req.body,
            message: "Record Available"
        })
    }
    else {
        res.json({
            message: 'Record not available'
        })
    }
})

app.delete("/delete/:id", function(req, res) {
    if(students[req.params.id-1])
    {
        delete students[req.params.id-1];
        res.json({
            message: "record deleted",
            updated_data: students
        })
    }
    else {
        res.json({
            message: "Record not available."
        })
    }
})

app.listen(8001, () => console.log("server is up and running in 8001"))