import mongoose from 'mongoose';

const connectedDataBase = () => {
    console.log('Await for connected DataBase ');
    mongoose.connect(process.env.MONGODB_URI ,
         { 
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
         })
        .then(() => console.log('MongoDB Atlas connecte successfully'))
        .catch((error) => console.log(error))
}

export default  connectedDataBase;