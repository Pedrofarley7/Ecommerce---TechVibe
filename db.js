const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://pedrofarley08:peter1234567@cluster0.xlnmy.mongodb.net/ecommerce', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Conectado ao MongoDB');
});

module.exports = db;
