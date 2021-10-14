const mongoose = require('mongoose');

require('dotenv').config();

class MongoConnection{

    
    constructor(){
    }
    
    connect(app){
        
        mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWD}@cluster0.lum93.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
        .then(() => {
            app.listen(6000); 
        }).catch(err => {
            console.log(err); 
        }); 
    }
}


module.exports={MongoConnection}; 
