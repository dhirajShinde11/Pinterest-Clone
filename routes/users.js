const mongoose = require('mongoose');
const plm = require('passport-local-mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/DataAssociate')


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
},
password:{
  type:String
},
email: {
    type: String,
    required: true,
    unique: true
},
posts: [{
  type:mongoose.Schema.Types.ObjectId,
  ref:'Post'
}],
datecreated:{
  
  type:Date,
  default:Date.now()
}
});
userSchema.plugin(plm)

module.exports = mongoose.model('User', userSchema);



