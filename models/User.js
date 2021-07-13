var mongoose = require("mongoose");
var UserSchema = new mongoose.Schema({
   username: String,
   password: String,
   applications:[{
      type: mongoose.Schema.Types.ObjectId,
      ref:'Application'
   }]
});
module.exports= mongoose.model("User", UserSchema);