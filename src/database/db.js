import mongoose from 'mongoose';

const connectedDataBase = () => {
    console.log('Await for connected DataBase ');
    mongoose.connect('mongodb+srv://root:root@cluster0.djnwyly.mongodb.net/?retryWrites=true&w=majority', {
        useNewUrlParser: true, useUnifiedTopology: true
    })
        .then(() => console.log('MongoDB Atlas connecte successfully'))
        .catch((error) => console.log(error))
}

export default  connectedDataBase;