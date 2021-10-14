const mongoose = require('mongoose');


class MongoConnection{

    
    constructor(){
    }
    
    connect(app){
        
        mongoose.connect(`mongodb+srv://Allah012:SalahElhossiny@cluster0.lum93.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
        .then(() => {
            app.listen(6000); 
        }).catch(err => {
            console.log(err); 
        }); 
    }
}


module.exports={MongoConnection}; 
