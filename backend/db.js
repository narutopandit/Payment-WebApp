const md = require('mongoose');

md.connect('mongodb+srv://narutopandit220:IURGKbYlxoKOHQmt@cluster0.du5zhdq.mongodb.net/User',{ dbName: "Patym2" });

const userSchema = md.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
    },
    password:{
        type:String,
        required:true,
        minLength:6,
        maxLength:20
    },
    firstName:{
        type:String,
        required:true,
        trim:true,
        maxLength:15
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
        maxLength:15
    }
});

const tokenStoreSchema = md.Schema({
    email:String,
    token:String
})
const accountSchema = md.Schema({
    userId:{
        type:md.Schema.Types.ObjectId,
        ref:'Users',
        required:true
    },
    balance:{
        type:Number,
        required:true
    }
});

const Users = md.model('Users',userSchema);
const Accounts = md.model('Accounts',accountSchema);
const Storage = md.model('Storage', tokenStoreSchema);

module.exports = {Users, Accounts, Storage};