const mongoose = require('mongoose');


class MongoConnection{

    constructor(){

    }
    
    connect(app){
        
        mongoose.connect(`mongodb+srv://Allah012:${process.env.MONGO_PASSWORD}@cluster0.lum93.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
        .then(() => {
            app.listen(5000); 
        }).catch(err => {
            console.log(err); 
        }); 
    }
}

export default MongoConnection; 
