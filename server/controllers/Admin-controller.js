const { deleteModel } = require('mongoose')
const userModel = require('../models/user-model')

//get all users
const getAllUser = async(req,res)=>{
try {
    const Users = await userModel.find()
    
    if(Users.length === 0){
        return res.status(404).json({message:"No Users found"})
    }

    return res.status(200).json({message:"All users",data:Users})
} catch (error) {
    return res.status(500).json({message:"Internal server error"})
}
}

//delete users

const deleteUsers = async(req,res)=>{
try {
    const {id} = req.params;
    const deleteUser = await userModel.findByIdAndDelete(id)
    if(!deleteUser){
        return res.status(404).json({message:"user not delete"})
    }
    return res.status(200).json({message:"User deleted"})
} catch (error) {
    return res.status(500).json({message:"Internal server error"})
}
}

module.exports = {getAllUser , deleteUsers}