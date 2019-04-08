//dependencies required for the app
var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
//render css files
app.use(express.static("public"));

const taskRepository = require('./repository/TaskRepository');

//placeholders for added task
var task = ["buy socks", "practise with nodejs"];
//placeholders for removed task
var complete = ["finish jquery"];

//post route for adding new task 
app.post("/addtask", function(req, res) {
    var newTask = req.body.newtask;
    //add the new task from the post route
    taskRepository.add(newTask);
    res.redirect("/");
});

app.post("/removetask", function(req, res) {
    var completedTasks = req.body.check;
    if (typeof completedTasks === 'String') {
        completedTasks = [completedTasks];
    }
    taskRepository.remove(completedTasks).then(() => {
        res.redirect("/");
    }).catch(error => {
        res.redirect("/");
    })
});

//render the ejs and display added task, completed task
app.get("/", function(req, res) {
    taskRepository.getTasks().then(function(tasks) {
        const response = {
            task: tasks.filter(task => !task.completed),
            complete: tasks.filter(task => task.completed)
        }
        res.render("index", response);
    }).catch(function() {
        res.render("index", { task: [], complete: [] });
    })
});

//set app to listen on port 3000
app.listen(3000, function() {
    console.log("server is running on port 3000");
});