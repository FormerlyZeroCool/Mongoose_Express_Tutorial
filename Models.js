
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
    //End of Mongoose Model and Schema Definitions
//End of Mongoose Instantiation



//End Helper function to copy location data from regular JS object to Mongoose location model
//Exports
exports.User = User;
//End of Exports