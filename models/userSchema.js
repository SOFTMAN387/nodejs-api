import mongoose from "mongoose";
import validator from "validator";
const userSchema=new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw Error("Not Valid Email")
            }
        }
    },
    mobile:{
        type:Number,
        required:true,
        minlength:10,
        maxlength:10,
        unique:true

    },
    gender:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum:['Active','In-Active'],
        default:"Active"
    }
},  { timestamps: true });

const User=new mongoose.model("user",userSchema);
export default User;