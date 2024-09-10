import User from "../models/userSchema.js";

//Creating User==================

export const registerUser=async(req,res)=>{
    const {fullName,email,mobile,gender,status}=req.body;
    if(!fullName||!email||!mobile||!gender||!status){
        res.status(400).json({error:"All fields are required"});
    }
    try {
    const checkUser=await User.findOne({email:email});
    console.log(checkUser);
    if(checkUser){
        res.status(400).json({"error":"Email already exist"});
    }else{
        const regUser=new User({fullName,email,mobile,gender,status});
        await regUser.save();
         res.status(200).json({msg:"User Created Successfully",regUser});
    }
       
    } catch (error) {
        console.log(error);
    }
}



//Getting All Users===================

export const getAllUsers=async(req,res)=>{
    const fullName=req.query.fullName||"";
    const status=req.query.status||"";
    const gender=req.query.gender||"";
    const page=req.query.page||1;
    const limit=req.query.limit||4;
    const query={
        fullName:{$regex:fullName,$options:"i"}
    }
    if(status!=="All"){
        query.status=status;
    }
    if(gender!=="All"){
        query.gender=gender;
    }
    //console.log(query);
    try {
        const skip=(page-1)*limit;
        const count=await User.countDocuments(query);
        const pageCount=Math.ceil(count/limit);
        console.log(pageCount,count);
        const userData=await User.find(query).sort({"createdAt":-1}).limit(limit).skip(skip);
        if(userData?.length>0){
            res.status(200).json({
                pagination:{
                    count:pageCount
                },userData
            });
        }else{
            res.status(200).send({msg:"No Users"});

        }
        
    } catch (error) {
        console.log(error);
    }
}



//Getting user by ID===================

export const getSingleUser=async(req,res)=>{
    const {id}=req.params;
    try {
        const userData=await User.findById({_id:id});
        res.status(200).send(userData);
        
    } catch (error) {
        console.log(error);
    }
}


//Updating user by ID===================

export const updateUser=async(req,res)=>{
    const {id}=req.params;
    try {
      const updatedData= await User.findByIdAndUpdate(id,{$set:req.body},{new:true});
        res.status(200).send({msg:"Updated Successfull...",updatedData});
        
    } catch (error) {
        console.log(error);
    }
}


//Deleting user by ID===================

export const deleteUser=async(req,res)=>{
    const {id}=req.params;
    try {
        await User.findByIdAndDelete({_id:id});
        res.status(200).send({msg:`Id ${id} Deleted...`});
        
    } catch (error) {
        console.log(error);
    }
}


