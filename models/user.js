const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    name: {type: String},
    manager_name: {type: String},
    Latitude: {type: String},
    Longitude: {type: String}
});
module.exports = User = mongoose.model('User', UserSchema);