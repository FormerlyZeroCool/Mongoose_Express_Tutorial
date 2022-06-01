//const Koa = require('koa');
//const KoaRouter = require('koa-router');
//const json = require('koa-json');
//const mongoClient = require('mongodb').MongoClient();
//const app = new Koa();
//const router = new KoaRouter();
const wsUser = { id:process.env.MONGOUSER,password:process.env.MONGOPASS };
//DB Connection
const mongoURL = "mongodb+srv://webserviceuser:crwOXzXbiHLQ6E59@cluster0-uro9k.mongodb.net/BMCCDirectoryDB?retryWrites=true&w=majority";
//Mongoose instantiation
const mongoose = require('mongoose');
mongoose.connect(mongoURL,{ useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Succesfully connected to DB srv');
});
//Models, and schemas
    //User Model and schema
    const userSchema = new mongoose.Schema(
        {
            //_id: mongoose.Schema.Types.ObjectId,
            userName: String,
            password: String,
            isAdmin: Boolean
        }
    );
    const User = mongoose.model('User',userSchema);
    //Time Schema 
    const timeSchema = new mongoose.Schema({
        //_id: mongoose.Schema.Types.ObjectId,
        startHour: String,
        startMinute: String,
        isStartAm: Boolean,
        endHour: String,
        endMinute: String,
        isEndAm: Boolean
    });
    const Time = mongoose.model('Time',timeSchema);
    //Location Model and schema
    const locationSchema = new mongoose.Schema(
        {
            //_id: mongoose.Schema.Types.ObjectId,
            operations:
            {
                monday:[
                    timeSchema
                ],
                tuesday:[
                    timeSchema
                ],
                wednesday:[
                    timeSchema
                ],
                thursday:[
                    timeSchema
                ],
                friday:[
                    timeSchema
                ],
                saturday:[
                    timeSchema
                ],
                sunday:[
                    timeSchema
                ]
            },
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

//Data to upload to srv
const userData = [{"_id":"5cb78994c16638d5ca32cd12","username":"ben@ben.com","password":"28694504036815388098808144090","__v":1},{"_id":"5cb78994c16638d98ba5b012","username":"guest@guest.com","password":"28694504036815388098819699466","__v":0},{"_id":"5cb78994c16638d98b88ff12","username":"admin@admin.com","password":"28694504036815388098811820434","__v":1},{"_id":"5cb78994c16638e590494192","username":"andrew@andrew.com","password":"28694504036815388098835977250","__v":0},{"_id":"5cb78994c16638dd8d694412","username":"tester1@test.com","password":"28694504036815388098811821898","__v":0}];
const locationData = [{"operations":{"monday":[],"tuesday":[],"wednesday":[],"thursday":[],"friday":[],"saturday":[],"sunday":[]},"_id":"5e3b16861c9d4400001935a0","name":"","room":"","address":"","telephone":"","contactemail":""},{"operations":{"monday":[{"_id":"5e066ecc5622bccfb4c43e80","startHour":"09","startMinute":"00","isStartAm":"1","endHour":"05","endMinute":"00","isEndAm":"0"}],"tuesday":[{"_id":"5e066ecc5622bc3797c43e7f","startHour":"09","startMinute":"00","isStartAm":"1","endHour":"05","endMinute":"00","isEndAm":"0"}],"wednesday":[{"_id":"5e066ecc5622bce0a9c43e7e","startHour":"09","startMinute":"00","isStartAm":"1","endHour":"05","endMinute":"00","isEndAm":"0"}],"thursday":[{"_id":"5e066ecc5622bc35bdc43e7d","startHour":"09","startMinute":"00","isStartAm":"1","endHour":"05","endMinute":"00","isEndAm":"0"}],"friday":[{"_id":"5e066ecc5622bc24c5c43e7c","startHour":"09","startMinute":"00","isStartAm":"1","endHour":"05","endMinute":"00","isEndAm":"0"}],"saturday":[],"sunday":[]},"_id":"5d56b0304c0aac531fbba4ca","name":"Bursar","room":"S330","address":"199 Chambers Street","__v":0},{"operations":{"monday":[{"_id":"5d56c5d083a01f90881de8ae","startHour":"09","startMinute":"00","isStartAm":"1","endHour":"07","endMinute":"00","isEndAm":"0"}],"tuesday":[{"_id":"5d56c5d083a01f3ec31de8ad","startHour":"09","startMinute":"00","isStartAm":"1","endHour":"07","endMinute":"00","isEndAm":"0"}],"wednesday":[{"_id":"5d56c5d083a01fe9201de8ac","startHour":"09","startMinute":"00","isStartAm":"1","endHour":"07","endMinute":"00","isEndAm":"0"}],"thursday":[{"_id":"5d56c5d083a01f36611de8ab","startHour":"09","startMinute":"00","isStartAm":"1","endHour":"07","endMinute":"00","isEndAm":"0"}],"friday":[{"_id":"5d56c5d083a01f212a1de8aa","startHour":"09","startMinute":"00","isStartAm":"1","endHour":"07","endMinute":"00","isEndAm":"0"}],"saturday":[{"_id":"5d56c5d083a01fc7791de8a9","startHour":"10","startMinute":"00","isStartAm":"1","endHour":"06","endMinute":"00","isEndAm":"0"}],"sunday":[{"_id":"5d56c5d083a01f19691de8a8","startHour":"11","startMinute":"00","isStartAm":"1","endHour":"04","endMinute":"00","isEndAm":"0"}]},"_id":"5d56b15d4c0aac57f3bba4d5","name":"Academic Advisement and Transfer Center","room":"S108","address":"199 Chambers Street","__v":0},{"operations":{"monday":[{"_id":"5dd455172afcd771d6a8862e","startHour":"09","startMinute":"00","isStartAm":"1","endHour":"07","endMinute":"00","isEndAm":"0"}],"tuesday":[{"_id":"5dd455172afcd75654a8862d","startHour":"09","startMinute":"00","isStartAm":"1","endHour":"07","endMinute":"00","isEndAm":"0"}],"wednesday":[{"_id":"5dd455172afcd74ccaa8862c","startHour":"09","startMinute":"00","isStartAm":"1","endHour":"07","endMinute":"00","isEndAm":"0"}],"thursday":[{"_id":"5dd455172afcd78cd4a8862b","startHour":"09","startMinute":"00","isStartAm":"1","endHour":"07","endMinute":"00","isEndAm":"0"}],"friday":[{"_id":"5dd455172afcd780e7a8862a","startHour":"09","startMinute":"00","isStartAm":"1","endHour":"05","endMinute":"00","isEndAm":"0"}],"saturday":[{"_id":"5dd455172afcd7c477a88629","startHour":"09","startMinute":"00","isStartAm":"1","endHour":"05","endMinute":"00","isEndAm":"0"}],"sunday":[]},"_id":"5d56c75c83a01f260d1de8af","name":"Registrar","room":"S315","address":"199 Chambers Street","__v":0},{"operations":{"monday":[{"_id":"5d59a2ca82df994ac02a7922","startHour":"09","startMinute":"00","isStartAm":"1","endHour":"05","endMinute":"00","isEndAm":"0"}],"tuesday":[{"_id":"5d59a2ca82df9982362a7921","startHour":"09","startMinute":"00","isStartAm":"1","endHour":"07","endMinute":"00","isEndAm":"0"}],"wednesday":[{"_id":"5d59a2ca82df99c1452a7920","startHour":"09","startMinute":"00","isStartAm":"1","endHour":"07","endMinute":"00","isEndAm":"0"}],"thursday":[{"_id":"5d59a2ca82df99694f2a791f","startHour":"09","startMinute":"00","isStartAm":"1","endHour":"05","endMinute":"00","isEndAm":"0"}],"friday":[{"_id":"5d59a2ca82df9948952a791e","startHour":"09","startMinute":"00","isStartAm":"1","endHour":"05","endMinute":"00","isEndAm":"0"}],"saturday":[],"sunday":[]},"_id":"5d56cf05dc88232fb1269e4f","name":"Financial Aid","room":"N365","address":"199 Chambers Street","__v":0},{"operations":{"monday":[{"_id":"5d56d0d7dc88231b1d269e5e","startHour":"09","startMinute":"00","isStartAm":"1","endHour":"05","endMinute":"00","isEndAm":"0"}],"tuesday":[{"_id":"5d56d0d7dc88238992269e5d","startHour":"09","startMinute":"00","isStartAm":"1","endHour":"07","endMinute":"00","isEndAm":"0"}],"wednesday":[{"_id":"5d56d0d7dc88235587269e5c","startHour":"09","startMinute":"00","isStartAm":"1","endHour":"07","endMinute":"00","isEndAm":"0"}],"thursday":[{"_id":"5d56d0d7dc88234130269e5b","startHour":"09","startMinute":"00","isStartAm":"1","endHour":"05","endMinute":"00","isEndAm":"0"}],"friday":[],"saturday":[],"sunday":[]},"_id":"5d56d0cddc88235bc1269e58","name":"Scholarships","room":"N365","address":"199 Chambers Street","__v":0},{"operations":{"monday":[{"_id":"5d56d218dc88235529269e64","startHour":"08","startMinute":"00","isStartAm":"1","endHour":"06","endMinute":"00","isEndAm":"0"}],"tuesday":[{"_id":"5d56d218dc88236e6e269e63","startHour":"08","startMinute":"00","isStartAm":"1","endHour":"06","endMinute":"00","isEndAm":"0"}],"wednesday":[{"_id":"5d56d218dc8823a4e3269e62","startHour":"08","startMinute":"00","isStartAm":"1","endHour":"06","endMinute":"00","isEndAm":"0"}],"thursday":[{"_id":"5d56d218dc8823d728269e61","startHour":"08","startMinute":"00","isStartAm":"1","endHour":"06","endMinute":"00","isEndAm":"0"}],"friday":[{"_id":"5d56d218dc8823fe4d269e60","startHour":"08","startMinute":"00","isStartAm":"1","endHour":"06","endMinute":"00","isEndAm":"0"}],"saturday":[],"sunday":[]},"_id":"5d56d218dc882333cd269e5f","name":"BMCC Single Stop Office","room":"S230","address":"199 Chambers Street","__v":0},{"operations":{"monday":[{"_id":"5dbf0124b0f9d0cd99cfec0c","startHour":"09","startMinute":"00","isStartAm":"1","endHour":"05","endMinute":"00","isEndAm":"0"}],"tuesday":[{"_id":"5dbf0124b0f9d02281cfec0b","startHour":"09","startMinute":"00","isStartAm":"1","endHour":"05","endMinute":"00","isEndAm":"0"}],"wednesday":[{"_id":"5dbf0124b0f9d0e9f0cfec0a","startHour":"09","startMinute":"00","isStartAm":"1","endHour":"05","endMinute":"00","isEndAm":"0"}],"thursday":[{"_id":"5dbf0124b0f9d03f50cfec09","startHour":"09","startMinute":"00","isStartAm":"1","endHour":"05","endMinute":"00","isEndAm":"0"}],"friday":[{"_id":"5dbf0124b0f9d0f21ecfec08","startHour":"09","startMinute":"00","isStartAm":"1","endHour":"05","endMinute":"00","isEndAm":"0"}],"saturday":[{"_id":"5dbf0124b0f9d098ebcfec07","startHour":"09","startMinute":"00","isStartAm":"1","endHour":"05","endMinute":"00","isEndAm":"0"}],"sunday":[]},"_id":"5d56d51c1bf26918fdf71dd1","name":"Student Affairs","room":"S350","address":"199 Chambers Street","__v":0},{"operations":{"monday":[{"_id":"5d59a28c82df9967b22a7917","startHour":"09","startMinute":"00","isStartAm":"1","endHour":"05","endMinute":"00","isEndAm":"0"}],"tuesday":[{"_id":"5d59a28c82df99508b2a7916","startHour":"09","startMinute":"00","isStartAm":"1","endHour":"05","endMinute":"00","isEndAm":"0"}],"wednesday":[{"_id":"5d59a28c82df99afdf2a7915","startHour":"09","startMinute":"00","isStartAm":"1","endHour":"05","endMinute":"00","isEndAm":"0"}],"thursday":[{"_id":"5d59a28c82df9974352a7914","startHour":"09","startMinute":"00","isStartAm":"1","endHour":"05","endMinute":"00","isEndAm":"0"}],"friday":[],"saturday":[],"sunday":[]},"_id":"5d56e024fe15cb38fb0ddf09","name":"Federal Work-Study","room":"N365","address":"199 Chambers Street","__v":0}];
//end data to unpload to srv

//Start Server
//app.listen(3000,() => console.log('Server started'));
//console.log(JSON.stringify(userData));

//Clear old data not
Location.deleteMany();
User.deleteMany();
//Upload Initial data
function buildDay(from,to)
{
    from.forEach(
        xtime => {
            const time = new Time();
            //time._id = new mongoose.Types.ObjectId(xtime._id);
            time.startHour = xtime.startHour;
            time.startMinute = xtime.startMinute;
            time.isStartAm = xtime.isStartAm;
            time.endHour = xtime.endHour;
            time.endMinute = xtime.endMinute;
            time.isEndAm = xtime.isEndAm;
            to.push(time);
        }
    );
}
locationData.forEach(x => {
        location = new Location();
        //location._id = new mongoose.Types.ObjectId(x._id);
        buildDay(x.operations.monday,location.operations.monday);
        buildDay(x.operations.tuesday,location.operations.tuesday);
        buildDay(x.operations.wednesday,location.operations.wednesday);
        buildDay(x.operations.thursday,location.operations.thursday);
        buildDay(x.operations.friday,location.operations.friday);
        buildDay(x.operations.saturday,location.operations.saturday);
        buildDay(x.operations.sunday,location.operations.sunday);
        location.name = x.name;
        location.room = x.room;
        location.address = x.address;
        location.telephone = "";
        location.contactEmail = "";
        location.save(function(err)
                {
                    if (err) throw (err);
                }
            );
        }
    );
    userData.forEach(x => {
            user = new User();
            user._id = new mongoose.Types.ObjectId(x._id);
            user.userName = x.username;
            user.password = x.password;
            user.isAdmin = true;
            user.save(function(err)
                    {
                        if (err) throw (err);
                    }
                );
        }
    );