
//DB Connection
const wsUser = { id:process.env.MONGOUSER,password:process.env.MONGOPASS, template_url:process.env.MONGOURLTEMPLATE };
const mongoURL = wsUser.template_url.replace('<password>', wsUser.password).replace("<user_name>", wsUser.id);
//Mongoose instantiation
const mongoose = require('mongoose');
mongoose.connect(mongoURL,{ useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', ()=> {
    console.error.bind(console, 'connection error:');
    }
);
db.once('open', function() {
console.log('Succesfully connected to database server');
});

//Models, and schemas for Mongoose
    //User Model and schema
    const userSchema = new mongoose.Schema(
        {
            userName: String,
            password: String,
            isAdmin: Boolean
        }
    );
    const User = mongoose.model('User',userSchema);
    //Location Model and schema
    const locationSchema = new mongoose.Schema(
        {
            name: String,
            room: String,
            address: String,
            telephone: String,
            contactEmail: String,
            __v: Number
        }
    );
    const Location = mongoose.model('Location',locationSchema);
    //End of Mongoose Model and Schema Definitions
//End of Mongoose Instantiation

//Helper function to copy user data from regular JS object to Mongoose user model
function buildUser(doc,data)
{
    doc.userName = data.userName;
    doc.password = data.password;
    doc.isAdmin = data.isAdmin;
}
//End Helper function to copy user data from regular JS object to Mongoose user model

//Helper functions to copy location data from regular JS object to Mongoose location model
function buildLocation(location,data)
{
    location.name = data.name;
    location.room = data.room;
    location.address = data.address;
    location.telephone = data.telephone;
    location.contactEmail = data.contactEmail;
}


//End Helper function to copy location data from regular JS object to Mongoose location model
//
//Exports
exports.Location = Location;
exports.User = User;
exports.buildUser = buildUser;
exports.buildLocation = buildLocation;
//End of Exports