import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    name:{
      type:String,
      required:true
    },
    userName:{
      type:String,
      required:true,
      unique:true,  
    },
    email:{
      type:String,
      required:true,
      unique:true,
      lowercase:true
    },
    password:{
      type:String,
      required:true,
      select:false
    },
    avatar:{
     type: String,
     required:true,
    },
    background:{
      type:String,
      required:true
    } 
})

userSchema.pre("save", async function(next){
  this.password = await bcrypt.hash(this.password, 10);
  next()
});


const User = mongoose.model('User',userSchema)
export default User;