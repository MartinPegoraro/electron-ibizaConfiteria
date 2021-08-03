const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/confiteriaIbiza', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log('db is conected'))
    .catch(err => console.log(err));
