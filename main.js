const taskRepository = require('./repository/TaskRepository');

taskRepository.add("prepare lunch").then(function(response) {
    console.log(response);
})


// taskRepository.remove('5cabb149d584630979c82870').then(function() {
//     console.log("removed succesfully");
// })