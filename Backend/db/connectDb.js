const mongoose = require('mongoose')

const connectDb = async() =>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`MongoDB Connected`)
    }
    catch(err){
        console.log(`Error in running MongoDB - ${err}`)
    }
}

module.exports = connectDb