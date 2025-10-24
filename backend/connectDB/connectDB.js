const mongoose = require('mongoose')

function connectDB(url) {
    mongoose.connect(url)
    .then(()=>{
        console.log("database connected!");
        
    })
    .catch((err)=>{
        console.log("database not connected!", err);
        
    })
}

module.exports = {connectDB}