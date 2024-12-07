const express = require('express');
const {userSchema, userUpdateSchema} = require('./validate/input');
const userRouter = express.Router();
const jwt = require('jsonwebtoken');
userRouter.use(express.json());

const {Users , Storage, Accounts} = require('../db');
const JWT_SECRET = require('../config');
const authMiddleware = require('./validate/middleware');


//signup.....

userRouter.post('/signup',async (req,res)=>{
    const name = req.body;
    const safe = userSchema.safeParse(name);
    if(!safe.success){
        res.status(409).json({msg:"wrong inputs"});
        return;
    }
    const exist= await Users.findOne({email:name.email});
    if(exist){
        res.send({msg:"user already exists!!"});
        return;
    }
    const user = await Users.create(name);
    const token = jwt.sign({id:user._id},JWT_SECRET);
    await Storage.create({
        email:user.email,
        token:token
    })
    await Accounts.create({
        userId: user._id,
        balance: 1 + Math.random()*10000
    })
    res.json({
        msg:"user created successfully!",
        token:token
    });
});

userRouter.post('/signin',async(req,res)=>{
    const user = req.body;
    const check = await Users.findOne({email:user.email,password:user.password});
    if(!check){
        res.status(403).json({msg:"user doesn`t exist"})
        return;
    }
    const token = jwt.sign({id:check._id},JWT_SECRET);

    res.json({
        msg:"sigin success!!",
        token
    })
})



//update......

userRouter.put('/update',authMiddleware,async(req,res)=>{
    const updatedData = req.body;
    const safe = userUpdateSchema.safeParse(updatedData);
    if(!safe.success){
        res.status(403).json({msg:"wrong inputs!"});
        return;
    }
    const filter = {_id:req.userId};

    await Users.updateOne(filter,updatedData)
    .then((result)=>{
        if(result.modifiedCount > 0){
            res.json({msg:"User updated successfully!"})
        }else{
            res.status(404).json({msg:"User not found!"});
        }
    })
    .catch(err => {
        res.status(500).json({ msg: "Error updating user", error: err });
    });
})

//filter......

userRouter.get('/bulk',authMiddleware, async(req,res)=>{
    const filter = req.query.filter || "";

    const users = await Users.find({
        $or: [
            {
                firstName: {
                    $regex: filter,
                    $options: 'i' // Optional: case-insensitive search
                }
            },
            {
                lastName: {
                    $regex: filter,
                    $options: 'i' // Optional: case-insensitive search
                }
            }
        ]
    });

    // console.log(users);   for debugging purpose
    res.json({
        user: users.map(user=>({
            email:user.email,
            firstName:user.firstName,
            lastName:user.lastName,
            _id:user._id
        }))
    })
})

userRouter.delete('/delete',async(req,res)=>{
    const userId = req.query.userId;
    const user = await Users.findOne({_id:userId});
    if(!user){
        res.send('user not found');
        return;
    }
    const deletedFile = await Storage.findOneAndDelete({email:user.email});
    const deletedFile2 = await Accounts.findOneAndDelete({userId:user._id});
    const deletedFile3 = await Users.findOneAndDelete({email:user.email});

 
    if(deletedFile && deletedFile2 && deletedFile3){
        res.send('deleted');
    }
})



module.exports = userRouter;