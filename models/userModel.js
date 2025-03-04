import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    company : String,
    email : String,
    password : String,
    location : String,
    avatar : String,
    avatarKey : String,
    role : {
        type : String,
        enum : ['user', 'admin'],
        default : 'user'
    }
})


UserSchema.methods.toJSON = function(){
    let obj = this.toObject();
    delete obj.password;
    return obj;
}



export default mongoose.model('User', UserSchema);