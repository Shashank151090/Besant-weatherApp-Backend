module.exports = (app) => {
    const cities = require('../controllers/city.controller.js');

    // Create a new Note
    app.post('/cities', cities.create);

    // Retrieve all cities
    app.get('/cities', cities.findAll);

    // Retrieve a single Note with noteId
    app.get('/cities/:cityId', cities.findOne);

    // Update a Note with noteId
    app.put('/cities/:cityId', cities.update);

    // Delete a Note with noteId
    app.delete('/cities/:cityId', cities.delete);
}