const mongoose = require('mongoose');


//process.env.MONGO_URL
const db = async () => {
    try {
        mongoose.set('strictQuery', false)
        await mongoose.connect('mongodb+srv://kangueloic9:mToCOed6to56sJO1@cluster0.fpl8g5h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
        console.log('Db connected');
    } catch (error) {
        console.log('Db connection error');
    }
}

module.exports = {db};
