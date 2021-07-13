var mongoose = require("mongoose");
var ApplicationSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    type: String,
    from: String,
    to: String,
    duration: Number,
    comments: String,
    status: String
});
module.exports= mongoose.model("Application", ApplicationSchema);