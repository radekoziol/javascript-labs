const express = require('express');
const app = express();
const Joi = require('joi');

app.use(express.json());

const students = [
    {id: 1, name: 'Radek Koziol', grades: [2,3]},
    {id: 2, name: 'Radek Koziol1', grades: [4,2]},
    {id: 3, name: 'Radek Koziol2', grades: [3,3]}
];

app.get('/', function(req,res){
    res.send('Hello');
});

app.get('/api/students', function (req, res) {
   res.send(students);
});

app.delete('/api/students/:id', function(req,res){
    const student = students.find(function(s){
        return s.id === parseInt(req.params.id);
    });

    if(!student)  //404
        return res.status(404).send('Student with given ID was not found!');

    const index = students.indexOf(student);
    students.splice(index, 1);

    res.send(student);
});

app.put('/api/students/grades/:id', function (req, res) {

    const student = students.find(function(s){
        return s.id === parseInt(req.params.id);
    });
    if(!student)  //404
        return res.status(404).send('Student with given ID was not found!');

    const {error} = validateStudentGrade(req.body);

    if(error)
        return res.status(400).send(error.details[0].message);

    student.grades.push(req.body.grade);
    res.send(student);
});


app.put('/api/students/:id/', function (req, res) {

    const student = students.find(function(s){
        return s.id === parseInt(req.params.id);
    });
    if(!student)  //404
        return res.status(404).send('Student with given ID was not found!');

    const result = validateStudent(req.body);
    const {error} = validateStudent(req.body);

    if(error)
        return res.status(400).send(error.details[0].message);

    student.name = req.body.name;
    res.send(student);
});


app.post('/api/students', function (req, res) {

    const {error} = validateStudent(req.body);

    if(error)
        return res.status(400).send(error.details[0].message);


   const student = {
       id: students.length + 1,
       name: req.body.name,
       grades: []
   };
   students.push(student);
   res.send(student);
});

app.get('/api/students/:id',function (req,res) {
    const student = students.find(function(s){
        return s.id === parseInt(req.params.id);
    });
    if(!student)  //404
        return res.status(404).send('Student with given ID was not found!');
    else
        res.send(student);

});

const port = process.env.PORT || 3000;
app.listen(port, function(){
    console.log('Listening on port ', port);
});

function validateStudent(student){

    const schema = {
        name: Joi.string().min(2).required()
    };

    return Joi.validate(student, schema);
}

function validateStudentGrade(student){

    const schema = {
        grade: Joi.number().required()
    };

    return Joi.validate(student, schema);
}


