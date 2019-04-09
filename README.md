# nodejs-todo

<h2> A simple To Do List application built with Node.js and Express</h2>

<p> Nodejs application that let's you add and complete task on a single page, storing both new and completed task in a different array. This appllication makes use of: </p>

<ul>
<li> EJS - A simple templating engine that lets you generate HTML markup with plain JS </li>

<li> Body-parser - This extracts the entire body portion of an incoming request stream and exposes it on req.body </li>
</ul>

![png](https://github.com/missating/nodejs-todo/blob/master/todo.png?raw=true 'web todo')

<br>

<p> How to run the app locally: </p>

<ol>
<li> Run <code> npm install </code> to install all needed dependencies </li>

<li> Then start the server using <code> node index.js </code> </li>

<li> Navigate to your browser <code> http://localhost:3000/ </code> to view the app </li>
</ol>

<p> I wrote a blog post on how to build this app, you can check it out <a href="https://medium.com/@atingenkay/creating-a-todo-app-with-node-js-express-8fa51f39b16f" target="_blank">Here</a>

## Mongo Integration
Tasks added by the user is persisted in Mongo database. Any task marked as completed is updated accordingly in the database.

Below is the schema of the collection
```
taskSchema : {
    _id: <mongo_generated_id>,
    name: String,
    completed: Boolean
}
```

Mongo instance is run inside a docker container on port 27017. Data is persisted on the host machine
by specifying the volume while running the mongo container.

```
docker run -itd -v tododata:/data/db mongo
```

Here tododata is the docker volume created using the below command:
```
docker volume create tododata
```

## Todo-Node-App
App has been updated to add/udpate the tasks to Mongo database. This application uses mongoose to perform save/update/find operations.

Mongo host is read from the node environment variable mongoHost and mongoPort.
Default values:
```
mongoHost = localhost
mongoPort = 27017
```

This application is also run inside a docker container.

Image of this application is built on top of Node image (OS + Node). Configuration for the same can be found in dockerfile.

```
git clone git@github.com:pavanpalakshamurthy/nodejs-todo.git
cd nodejs-todo
docker build . --tag pavanp2/todo-node-app:<version>
```

Latest image is available in dockerhub. The same can be pulled using the below command
```
docker pull pavanp2/todo-node-app
```

Before running the application, Mongo docker instance should be up and running. By inspecting
the container, we should be able to retrieve the IP of the mongo container as below
```
docker inspect <mongo_container_id> | grep "IPAddress"
```

### Running mongo instance
Step #1
Pull the latest mongo image from the dockerhub.
```
docker pull mongo
```

Step #2
Create volume on the host machine
```
docker volume create <volume-name>
```

Step #3
Run the mongo container
```
docker run -itd -v <volume-name>:/data/db mongo
```
Now the mongo instance should be up and running and ready to accept connections.

Step #4
Run the inspect on the mongo container to determine the container IP address.
```
docker inspect <mongo-container-id> | grep "IPAddress"
```

### Running the application
Step #1
Build the image from the source code
```
git clone git@github.com:pavanpalakshamurthy/nodejs-todo.git
cd nodejs-todo
docker build . --tag pavanp2/todo-node-app:<version>
```

Step #1.1 (if Step #1 not executed)
Pull the todo node app image directly from dockerhub
```
docker pull pavanp2/todo-node-app:latest
```

Step #2
List all the images available locally. 
```
docker images
```
Recently built/pulled image should be visible in the list.

Step #3
Run the application
```
docker run -itd -p 3000:3000 -e mongoHost="<mongo-container-ip>" pavanp2/todo-node-app
```
<mongo-container-ip> is from the step #4 of the previous section. Application is run as daemon.
Logs of the application can be viwed using the below command
```
docker logs <todo-node-app-container-id>
```

Step #4
View all the running containers
```
docker ps
```
This should list both mongo instance and the todo app instance.



