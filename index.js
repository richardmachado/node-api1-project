const express = require('express')
const cors = require("cors");

const Users = require('./data/db.js');

const server = express();



server.use(express.json());

server.use(cors())



server.get('/', (req, res) => {
    res.json({ hello: 'Richard'})
});

//1/5 POST	/api/users	Creates a user using the information sent inside the request body.

server.post('/api/users', (req, res) => {
    Users.insert(req.body)
    .then(user => {
        if ((req.body.name.length<1) || (req.body.bio.length<1)){
            res
            .status(400)
            .json({errorMessage:  "Please provide name and bio for the user." })
        } else {
           res.status(200).json(user); 
        }
    })
    .catch(error => {
        console.log("error on POST /user", error);
        res
        .status(400)
        .json({errorMessage: "There was an error while saving the user to the database."});
    });

});


// #2/5  /api/users	Returns an array of all the user objects contained in the database.

server.get('/api/users', (req, res) => {
    
    Users.find().then(hubs => {
        res.status(200).json(hubs);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: 'oops. that is not right'})
    });
});

//#3/5 /api/users/:id	Returns the user object with the specified id.

server.get('/api/users/:id', (req, res) => {
    //?? const { id } = req.params;
    Users.findById(req.params.id)
    .then(specified => {
            if (!specified){
                res.status(404).json({errorMessage: "That user with the specified ID does not exist"})
            } else {
                res.status(200).json(specified);
            }
    }).catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: 'oops. that is not right'})
    });
})

//4/5 Delete /api/users/:id	Removes the user with the specified id and returns the deleted user.

server.delete('/api/users/:id', (req, res) => {
    //?? const { id } = req.params;
    Users.remove(req.params.id)
    .then(removed => {
            if (!removed){
                res.status(404).json({errorMessage: "That user with the specified ID does not exist"})
            } else {
                res.status(200).json(removed);
            }
    }).catch(err => {
        console.log("Error on delete request", err);
        res.status(500).json({ errorMessage: 'oops. that is not right'})
    });
});



//5/5 PUT	/api/users/:id	Updates the user with the specified id using data from the request body. Returns the modified document, NOT the original.


server.put('/api/users/:id', (req, res) => {
    Users.update(req.params.id, req.body)
    .then(user => {
        if (!user){
            res
            .status(404)
            .json({errorMessage: "The user with the specified ID does not exist."})
        } else if ((req.body.name.length<1) || (req.body.bio.length<1)){
            res
            .status(400)
            .json({errorMessage:  "Please provide name and bio for the user." })
        } else {
           res.status(200).json(user); 
        }
    })
    .catch(error => {
        console.log("error on DELETE ", error);
        res
        .status(500)
        .json({errorMessage:  "The user information could not be modified."});
    });

});


const port = 5000;
server.listen(port, () => console.log(`\n** API on port ${port} \n`));