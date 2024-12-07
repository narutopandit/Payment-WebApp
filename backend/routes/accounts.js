const express = require('express');
const authMiddleware = require('./validate/middleware');
const { Accounts } = require('../db');
const { default: mongoose } = require('mongoose');
const router = express.Router();

router.use(express.json());

//see Balance....

router.get('/balance',authMiddleware, async(req,res)=>{
    const account = await Accounts.findOne({
        userId:req.userId
    });
    res.status(200).json({
        balance:account.balance
    });
});

//transfer....

router.put('/transfer',authMiddleware, async(req,res)=>{

    const session = await mongoose.startSession(); //start the session

    session.startTransaction();  //start the transction
    
    const {amount,to} = req.body;

    const account = await Accounts.findOne({userId:req.userId}).session(session);

    if(!account || (account.balance<amount)){
        session.abortTransaction();  // if account doesn't exits or balance is inssuficient
        res.status(403).json({
            msg: (!account)? "Account doesn`t exist" : "Insufficient Balance!"
        })
        return;
    }
    const toUser = await Accounts.findOne({userId:to}).session(session);

    if(!toUser){
        session.abortTransaction();
        res.status(403).json({
            msg:"user doesn`t exist"
        });
        return;
    }

    await Accounts.updateOne({userId:account.userId},{
        $inc:{balance: -amount}
    }).session(session);

    await Accounts.updateOne({userId:to},{
        $inc:{balance: amount}
    }).session(session);

    session.commitTransaction();
    // all changes saves to database 

    res.json({msg:"Transaction successfull!!"});
})


module.exports = router;