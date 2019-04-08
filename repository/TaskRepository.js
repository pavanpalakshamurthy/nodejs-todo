const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/todo', { useNewUrlParser: true });

const Todo = mongoose.model('Todo', { name: String, completed: Boolean });

module.exports = {

    add: function(task) {
        const todo = new Todo({ name: task, completed: false });
        return todo.save();
    },

    remove: function(taskIds) {
        return Todo.updateMany({ _id: { $in: taskIds } }, { completed: true }, { multi: true })
    },

    getTasks: function() {
        return Todo.find();
    }
}