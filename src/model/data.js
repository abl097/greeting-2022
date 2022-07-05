const mongoose =require("mongoose");
mongoose.connect('mongodb+srv://userone:userone@casestudy-errorhunt.yrova.mongodb.net/LIBRARYAPP?retryWrites=true&w=majority',{useNewUrlParser: true, useUnifiedTopology: true});
const Schema = mongoose.Schema;

const WishSchema = new Schema({

    yourname:String,
    friendsname:String,
    email:String
})

const wishdata = mongoose.model("wishdata" , WishSchema)
module.exports = wishdata