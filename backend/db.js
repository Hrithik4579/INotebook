const mongoose=require('mongoose');
const mongoURI='mongodb+srv://hbhagat:hbhagat123@cluster0.zueey.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0';
const  connectToMongo=()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("connected to mongodb");
    })
}
module.exports=connectToMongo;