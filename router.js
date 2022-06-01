
//Include Mongoose data models, and helper functions
const Models = require("./Models");
//End Mongoose data models


function gen(app)
{
    //Routes definition
    app.post('/',async (req,res,err) => {
        console.log('Request received to POST /');
	console.log(req.body);
        const user = new Models.User({ userName:req.body.userName, password: req.body.password, isAdmin:false });
        user.save();
        res.send("<h1>Record posted!</h1>");
    }
    );
    app.get('/user',async (req,res,err) => {
	      console.log("Get / called");
          const data = await Models.User.find()
        res.send(data);
    });
    
    //return app;
}
exports.gen = gen;