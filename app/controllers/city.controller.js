let City = require('../models/city.model.js');

// Create and Save a new city
exports.create = (req, res) => {
    // Validate request
    if(!req.body.name) {
        return res.status(400).send({
            message: "city name can not be empty"
        });
    }

    // Create a city
    let city = new City({
        state: req.body.state || "Unstated city", 
        name: req.body.name,
        id: req.body.id
    });

    // Save city in the database
    city.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the city."
        });
    });
};

// Retrieve and return all citys from the database.
exports.findAll = (req, res) => {
    city.find()
    .then(citys => {
        res.send(citys);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving citys."
        });
    });
};

// Find a single city with a cityId
exports.findOne = (req, res) => {
    city.findById(req.params.cityId)
    .then(city => {
        if(!city) {
            return res.status(404).send({
                message: "city not found with id " + req.params.cityId
            });            
        }
        res.send(city);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "city not found with id " + req.params.cityId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving city with id " + req.params.cityId
        });
    });
};

// Update a city identified by the cityId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.name) {
        return res.status(400).send({
            message: "city name can not be empty"
        });
    }

    // Find city and update it with the request body
    city.findByIdAndUpdate(req.params.cityId, {
        state: req.body.state || "Unstated city",
        name: req.body.name,
        id: req.body.id
    }, {new: true})
    .then(city => {
        if(!city) {
            return res.status(404).send({
                message: "city not found with id " + req.params.cityId
            });
        }
        res.send(city);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "city not found with id " + req.params.cityId
            });                
        }
        return res.status(500).send({
            message: "Error updating city with id " + req.params.cityId
        });
    });
};

// Delete a city with the specified cityId in the request
exports.delete = (req, res) => {
    city.findByIdAndRemove(req.params.cityId)
    .then(city => {
        if(!city) {
            return res.status(404).send({
                message: "city not found with id " + req.params.cityId
            });
        }
        res.send({message: "city deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "city not found with id " + req.params.cityId
            });                
        }
        return res.status(500).send({
            message: "Could not delete city with id " + req.params.cityId
        });
    });
};
