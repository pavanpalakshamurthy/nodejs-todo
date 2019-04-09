const mongoose = require('mongoose');
const MONGO_HOST = process.env.mongoHost || 'localhost';
console.log(MONGO_HOST);
const MONGO_PORT = process.env.mongoPort || 27017;
const mongo_url = 'mongodb://' + MONGO_HOST + ':' + MONGO_PORT + '/todo?socketTimeoutMS=10000';

mongoose.connect(mongo_url, { useNewUrlParser: true });

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
        return Todo.find().maxTimeMS(5000).exec();
    }
}