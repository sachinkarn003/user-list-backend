const User = require('../model/user.model');
const _ = require('lodash');
const Helper = require('../helper/error.helper');
const {validationResult} = require("express-validator");
const bodyValidator = require("express-validator").body;

exports.validateUser = ()=>{
    try {
        return [
            bodyValidator(["phone"]).exists().trim().isMobilePhone(),
            bodyValidator(["email"]).exists().trim().isEmail(),
            bodyValidator(["firstName"]).trim().exists(),
            bodyValidator(["lastName"]).trim().exists()
        ];
    } catch (err) {
        console.log("error!!: ", err)
    }

}
exports.createUser = async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return Helper.getValidationErrorMessage([req, res], errors.array());
    }
    try{
        const userData = _.pick(req.body,['firstName','lastName','email','phone']);
        const user = await new User(userData).save();

        res.status(201).json({
            message:'success',
            data:{
                user
            }
        })
    }catch(e){
        res.status(400).json({
            message:'fail',
            error:e.message
        })
    }
}

exports.userList = async (req,res)=>{
    try{
        const userList = await User.find({});
        res.status(200).json({
            message:'success',
            data:{
                userList
            }
        })
    }catch(e){
        res.status(400).json({
            message:'fail',
            error:e.message
        })
    }
}

exports.updateUser = async (req,res)=>{
    try{
        const {id} = req.params;
        const userData = _.pick(req.body,['firstName','lastName','email','phone']);
        const updateUser = await User.findByIdAndUpdate(id,userData);
        if(!updateUser){
            throw new Error("Something went wrong",404);
        }
        res.status(200).json({
            message:'success',
            data:"User Updated"
        })
    }catch(e){
        res.status(400).json({
            message:'fail',
            error:e.message
        })
    }
}
exports.uploadImage = async (req,res)=>{
    try{
        console.log(req.file)
        const {id} = req.params;
        if (!req.file) {
            return res.status(400).json({
                message:'fail',
                error:'No files were uploaded.'
            });
          }
          
          const image = req.file.filename;
          const uploadedImage = await User.findByIdAndUpdate(id,{ $set:{image:image }}, { new: true });
          if(!uploadedImage){
            throw new Error("something went wrong",404);
          }
          // File upload was successful
          res.status(200).json({
            message:'success',
            data:uploadedImage
          });
    }catch(e){
        res.status(400).json({
            message:'fail',
            error:e.message
        })
    }
}
exports.userDetail = async (req,res)=>{
    try{
        const {id} = req.params;
        const userDetail = await User.findById(id);
        if(!userDetail){
            throw new Error("user not found",404);
        }
        res.status(200).json({
            message:'success',
            data:userDetail
        })
    }catch(e){
        res.status(400).json({
            message:'fail',
            error:e.message
        })
    }
}

exports.deleteUser = async (req,res)=>{
    try{
        const {id} = req.params;
        console.log(id);
        const deleteUser = await User.findByIdAndDelete(id);
        if(!deleteUser){
            throw new Error("Something went wrong",404);
        }
        res.status(200).json({
            message:'success',
            data:"User Deleted"
        })
    }catch(e){
        res.status(400).json({
            message:'fail',
            error:e.message
        })
    }
}